const express = require("express");
const app = express();
const path = require("path");
const { createLitter, createIndividual } = require("./db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/litter", (request, response) => {
    console.log(request.body);
    createLitter(request.body.litterData).then((newLitter) => {
        const data = { ...request.body, id_ofLitter: newLitter.id_litter };
        console.log("server.js, data:", data);
        for (const individual of data.animals) {
            console.log(individual.name);
        }
        /* 
                 createIndividual(data).then((newIndividual) =>
            console.log("server.js", newIndividual)
        ); */
    });
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
