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

function createLitter({
    id_associated_user,
    species,
    arrival,
    feedings,
    notes,
}) {
    return db
        .query(
            `INSERT INTO litters (id_associated_user, species, arrival, feedings, notes)
			VALUES($1, $2, $3, $4, $5)
			RETURNING *`,
            [id_associated_user, species, arrival, feedings, notes]
        )
        .then((result) => result.rows[0]);
}

function createFeedingEntry({ id_associated_litter, amountMilk, feedingSlot }) {
    return db
        .query(
            `INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
			VALUES($1, $2, $3)
			RETURNING *`,
            [id_associated_litter, amountMilk, feedingSlot]
        )
        .then((result) => result.rows[0]);
}

function createFeedingEntryFirstTime({
    id_associated_litter,
    amountMilk,
    feedingSlot,
}) {
    const today = new Date();
    /*     const formattedDate = today.split("T").slice(0, 1);
    const test = new Date().split("T").slice(0, 1); */
    console.log(today);
    /*     console.log(formattedDate);
    console.log(test); */

    return db
        .query(
            `INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot)
			VALUES($1, $2, $3)
			RETURNING *`,
            [id_associated_litter, amountMilk, feedingSlot]
        )
        .then((result) => result.rows[0]);
}

function createIndividual({ id_associated_litter, name, age, weight, sex }) {
    return db
        .query(
            `INSERT INTO individuals (id_associated_litter, name, age, weight, sex) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [id_associated_litter, name, age, weight, sex]
        )
        .then((result) => result.rows[0]);
}

function login({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
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

function getLitters(currentUser) {
    return db
        .query(
            `SELECT * FROM litters
            WHERE id_associated_user=$1
            ORDER by litter_id ASC`,
            [currentUser]
        )
        .then((result) => result.rows);
}

function getAllFeedings(currentUser) {
    return db
        .query(
            `SELECT * 
            FROM litters
            JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_user=$1`,
            [currentUser]
        )
        .then((result) => result.rows);
}

function fullJoinLittersAndFeedings(currentUser) {
    return db
        .query(
            `SELECT * 
            FROM litters
            FULL JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_user=$1
            ORDER by litters.litterCreated_at ASC`,
            [currentUser]
        )
        .then((result) => result.rows);
}
module.exports = {
    createUser,
    createLitter,
    createIndividual,
    login,
    getAllFeedings,
    fullJoinLittersAndFeedings,
    createFeedingEntry,
    createFeedingEntryFirstTime,
    getLitters,
};
