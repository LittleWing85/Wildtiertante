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
    return db
        .query(
            `INSERT INTO litters (species, arrival, amount, feedings, notes) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [species, arrival, amount, feedings, notes]
        )
        .then((result) => result.rows[0]);
}
function createIndividual({ id_ofLitter, name, age, weight, sex }) {
    console.log("db.js", id_ofLitter);
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
