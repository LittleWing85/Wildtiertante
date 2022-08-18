const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");

const { getUserById, createUser, login } = require("./db");

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

app.get("/api/users/me", (request, response) => {
    if (!request.session.user_id) {
        response.json(null);
        return;
    }
    getUserById(request.session.user_id).then((user) => {
        response.json(user);
    });
});

app.post("/api/users", (request, response) => {
    createUser(request.body)
        .then((user) => {
            request.session.user_id = user.id;
            response.json(user);
        })
        .catch((error) => {
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
        });
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, () =>
    console.log("[social:express] Listening.")
);
