const express = require("express");
const app = express();
const path = require("path");
const { createLitter, createIndividual } = require("./db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/litter", async (request, response) => {
    console.log(request.body.litterData);
    const newLitter = await createLitter(request.body.litterData);
    response.json(newLitter);
    /*     .then((newLitter) => {
        for (const individual of request.body.animals) {
            const data = { ...individual, id_ofLitter: newLitter.id_litter };
            createIndividual(data);
        }
    }); */
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
