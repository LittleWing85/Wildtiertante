import { pool } from "../../config/db.js";

async function createFeedingEntry({
    id_associated_litter,
    amountMilk,
    feedingSlot,
}) {
    const feedingDate = await determineDateForFeedingEntry(
        id_associated_litter,
        feedingSlot,
    );
    return pool
        .query(
            `INSERT INTO feedings (id_associated_litter, amountMilk, feedingSlot, feedingDate)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [id_associated_litter, amountMilk, feedingSlot, feedingDate],
        )
        .then((result) => result.rows[0]);
}

async function determineDateForFeedingEntry(id_associated_litter, feedingSlot) {
    const feedingsOfSpecificLitter =
        await getFeedingsOfSpecificLitter(id_associated_litter);
    if (feedingsOfSpecificLitter.length === 0) {
        // This means that the litter just arrived and never has been fed. We take today's date for the first feeding.
        const currentFeedingDate = new Date()
            .toISOString()
            .split("T")
            .slice(0, 1)[0];
        return currentFeedingDate;
    }
    const litterData =
        await getLitterDataOfSpecificLitter(id_associated_litter);
    const firstFeedingInArray = litterData[0].feedingslots[0];
    if (firstFeedingInArray === feedingSlot) {
        // This means that this is the first feeding of a day and to keep track of the date of this feeding, we take the date from the previous feeding plus one day
        const nextDay = new Date(
            feedingsOfSpecificLitter[feedingsOfSpecificLitter.length - 1]
                .feedingdate,
        );
        nextDay.setDate(nextDay.getDate() + 1);
        const currentFeedingDate = nextDay
            .toISOString()
            .split("T")
            .slice(0, 1)[0];
        return currentFeedingDate;
    } else {
        // In this case, the litter has been fed today already.
        // We can use the date from the previous feeding to be sure.
        // On stressful days, feedings might be done a little later which assigns feedings right before midnight to the wrong day
        // if we use the date that the server provides.
        const currentFeedingDate =
            feedingsOfSpecificLitter[feedingsOfSpecificLitter.length - 1]
                .feedingdate;
        return currentFeedingDate;
    }
}

function getLitterDataOfSpecificLitter(litter_id) {
    return pool
        .query(
            `SELECT * 
            FROM litters
            WHERE litter_id=$1`,
            [litter_id],
        )
        .then((result) => result.rows);
}

function getFeedingsOfSpecificLitter(id_associated_litter) {
    return pool
        .query(
            `SELECT * 
            FROM litters
            JOIN feedings
            ON litters.litter_id = feedings.id_associated_litter
            WHERE id_associated_litter=$1
            ORDER by feeding_id ASC`,
            [id_associated_litter],
        )
        .then((result) => result.rows);
}

export { createFeedingEntry };
