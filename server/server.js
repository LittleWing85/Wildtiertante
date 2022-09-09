const express = require("express");
const app = express();
const path = require("path");
const {
    createLitter,
    createIndividual,
    getLastFeedings,
    fullJoinLittersAndFeedings,
    createFeedingEntry,
    getLitters,
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

app.post("/api/feedingData", async (request, response) => {
    const newFeedingEntry = await createFeedingEntry(request.body.feedingData);
    response.json(newFeedingEntry);
});
app.get("/api/litterOverview", async (request, response) => {
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
