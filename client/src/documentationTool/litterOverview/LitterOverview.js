export default function LitterOverview() {
    return <p>You will see an overview of your litters later</p>;
}
/*import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
    const [showMessage, setShowMessage] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        fetch("/api/litterOverview")
            .then((response) => response.json())
            .then((data) => {
                if (!data) {
                    history.push("/");
                    alert("Please log in first to use this functionality.");
                    return;
                }
                if (data.length === 0) {
                    setShowMessage(true);
                    return;
                }
                setCurrentLitters(data);
            });
    }, []);

    return (
        <section>
            {showMessage && (
                <p className="topSpace">
                    You have no litters currently. Click{" "}
                    <NavLink to="/newLitter">here</NavLink> to add new litters.
                </p>
            )}
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
                            {currentLitter.feedingslots.map((feedingTime) => (
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
*/
