const spicedPg = require("spiced-pg");
let db;
if (!process.env.DATABASE_URL) {
    const { DATABASE_USER, DATABASE_PASSWORD } = require("./secrets.json");
    const DATABASE_NAME = "wildtiertante";
    db = spicedPg(
        `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
    );
} else {
    db = spicedPg(process.env.DATABASE_URL);
}

function createLitter({ species, arrival, feedings, notes }) {
    return db
        .query(
            `INSERT INTO litters (species, arrival, feedings, notes)
			VALUES($1, $2, $3, $4)
			RETURNING *`,
            [species, arrival, feedings, notes]
        )
        .then((result) => result.rows[0]);
}

function createFeedingEntry({ idAssociatedLitter, amountMilk, feedingSlot }) {
    console.log(idAssociatedLitter);
    return db
        .query(
            `INSERT INTO feedings (idAssociatedLitter, amountMilk, feedingSlot)
			VALUES($1, $2, $3)
			RETURNING *`,
            [idAssociatedLitter, amountMilk, feedingSlot]
        )
        .then((result) => result.rows[0]);
}

function createIndividual({ idAssociatedLitter, name, age, weight, sex }) {
    return db
        .query(
            `INSERT INTO individuals (idAssociatedLitter, name, age, weight, sex) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [idAssociatedLitter, name, age, weight, sex]
        )
        .then((result) => result.rows[0]);
}

function getLitters() {
    return db
        .query(
            `SELECT * FROM litters
            ORDER by litter_id ASC`
        )
        .then((result) => result.rows);
}

function getLastFeedings() {
    return db
        .query(
            `SELECT * 
            FROM litters
            JOIN feedings
            ON litters.litter_id = feedings.idAssociatedLitter`
        )
        .then((result) => result.rows);
}

function fullJoinLittersAndFeedings() {
    return db
        .query(
            `SELECT * 
            FROM litters
            FULL JOIN feedings
            ON litters.litter_id = feedings.idAssociatedLitter
            ORDER by litters.litterCreated_at ASC`
        )
        .then((result) => result.rows);
}
module.exports = {
    createLitter,
    createIndividual,
    getLastFeedings,
    fullJoinLittersAndFeedings,
    createFeedingEntry,
    getLitters,
};
