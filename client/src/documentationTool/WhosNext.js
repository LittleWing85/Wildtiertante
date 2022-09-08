import { useState, useEffect } from "react";

export default function WhosNext() {
    const [currentLitters, setCurrentLitters] = useState([]);
    const [unfedLitters, setUnfedLitters] = useState([]);

    useEffect(() => {
        fetch("/api/nextFeedings")
            .then((response) => response.json())
            .then((data) => setCurrentLitters(data));
    }, []);

    useEffect(() => {
        fetch("/api/unfedLitters")
            .then((response) => response.json())
            .then((data) => setUnfedLitters(data));
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target.name);
        const feedingData = {
            amountMilk: event.target.amountMilk.value,
            feedingSlot: event.target.feedingSlot.value,
            //ID of litter has to be sent, too
        };
        console.log(feedingData);

        fetch("/api/feedingData", {
            method: "POST",
            body: JSON.stringify({ feedingData }),
            headers: {
                "Content-Type": "application/json",
            },
        });
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

                        <form onSubmit={onSubmit} name={unfedLitter.litter_id}>
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
                                <input
                                    required
                                    className="inputTime"
                                    type="time"
                                    name="feedingSlot"
                                    id="feedingSlot"
                                />
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
                        <h1>Time of next feeding:</h1>
                        <p>
                            Litter with {currentLitter.species}, Litter id:{" "}
                            {currentLitter.litter_id}
                        </p>
                        {currentLitter.notes && (
                            <p>Notes: {currentLitter.notes}</p>
                        )}
                        <form>
                            <input />
                            <button>Submit ammount of milk</button>
                        </form>
                    </li>
                ))}
            </ul>
        </section>
    );
}
