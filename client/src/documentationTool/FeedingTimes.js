import { useState, useEffect } from "react";

export default function FeedingTimes({ idx, onFeedingsChange }) {
    const [time, setTime] = useState({});
    function handleChange(event) {
        setTime({ idx, time: event.target.value });
    }
    useEffect(() => {
        onFeedingsChange(time);
    }, [time]);
    return (
        <input
            className="inputTime"
            type="time"
            name={`feedingTime${idx + 1}`}
            id="feedingTime"
            onChange={handleChange}
        />
    );
}
