import { useState } from "react";
import IndividualInfo from "./IndividualInfo.js";
import FeedingTimes from "./FeedingTimes.js";

export default function NewLitter() {
    const now = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(now);
    const [animals, setAnimals] = useState([
        {
            name: "animal1",
            age: 1,
            weight: 100,
            sex: "not sure yet",
        },
    ]);
    const [amountFeedings, setAmountFeedings] = useState(3);
    const [feedingTimes, setfeedingTimes] = useState([]);

    function onDateChange(event) {
        setDate(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        const litterData = {
            species: event.target.species.value,
            arrival: event.target.arrival.value,
            feedings: feedingTimes.map((time) => time.time),
            notes: event.target.notes.value,
        };
        const animalsWithDefaults = animals.map((x, index) => ({
            name: `Animal ${index + 1}`,
            age: 1,
            ...x,
        }));
        fetch("/api/litter", {
            method: "POST",
            body: JSON.stringify({ litterData, animals: animalsWithDefaults }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    function addAnimal() {
        setAnimals([
            ...animals,
            {
                name: `animal ${animals.length + 1}`,
                age: 1,
                weight: 100,
                sex: "not sure yet",
            },
        ]); /* .then(() => console.log(animals)); */
    }

    function removeLastAnimal() {
        setAnimals([animals.pop()]);
    }

    function onIndividualChange(retrievedInfo) {
        const newAnimals = [...animals];
        newAnimals[retrievedInfo.idx] = retrievedInfo;
        setAnimals(newAnimals);
    }

    function amountFeedingsChanged(event) {
        setAmountFeedings(parseInt(event.target.value));
    }

    function onFeedingsChange(addedFeedingTime) {
        const newFeedingTimes = [...feedingTimes];
        newFeedingTimes[addedFeedingTime.idx] = addedFeedingTime;
        setfeedingTimes(newFeedingTimes);
    }

    return (
        <section>
            <form className="litterForm" onSubmit={onSubmit}>
                <h1>Information about litter</h1>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="species">Species</label>
                    </div>
                    <input
                        required
                        className="inputWide"
                        type="text"
                        name="species"
                        id="species"
                        defaultValue="Eichhörnchen"
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="arrival">Date of Arrival</label>
                    </div>
                    <input
                        required
                        className="inputMiddle"
                        type="date"
                        name="arrival"
                        id="arrival"
                        value={date}
                        onChange={onDateChange}
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedings">Feedings per day</label>
                    </div>
                    <input
                        required
                        onChange={amountFeedingsChanged}
                        className="inputNarrow"
                        type="number"
                        name="feedings"
                        id="feedings"
                        min="2"
                        defaultValue={amountFeedings}
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedingTime">Feeding times</label>
                    </div>
                    <div className="flexHorizontallyInputs">
                        {Array(amountFeedings)
                            .fill(0)
                            .map((x, idx) => (
                                <FeedingTimes
                                    key={idx}
                                    idx={idx}
                                    onFeedingsChange={onFeedingsChange}
                                />
                            ))}
                    </div>
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="notes">Notes</label>
                    </div>
                    <textarea
                        className="inputWide"
                        type="text"
                        name="notes"
                        id="notes"
                        defaultValue="1"
                    ></textarea>
                </div>

                {animals.map((x, idx) => (
                    <IndividualInfo
                        animal={x}
                        key={idx}
                        idx={idx}
                        onIndividualChange={onIndividualChange}
                    />
                ))}
                <button onClick={addAnimal}>Add another animal</button>
                <button onClick={removeLastAnimal}>Remove last animal</button>
                <button className="topSpaceBig">Create this litter</button>
            </form>
        </section>
    );
}
