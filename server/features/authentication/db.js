import { pool } from "../../config/db.js";
import bcrypt from "bcryptjs";
import { ValidationError } from "../../errors/ValidationError.js";
import { DatabaseError } from "../../errors/DatabaseError.js";

const hash = (password) => bcrypt.hash(password, 12);

async function createUser({ name, email, password }) {
    if (!name || !email || !password) {
        throw new ValidationError("Bitte fülle alle Felder aus!");
    }
    const password_hash = await hash(password);
    try {
        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash) 
                VALUES ($1, $2, $3)
                RETURNING user_id`,
            [name, email, password_hash],
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === "23505") {
            throw new ValidationError(
                "Ein Nutzer mit dieser Emailadresse existiert bereits.",
            );
        }
        throw new DatabaseError(
            "Die Registrierung ist momentan nicht möglich. Bitte versuche es später noch einmal.",
        );
    }
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
    return pool
        .query(`SELECT * FROM users WHERE email =$1`, [email])
        .then((result) => result.rows[0]);
}

async function findUserById(user_id) {
    const result = await pool.query(`SELECT 1 FROM users WHERE user_id =$1`, [
        user_id,
    ]);
    return result.rowCount > 0;
}

export { createUser, login, findUserById };
