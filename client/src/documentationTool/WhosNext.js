import { useState, useEffect } from "react";

function formatTime(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime;
}

export default function WhosNext() {
    const [currentLitters, setCurrentLitters] = useState([]);
    const [unfedLitters, setUnfedLitters] = useState([]);

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
            event.target.amountMilk.value = "";
        });
    }

    function onSubmitFed(event) {
        event.preventDefault();
        const feedingData = {
            amountMilk: event.target.amountMilk.value,
            idAssociatedLitter: event.target.name,
            feedingSlot: event.target.currentFeeding.value,
        };

        fetch("/api/feedingData", {
            method: "POST",
            body: JSON.stringify({ feedingData }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            updateData();
            event.target.amountMilk.value = "";
        });
    }

    return (
        <section>
            <ul>
                {unfedLitters.map((unfedLitter) => (
                    <li key={unfedLitter.litter_id} className="listStyleNone">
                        <h1>
                            Unfed, Litter number {unfedLitter.litter_id} (
                            {unfedLitter.species})
                        </h1>

                        {unfedLitter.notes && (
                            <p className="topSpaceSmall">
                                Notes: {unfedLitter.notes}
                            </p>
                        )}

                        <form
                            className="formMainContainer"
                            onSubmit={onSubmitUnfed}
                            name={unfedLitter.litter_id}
                        >
                            <div className="flexHorizontallyInputs">
                                <div className="labelFixedWidth">
                                    <label htmlFor="feedingSlot">
                                        Feeding slot
                                    </label>
                                </div>

                                <select
                                    className="inputMiddle inputMilk"
                                    name="feedingSlot"
                                    id="feedingSlot"
                                >
                                    <option value="08:00">8:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="00:00">00:00</option>
                                </select>
                            </div>
                            <div className="flexHorizontallyInputs bottomSpace">
                                <div className="labelFixedWidth">
                                    <label htmlFor="amountMilk">
                                        Amount of milk:
                                    </label>
                                </div>
                                <input
                                    required
                                    className="inputMiddle inputMilk"
                                    type="text"
                                    name="amountMilk"
                                    id="amountMilk"
                                />

                                <button className="buttonWhosNext">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </li>
                ))}
            </ul>

            <ul>
                {currentLitters.map((currentLitter) => (
                    <li key={currentLitter.litter_id} className="listStyleNone">
                        <h2>
                            At {formatTime(currentLitter.nextFeeding)}: Litter
                            number {currentLitter.litter_id} (
                            {currentLitter.species})
                        </h2>

                        {currentLitter.notes && (
                            <p className="topSpaceSmall">
                                Notes: {currentLitter.notes}
                            </p>
                        )}
                        <form
                            onSubmit={onSubmitFed}
                            name={currentLitter.litter_id}
                        >
                            <input
                                type="hidden"
                                name="currentFeeding"
                                value={currentLitter.nextFeeding}
                            />
                            <div className="flexHorizontallyInputs bottomSpace">
                                <div className="labelFixedWidth">
                                    <label htmlFor="amountMilk">
                                        Amount of milk:
                                    </label>
                                </div>
                                <input
                                    required
                                    className="inputMiddle inputMilk"
                                    type="text"
                                    name="amountMilk"
                                    id="amountMilk"
                                />
                                <button className="buttonWhosNext">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </li>
                ))}
            </ul>
        </section>
    );
}
