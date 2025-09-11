/*This component is part of the form for adding a new litter to the user's account.
The user can add feeding times in here.*/

import { useState, useEffect } from "react";

export default function FeedingTimes({ idx, onFeedingsChange }) {
    const [time, setTime] = useState({});
    //Note for later use to suggest feeding times: const defaultFeedingTimes = ["12:00", "18:00", "00:00", "06:00"];

    function handleChange(event) {
        setTime({ idx, time: event.target.value });
    }

    useEffect(() => {
        onFeedingsChange(time);
    }, [time]);

    return (
        <input
            required
            className="inputTime"
            type="time"
            name={`feedingTime${idx + 1}`}
            id="feedingTime"
            onChange={handleChange}
            /* value={feedingTimes[idx]} */
            //Note for later use to suggest feeding times: defaultValue={defaultFeedingTimes[idx]}
        />
    );
}
