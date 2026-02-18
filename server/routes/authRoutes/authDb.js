import db from "../../config/db.js";
import bcrypt from "bcryptjs";
import ValidationError from "../../errors/ValidationError.js";

const hash = (password) => bcrypt.hash(password, 12);

async function createUser({ name, email, password }) {
    if (!name || !email || !password) {
        throw new ValidationError("Bitte fülle alle Felder aus!");
    }
    const password_hash = await hash(password);
    const result = await db.query(
        `INSERT INTO users (name, email, password_hash) 
                VALUES ($1, $2, $3)
                RETURNING name, email, user_id`,
        [name, email, password_hash],
    );
    return result.rows[0];
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
