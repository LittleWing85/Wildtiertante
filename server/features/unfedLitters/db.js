import { pool } from "../../config/db.js";

function fullJoinLittersAndFeedings(currentUser) {
    return pool
        .query(
            `SELECT * 
            FROM litters
            FULL JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_user=$1
            ORDER by litters.litterCreated_at ASC`,
            [currentUser],
        )
        .then((result) => result.rows);
}

export { fullJoinLittersAndFeedings };
