import { useState, useEffect } from "react";

export default function FeedingTimes({
    idx,
    onFeedingsChange /* , feedingTimes */,
}) {
    const [time, setTime] = useState({});
    /*  const [defaultFeedingTime, setDefaultFeedingTime] = useState("12:34"); */
    /*  const defaultFeedingTime = "12:34"; */
    //Note for later use to suggest feeding times: const defaultFeedingTimes = ["12:00", "18:00", "00:00", "06:00"];

    function handleChange(event) {
        setTime({ idx, time: event.target.value });
    }

    useEffect(() => {
        onFeedingsChange(time);
        /* console.log(feedingTimes[1]); */
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
