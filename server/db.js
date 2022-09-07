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

function createLitter({ species, arrival, amount, feedings, notes }) {
    const feedingsArray = "ARRAY [TIME '7:00', TIME '14:30']";
    return db
        .query(
            `INSERT INTO litters (species, arrival, amount, feedings, notes) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [species, arrival, amount, feedingsArray, notes]
        )
        .then((result) => result.rows[0]);
}
function createIndividual({ id_ofLitter, name, age, weight, sex }) {
    return db
        .query(
            `INSERT INTO individuals (id_ofLitter, name, age, weight, sex) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [id_ofLitter, name, age, weight, sex]
        )
        .then((result) => result.rows[0]);
}
module.exports = {
    createLitter,
    createIndividual,
};
