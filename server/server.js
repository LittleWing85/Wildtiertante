import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

import cookieSession from "cookie-session";
app.use(
    cookieSession({
        name: process.env.SESSION_NAME || "wildtiertante_session",
        secret: process.env.SESSION_SECRET || "Hello something",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })
);
// refresh session expiry on each request for logged-in users
app.use((request, response, next) => {
    if (request.session?.user_id) {
        request.session._ts = Date.now();
    }
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

import {
    createUser,
    createLitter,
    createIndividual,
    createFeedingEntry,
    login,
    getAllFeedings,
    getLitters,
    fullJoinLittersAndFeedings,
} from "./db.js";
import requireLogin from "./requireLogin.js";

// helper to wrap async route handlers
const wrap = (fn) => (request, response, next) => {
    Promise.resolve(fn(request, response, next)).catch(next);
};

// AUTH ROUTES

app.post("/api/registration", (request, response) => {
    createUser(request.body)
        .then((newUser) => {
            request.session.user_id = newUser.user_id;
            response.json(newUser);
        })
        .catch((error) => {
            console.log("POST /api/registration", error);
            if (error.constraint === "users_email_key") {
                response.status(400).json({
                    error: "E-mail already in use.",
                });
                return;
                // note for rework: send back error messages in case of problems.
            }
            response.status(500).json({
                error: "Something went wrong. Please try again later.",
            });
        });
});

app.post("/api/login", (request, response) => {
    login(request.body)
        .then((foundUser) => {
            if (foundUser) {
                request.session.user_id = foundUser.user_id;
                response.json(foundUser);
                return;
            } // note for rework: send back error messages in case of problems.
            // adjust frontend accordingly, don't just check if response is truthy

            response.json(null);
        })
        .catch((error) => {
            console.log("POST /api/login", error);
            response.status(500).json({
                error: "Something went wrong. Please try again.",
            });
        });
});

app.post("/api/logout", (request, response) => {
    request.session = null;
    response.json({ success: true });
});

// PUBLIC ROUTES

app.get("/api/user_id", (request, response) => {
    const currentUser = request.session.user_id;
    if (currentUser) {
        response.json(currentUser);
        return;
    }
    response.json(null);
});

// PROTECTED ROUTES

app.post(
    "/api/litter",
    requireLogin,
    wrap(async (request, response) => {
        const litterData = {
            ...request.body.litterData,
            id_associated_user: request.session.user_id,
        };
        const newLitterEntry = await createLitter(litterData);
        await Promise.all(
            (request.body.animals || []).map((individual) => {
                const data = {
                    ...individual,
                    id_associated_litter: newLitterEntry.litter_id,
                };
                return createIndividual(data);
            })
        );
        response.json(newLitterEntry);
    })
);

app.post(
    "/api/feedingData",
    requireLogin,
    wrap(async (request, response) => {
        const newFeedingEntry = await createFeedingEntry(
            request.body.feedingData
        );
        response.json(newFeedingEntry);
    })
);

app.get(
    "/api/litterOverview",
    requireLogin,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const litters = await getLitters(currentUser);
        response.json(litters);
    })
);

// Gets all newly arrived litters who haven't been fed yet
app.get(
    "/api/unfedLitters",
    requireLogin,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const fullJoin = await fullJoinLittersAndFeedings(currentUser);
        const unfedLitters = fullJoin.filter(function (record) {
            return record.feeding_id === null;
        });
        response.json(unfedLitters);
    })
);

/* Gets litters that have been fed at least once 
and maps the time the litters have been feed last to the time when the next feeding should happen */
app.get(
    "/api/nextFeedings",
    requireLogin,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const allFeedings = await getAllFeedings(currentUser); // all data about feedings that have already happened
        const lastFeedings = []; // data about the last time each litter was fed
        for (const item of allFeedings) {
            if (
                !lastFeedings
                    .map((item) => item.litter_id)
                    .includes(item.litter_id)
            ) {
                lastFeedings.push(item);
            } else {
                const found = lastFeedings.find(
                    (x) => x.litter_id === item.litter_id
                );
                if (item.feeding_id > found.feeding_id) {
                    const index = lastFeedings
                        .map((el) => el.litter_id)
                        .indexOf(found.litter_id);
                    lastFeedings[index] = item;
                }
            }
        }

        /* maps time of last feeding for each litter to the time each litter should be fed next */
        const nextFeedings = lastFeedings
            .map(function (feeding) {
                const arrayFeedingTimes = feeding.feedingslots; // array with all daily feeding slots
                const lastFeedingTime = feeding.feedingslot; // time of the last feeding
                const currentIndex = arrayFeedingTimes.indexOf(lastFeedingTime); // position of the last feeding time in the array with all feeding slots
                const nextIndex = (currentIndex + 1) % arrayFeedingTimes.length; // position of the next feeding time in the array with all feeding slots
                const nextFeedingTime = arrayFeedingTimes[nextIndex]; // time of the next feeding
                //Puts together the time of the next feeding with the date from the last feeding

                //If nextIndex is 0, the next feeding happens on the next day so JS has to add 1 to the day
                if (nextIndex === 0) {
                    let nextFeedingDateAndTime = new Date(
                        feeding.feedingdate + "T" + nextFeedingTime + ".000Z"
                    );
                    nextFeedingDateAndTime.setDate(
                        nextFeedingDateAndTime.getDate() + 1
                    );
                    return {
                        ...feeding,
                        nextFeedingTime: nextFeedingTime,
                        nextFeedingDateAndTime: nextFeedingDateAndTime,
                    };
                }
                let nextFeedingDateAndTime = new Date(
                    feeding.feedingdate + "T" + nextFeedingTime + ".000Z"
                );
                return {
                    ...feeding,
                    nextFeedingTime: nextFeedingTime,
                    nextFeedingDateAndTime: nextFeedingDateAndTime,
                };
            })
            .sort((a, b) => {
                if (a.nextFeedingDateAndTime > b.nextFeedingDateAndTime) {
                    return 1;
                }
                return -1;
            });
        // allFeedings is an array that contains an object for each litter; each object includes the data of the last feeding, the litter and the next feeding time
        response.json(nextFeedings);
    })
);

// FALLBACK
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// OTHER

// central error handler
app.use((error, request, response, next) => {
    console.error("Server error:", error);
    if (response.headersSent) return next(error);
    response.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
    });
});

app.listen(process.env.PORT || 4001, function () {
    console.log("I'm listening.");
});
