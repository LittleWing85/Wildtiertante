import { pool } from "../../config/db.js";

function getLitters(currentUser) {
    return pool
        .query(
            `SELECT * FROM litters
            WHERE id_associated_user=$1
            ORDER by litter_id ASC`,
            [currentUser],
        )
        .then((result) => result.rows);
}

export { getLitters };
