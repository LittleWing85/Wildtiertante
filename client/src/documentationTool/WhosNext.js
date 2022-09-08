import { useState, useEffect } from "react";

function formatTime(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime;
}

export default function WhosNext() {
    const [currentLitters, setCurrentLitters] = useState([]);
    const [unfedLitters, setUnfedLitters] = useState([]);
    const [currentFeedingSlot, setCurrentFeedingSlot] = useState("");

    function saveTime(feedingSlot) {
        setCurrentFeedingSlot(feedingSlot);
    }

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        fetch("/api/nextFeedings")
            .then((response) => response.json())
            .then((data) => setCurrentLitters(data));

        fetch("/api/unfedLitters")
            .then((response) => response.json())
            .then((data) => setUnfedLitters(data));
    }

    function onSubmitUnfed(event) {
        event.preventDefault();
        const feedingData = {
            amountMilk: event.target.amountMilk.value,
            feedingSlot: event.target.feedingSlot.value,
            idAssociatedLitter: event.target.name,
        };

        fetch("/api/feedingData", {
            method: "POST",
            body: JSON.stringify({ feedingData }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            updateData();
        });
    }

    function onSubmitFed(event) {
        event.preventDefault();
        const feedingData = {
            amountMilk: event.target.amountMilk.value,
            feedingSlot: event.target.feedingSlot,
            idAssociatedLitter: event.target.name,
        };

        console.log(feedingData);
        /*         fetch("/api/feedingData", {
            method: "POST",
            body: JSON.stringify({ feedingData }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            updateData();
        }); */
    }

    return (
        <section>
            <ul>
                {unfedLitters.map((unfedLitter) => (
                    <li key={unfedLitter.litter_id} className="listStyleNone">
                        <h1>Unfed</h1>
                        <p>
                            Litter with {unfedLitter.species}, Litter id:{" "}
                            {unfedLitter.litter_id}
                        </p>

                        {unfedLitter.notes && <p>Notes: {unfedLitter.notes}</p>}

                        <form
                            onSubmit={onSubmitUnfed}
                            name={unfedLitter.litter_id}
                        >
                            <div className="flexHorizontallyInputs">
                                <div className="labelFixedWidth">
                                    <label htmlFor="amountMilk">
                                        Amount of milk consumed
                                    </label>
                                </div>
                                <input
                                    required
                                    className="inputWide"
                                    type="text"
                                    name="amountMilk"
                                    id="amountMilk"
                                />
                            </div>
                            <div className="flexHorizontallyInputs">
                                <div className="labelFixedWidth">
                                    <label htmlFor="feedingSlot">
                                        Feeding slot
                                    </label>
                                </div>
                                <select name="feedingSlot" id="feedingSlot">
                                    <option value="08:00">8:00</option>

                                    <option value="16:00">16:00</option>
                                    <option value="00:00">00:00</option>
                                </select>
                            </div>

                            <button>
                                Submit ammount of milk and feedingSlot
                            </button>
                        </form>
                    </li>
                ))}
            </ul>

            <ul>
                {currentLitters.map((currentLitter) => (
                    <li key={currentLitter.litter_id} className="listStyleNone">
                        <h1>
                            Time of next feeding:{" "}
                            {formatTime(currentLitter.nextFeeding)}
                        </h1>
                        <p>
                            Litter with {currentLitter.species}, Litter id:{" "}
                            {currentLitter.litter_id}
                        </p>
                        {currentLitter.notes && (
                            <p>Notes: {currentLitter.notes}</p>
                        )}
                        <form
                            onSubmit={onSubmitFed}
                            name={currentLitter.litter_id}
                        >
                            <div className="flexHorizontallyInputs">
                                <div className="labelFixedWidth">
                                    <label htmlFor="amountMilk">
                                        Amount of milk consumed
                                    </label>
                                </div>
                                <input
                                    required
                                    className="inputWide"
                                    type="text"
                                    name="amountMilk"
                                    id="amountMilk"
                                />
                            </div>
                            <button>Submit ammount of milk</button>
                        </form>
                    </li>
                ))}
            </ul>
        </section>
    );
}
