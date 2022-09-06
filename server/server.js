const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/newLitter", (request, response) => {
    console.log("server.js, request.body:", request.body);
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
