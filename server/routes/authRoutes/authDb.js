import fs from "fs";
import path from "path";
import spicedPg from "spiced-pg";
import bcrypt from "bcryptjs";

const secretsPath = path.resolve("./server/secrets.json");
const secretsRaw = fs.readFileSync(secretsPath);
const secrets = JSON.parse(secretsRaw);

const hash = (password) =>
    bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));

let db;
if (!process.env.DATABASE_URL) {
    const { DATABASE_USER, DATABASE_PASSWORD } = secrets;
    const DATABASE_NAME = "wildtiertante";
    db = spicedPg(
        `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`,
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
                [name, email, password_hash],
            )
            .then((result) => result.rows[0]);
    });
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

export { createUser, login };
