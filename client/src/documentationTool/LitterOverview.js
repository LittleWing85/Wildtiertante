import { useState, useEffect } from "react";
function formatDate(date) {
    const formattedDate = date.split("T").slice(0, 1);
    return formattedDate;
}
function formatTime(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime + " ";
}

export default function LitterOverview() {
    const [currentLitters, setCurrentLitters] = useState([]);

    useEffect(() => {
        fetch("/api/litterOverview")
            .then((response) => response.json())
            .then((data) => {
                setCurrentLitters(data);
            });
    }, []);

    return (
        <section>
            <ul>
                {currentLitters.map((currentLitter) => (
                    <li key={currentLitter.litter_id} className="listStyleNone">
                        <h1>
                            {currentLitter.species}, litter ID:{" "}
                            {currentLitter.litter_id}
                        </h1>
                        <p>Arrival date: {formatDate(currentLitter.arrival)}</p>
                        {currentLitter.notes && (
                            <p>Notes: {currentLitter.notes}</p>
                        )}
                        <p className="bottomSpace">
                            Feeding times:{" "}
                            {currentLitter.feedings.map((feedingTime) => (
                                <span key={feedingTime}>
                                    {formatTime(feedingTime)}
                                </span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
