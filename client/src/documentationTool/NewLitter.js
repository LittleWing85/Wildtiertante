import { useState } from "react";
import IndividualInfo from "./IndividualInfo.js";
import FeedingTimes from "./FeedingTimes.js";

export default function NewLitter() {
    const now = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(now);
    const [amountIndividuals, setAmountIndividuals] = useState(2);
    const [animals, setAnimals] = useState([]);
    const [amountFeedings, setAmountFeedings] = useState(3);
    const [feedingTimes, setfeedingTimes] = useState([]);

    function onDateChange(event) {
        setDate(event.target.value);
    }

    function amountIndividualsChanged(event) {
        setAmountIndividuals(parseInt(event.target.value));
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
        //console.log("NewLitter.js, feedingTimes:", feedingTimes);
    }

    function onSubmit(event) {
        event.preventDefault();
        const litterData = {
            species: event.target.species.value,
            arrival: event.target.arrival.value,
            amount: event.target.amount.value,
            /*             feedings: event.target.feedings.value, */
            feedings: feedingTimes.map((time) => time.time),
            notes: event.target.notes.value,
        };
        fetch("/api/litter", {
            method: "POST",
            body: JSON.stringify({ litterData, animals }),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                        <label htmlFor="amount">Amount of animals</label>
                    </div>
                    <input
                        onChange={amountIndividualsChanged}
                        className="inputNarrow"
                        type="number"
                        name="amount"
                        id="amount"
                        min="1"
                        defaultValue={amountIndividuals}
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedings">Feedings per day</label>
                    </div>
                    <input
                        onChange={amountFeedingsChanged}
                        className="inputNarrow"
                        type="number"
                        name="feedings"
                        id="feedings"
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

                {Array(amountIndividuals)
                    .fill(0)
                    .map((x, idx) => (
                        <IndividualInfo
                            key={idx}
                            idx={idx}
                            onIndividualChange={onIndividualChange}
                        />
                    ))}

                <button className="topSpaceBig">Create new litter</button>
            </form>
        </section>
    );
}
