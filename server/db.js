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

async function createFeedingEntry({
    id_associated_litter,
    amountMilk,
    feedingSlot,
}) {
    const feedingDate = await determineDateForFeedingEntry(
        id_associated_litter,
        feedingSlot
    );
    return db
        .query(
            `INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot, feedingDate)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [id_associated_litter, amountMilk, feedingSlot, feedingDate]
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

function getlitterDataOfSpecificLitter(litter_id) {
    return db
        .query(
            `SELECT * 
            FROM litters
            WHERE litter_id=$1`,
            [litter_id]
        )
        .then((result) => result.rows);
}

function getFeedingsOfSpecificLitter(id_associated_litter) {
    return db
        .query(
            `SELECT * 
            FROM litters
            JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_litter=$1
            ORDER by feeding_id ASC`,
            [id_associated_litter]
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

async function determineDateForFeedingEntry(id_associated_litter, feedingSlot) {
    const feedingsOfSpecificLitter = await getFeedingsOfSpecificLitter(
        id_associated_litter
    );
    if (feedingsOfSpecificLitter.length === 0) {
        // This means that the litter just arrived and never has been fed. We take today's date for the first feeding.
        const currentFeedingDate = new Date()
            .toISOString()
            .split("T")
            .slice(0, 1)[0];
        console.log(currentFeedingDate);
        return currentFeedingDate;
    }
    const litterData = await getlitterDataOfSpecificLitter(
        id_associated_litter
    );
    const firstFeedingInArray = litterData[0].feedings[0];
    if (firstFeedingInArray === feedingSlot) {
        // This means that this is the first feeding of a day and to keep track of the date of this feeding, we take the date from the previous feeding plus one day
        const nextDay = new Date(
            feedingsOfSpecificLitter[
                feedingsOfSpecificLitter.length - 1
            ].feedingdate
        );
        nextDay.setDate(nextDay.getDate() + 1);
        const currentFeedingDate = nextDay
            .toISOString()
            .split("T")
            .slice(0, 1)[0];
        console.log(currentFeedingDate);
        return currentFeedingDate;
    } else {
        // In this case, the litter has been fed today already.
        // We can use the date from the previous feeding to be sure.
        // On stressful days, feedings might be done a little later which assigns feedings right before midnight to the wrong day
        // if we use the date that the server provides.
        const currentFeedingDate =
            feedingsOfSpecificLitter[feedingsOfSpecificLitter.length - 1]
                .feedingdate;
        console.log(currentFeedingDate);
        return currentFeedingDate;
    }
}

module.exports = {
    createUser,
    createLitter,
    createIndividual,
    login,
    getAllFeedings,
    fullJoinLittersAndFeedings,
    createFeedingEntry,
    getLitters,
};
