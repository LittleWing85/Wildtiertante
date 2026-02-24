import { pool } from "../../config/db.js";

function getAllFeedings(currentUser) {
    return pool
        .query(
            `SELECT * 
            FROM litters
            JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_user=$1`,
            [currentUser],
        )
        .then((result) => result.rows);
}

export { getAllFeedings };
