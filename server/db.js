const spicedPg = require("spiced-pg");

const { genSalt, hash: bcryptHash, compare } = require("bcryptjs");

function hash(password) {
    return genSalt().then((salt) => bcryptHash(password, salt));
}

const database = process.env.DB || "social-network";

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { DATABASE_USERNAME, DATABASE_PASSWORD } = require("../secrets.json");
    return `postgres:${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/${database}`;
}

const db = spicedPg(getDatabaseURL());

console.log(`[social:db] connecting to ${database}`);

async function getUserById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

function createUser({ first_name, last_name, email, password }) {
    return hash(password).then((password_hash) =>
        db
            .query(
                `
                INSERT INTO users (first_name, last_name, email, password_hash)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0])
    );
}

async function login({ email, password }) {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    const match = await compare(password, user.password_hash);
    return match ? user : null;
}

function updateUserProfilePicture({ user_id, profile_picture_url }) {
    return db.query(`UPDATE users SET profile_picture_url = $1 WHERE id = $2`, [
        profile_picture_url,
        user_id,
    ]);
}

module.exports = {
    getUserById,
    login,
    createUser,
    updateUserProfilePicture,
};
