const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");

const { uploader } = require("./upload");
const { s3upload, Bucket } = require("./s3");
const {
    getUserById,
    createUser,
    updateUserProfilePicture,
    updateUserBio,
    login,
    getRecentUsers,
    searchUsers,
} = require("./db");

const { SESSION_SECRET } = require("../secrets.json");

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 90,
    })
);

app.get("/api/users/me", async (request, response) => {
    if (!request.session.user_id) {
        response.json(null);
        return;
    }
    const loggedUser = await getUserById(request.session.user_id);
    response.json(loggedUser);
});

app.get("/api/users/recent", async (request, response) => {
    const users = await getRecentUsers(request.query);
    response.json(users);
});

app.get("/api/users/search", async (request, response) => {
    const users = await searchUsers(request.query);
    response.json(users);
});

app.put("/api/users/me", async (request, response) => {
    if (!request.session.user_id) {
        response.json(null);
        return;
    }
    const updatedUser = await updateUserBio({
        user_id: request.session.user_id,
        ...request.body,
    });
    response.json(updatedUser);
});

app.post("/api/users", async (request, response) => {
    try {
        const newUser = await createUser(request.body);
        request.session.user_id = newUser.id;
        response.json(newUser);
    } catch (error) {
        console.log("POST /api/users", error);
        if (error.constraint === "users_email_key") {
            response.status(400).json({
                error: "E-mail already in use",
            });
            return;
        }
        response.status(500).json({
            error: "Something went wrong",
        });
    }
});

app.post("/api/login", (request, response) => {
    login(request.body)
        .then((user) => {
            if (!user) {
                response.status(401).json({
                    error: "Wrong credentials",
                });
                return;
            }
            request.session.user_id = user.id;
            response.json(user);
        })
        .catch((error) => {
            console.log("POST /api/login", error);
            response.status(500).json({
                error: "Something went wrong",
            });
        });
});

app.post(
    "/api/users/profile",
    uploader.single("file"),
    s3upload,
    async (request, response) => {
        const profile_picture_url = `https://s3.amazonaws.com/${Bucket}/${request.file.filename}`;
        try {
            await updateUserProfilePicture({
                user_id: request.session.user_id,
                profile_picture_url,
            });
            response.json({ profile_picture_url });
        } catch (error) {
            console.log("POST /api/users/profile", error);
            response.status(500).json({ message: "error uploading image" });
        }
    }
);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, () =>
    console.log("[social:express] Listening.")
);
