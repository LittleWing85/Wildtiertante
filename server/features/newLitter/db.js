import { pool } from "../../config/db.js";

function createLitter({
    id_associated_user,
    species,
    arrival,
    feedingslots,
    notes,
}) {
    return pool
        .query(
            `INSERT INTO litters (id_associated_user, species, arrival, feedingslots, notes)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`,
            [id_associated_user, species, arrival, feedingslots, notes],
        )
        .then((result) => result.rows[0]);
}

function createIndividual({ id_associated_litter, name, age, weight, sex }) {
    return pool
        .query(
            `INSERT INTO individuals (id_associated_litter, name, age, weight, sex) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [id_associated_litter, name, age, weight, sex],
        )
        .then((result) => result.rows[0]);
}

export { createLitter, createIndividual };
