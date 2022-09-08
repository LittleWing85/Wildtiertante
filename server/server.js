const express = require("express");
const app = express();
const path = require("path");
const {
    createLitter,
    createIndividual,
    getLastFeedings,
    fullJoinLittersAndFeedings,
} = require("./db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

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
    //ToDo: Map each result to the next feeding
    //How can the next feeding be determined?
    //Maybe by determining the index of the timeSlot of the last feeding
    //in the array with the feeding times
    //and then take the time at the next index?
    //ToDo: Sorting the array for feedingSlot desc after mapping
    response.json(filteredData);
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
