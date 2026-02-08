// Gets litters that have been fed at least once
// Maps the time the litters have been feed last to the time when the next feeding should happen

import express from "express";

import wrap from "../../middleware/wrap.js";
import requireLogin from "./requireLogin.js";
import { getAllFeedings } from "./protectedRoutesDb.js";

const getAllFeedingsRouter = express.Router();

getAllFeedingsRouter.get(
    "/",
    requireLogin,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const allFeedings = await getAllFeedings(currentUser); // all data about feedings that have already happened
        const lastFeedings = []; // data about the last time each litter was fed
        for (const item of allFeedings) {
            if (
                !lastFeedings
                    .map((item) => item.litter_id)
                    .includes(item.litter_id)
            ) {
                lastFeedings.push(item);
            } else {
                const found = lastFeedings.find(
                    (x) => x.litter_id === item.litter_id,
                );
                if (item.feeding_id > found.feeding_id) {
                    const index = lastFeedings
                        .map((el) => el.litter_id)
                        .indexOf(found.litter_id);
                    lastFeedings[index] = item;
                }
            }
        }

        /* maps time of last feeding for each litter to the time each litter should be fed next */
        const nextFeedings = lastFeedings
            .map(function (feeding) {
                const arrayFeedingTimes = feeding.feedingslots; // array with all daily feeding slots
                const lastFeedingTime = feeding.feedingslot; // time of the last feeding
                const currentIndex = arrayFeedingTimes.indexOf(lastFeedingTime); // position of the last feeding time in the array with all feeding slots
                const nextIndex = (currentIndex + 1) % arrayFeedingTimes.length; // position of the next feeding time in the array with all feeding slots
                const nextFeedingTime = arrayFeedingTimes[nextIndex]; // time of the next feeding
                //Puts together the time of the next feeding with the date from the last feeding

                //If nextIndex is 0, the next feeding happens on the next day so JS has to add 1 to the day
                if (nextIndex === 0) {
                    let nextFeedingDateAndTime = new Date(
                        feeding.feedingdate + "T" + nextFeedingTime + ".000Z",
                    );
                    nextFeedingDateAndTime.setDate(
                        nextFeedingDateAndTime.getDate() + 1,
                    );
                    return {
                        ...feeding,
                        nextFeedingTime: nextFeedingTime,
                        nextFeedingDateAndTime: nextFeedingDateAndTime,
                    };
                }
                let nextFeedingDateAndTime = new Date(
                    feeding.feedingdate + "T" + nextFeedingTime + ".000Z",
                );
                return {
                    ...feeding,
                    nextFeedingTime: nextFeedingTime,
                    nextFeedingDateAndTime: nextFeedingDateAndTime,
                };
            })
            .sort((a, b) => {
                if (a.nextFeedingDateAndTime > b.nextFeedingDateAndTime) {
                    return 1;
                }
                return -1;
            });
        // allFeedings is an array that contains an object for each litter; each object includes the data of the last feeding, the litter and the next feeding time
        response.json(nextFeedings);
    }),
);

export default getAllFeedingsRouter;
