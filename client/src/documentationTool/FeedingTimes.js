import { useState, useEffect } from "react";

export default function FeedingTimes({ idx, onFeedingsChange }) {
    const [time, setTime] = useState({});
    const defaultFeedingTimes = ["07:00", "15:00", "23:00"];
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
            defaultValue={defaultFeedingTimes[idx]}
        />
    );
}
