const express = require("express");
const app = express();
const path = require("path");
const cookieSession = require("cookie-session");
const {
    createUser,
    createLitter,
    createIndividual,
    createFeedingEntry,
    login,
    getLastFeedings,
    getLitters,
    fullJoinLittersAndFeedings,
} = require("./db");
const cookieSessionMiddleware = cookieSession({
    secret: "Hello something",
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(cookieSessionMiddleware);

function checkLogin(request, response, next) {
    console.log("Check was called!");
    if (!request.session.user_id) {
        console.log("No user_id stored in Cookies!");
        response.redirect("/");
        return;
    } else {
        next();
    }
}

app.post("/api/registration", (request, response) => {
    createUser(request.body)
        .then((newUser) => {
            console.log("newUser.user_id", newUser.user_id);
            request.session.user_id = newUser.user_id;
            response.json(newUser);
            console.log("request.session.user_id", request.session.user_id);
        })
        .catch((error) => {
            console.log("POST /api/registration", error);
            if (error.constraint === "email") {
                response.status(400).json({ error: "E-mail already in use" });
                return;
            }
            response
                .status(500)
                .json({ error: "Something went wrong. Please try again." });
        });
});

app.post("/api/login", (request, response) => {
    login(request.body)
        .then((foundUser) => {
            if (foundUser) {
                request.session.user_id = foundUser.id;
                response.json(foundUser);
                return;
            }
            response.json(null);
        })
        .catch((error) => {
            console.log("POST /api/login", error);
            response.status(500).json({
                error: "Something went wrong. Please try again.",
            });
        });
});

app.post("/logout", (request, response) => {
    request.session = null;
    response.redirect("/");
});

app.post("/api/litter", async (request, response) => {
    const newLitter = await createLitter(request.body.litterData);
    response.json(newLitter);
    for (const individual of request.body.animals) {
        const data = {
            ...individual,
            idAssociatedLitter: newLitter.litter_id,
        };
        createIndividual(data);
    }
});

app.post("/api/feedingData", async (request, response) => {
    const newFeedingEntry = await createFeedingEntry(request.body.feedingData);
    response.json(newFeedingEntry);
});

app.get("/api/litterOverview", checkLogin, async (request, response) => {
    const litters = await getLitters();
    response.json(litters);
});

app.get("/api/unfedLitters", async (request, response) => {
    const fullJoin = await fullJoinLittersAndFeedings();
    const unfedLitters = fullJoin.filter(function (record) {
        return record.feeding_id === null;
    });
    response.json(unfedLitters);
});

app.get("/api/nextFeedings", async (request, response) => {
    const lastFeedings = await getLastFeedings();
    const filteredData = [];
    for (const item of lastFeedings) {
        if (
            !filteredData.map((item) => item.litter_id).includes(item.litter_id)
        ) {
            filteredData.push(item);
        } else {
            const found = filteredData.find(
                (x) => x.litter_id === item.litter_id
            );
            if (item.feeding_id > found.feeding_id) {
                const index = filteredData
                    .map((el) => el.litter_id)
                    .indexOf(found.litter_id);
                filteredData[index] = item;
            }
        }
    }

    const newData = filteredData
        .map(function (feeding) {
            const arrayFeedingTimes = feeding.feedings;
            const lastFeedingTime = feeding.feedingslot;
            const currentIndex = arrayFeedingTimes.indexOf(lastFeedingTime);
            const nextIndex = (currentIndex + 1) % arrayFeedingTimes.length;
            const nextFeedingTime = arrayFeedingTimes[nextIndex];
            return { ...feeding, nextFeeding: nextFeedingTime };
        })
        .sort((a, b) => {
            if (a.nextFeeding > b.nextFeeding) {
                return 1;
            }
            return -1;
        });
    response.json(newData);
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
