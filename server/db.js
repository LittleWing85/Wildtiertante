const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

const hash = (password) =>
    bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));

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

function createUser({ name, email, password }) {
    return hash(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (name, email, password_hash) 
                VALUES ($1, $2, $3)
                RETURNING *`,
                [name, email, password_hash]
            )
            .then((result) => result.rows[0]);
    });
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

function login({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
            console.log("no User found");
            return null;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then((match) => {
                if (match) {
                    return foundUser;
                }
                return null;
            });
    });
}

function getUserByEmail(email) {
    return db
        .query(`SELECT * FROM users WHERE email =$1`, [email])
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
    createUser,
    createLitter,
    createIndividual,
    login,
    getLastFeedings,
    fullJoinLittersAndFeedings,
    createFeedingEntry,
    getLitters,
};
