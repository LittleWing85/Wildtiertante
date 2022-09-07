import { useState, useEffect } from "react";

export default function FeedingTimes({ idx, onFeedingsChange }) {
    const [time, setTime] = useState({});
    function handleChange(event) {
        console.log("event.target.name", event.target.name);
        console.log("event.target.value", event.target.value);
        setTime({ idx, [event.target.name]: event.target.value });
        console.log("time", time);
    }
    /*     useEffect(() => {
        onFeedingsChange(time);
    }, [time]); */
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
