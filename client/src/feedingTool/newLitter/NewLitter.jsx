//This component enables the user to add a new litter to his account.

export default function NewLitter() {
    return <p>You will be able to add new litter here later</p>;
}

/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndividualInfo from "./IndividualInfo.js";
import FeedingTimes from "./FeedingTimes.js";

export default function NewLitter() {
    const now = new Date().toISOString().slice(0, 10);
    const history = useNavigate();
    const [date, setDate] = useState(now);
    const [amountFeedings, setAmountFeedings] = useState(3);
    const [feedingTimes, setfeedingTimes] = useState([]);
    const [animals, setAnimals] = useState([
        {
            name: "animal1",
            age: 1,
            weight: 100,
            sex: "not sure yet",
        },
    ]);

    useEffect(() => {
        fetch("/api/user_id")
            .then((response) => response.json())
            .then((data) => {
                if (!data) {
                    history.push("/");
                    alert("Please log in first to use this functionality.");
                }
            });
    }, []);

    function onDateChange(event) {
        setDate(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        const litterData = {
            species: event.target.species.value,
            arrival: event.target.arrival.value,
            feedingslots: feedingTimes.map((time) => time.time),
            notes: event.target.notes.value,
        };
        const animalsWithDefaults = animals.map((x, index) => ({
            name: `Animal ${index + 1}`,
            age: 1,
            ...x,
        }));
        fetch("/api/newLitter", {
            method: "POST",
            body: JSON.stringify({ litterData, animals: animalsWithDefaults }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            setAnimals([
                {
                    name: `animal1`,
                    age: 1,
                    weight: 100,
                    sex: "not sure yet",
                },
            ]);
            setAmountFeedings(3);
            event.target.species.value = "";
            event.target.notes.value = "";
            alert("New litter was created successfully!");
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
        ]);
    }

    function removeLastAnimal() {
        setAnimals((oldState) => oldState.slice(0, -1));
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
            <form className="formMainContainer" onSubmit={onSubmit}>
                <h1>Information about all animals of the litter</h1>

                <div className="flexLabelAndInput">
                    <div className="labelFixedWidth">
                        <label htmlFor="species">Species</label>
                    </div>
                    <input
                        required
                        className="inputWide"
                        type="text"
                        name="species"
                        id="species"
                    />
                </div>

                <div className="flexLabelAndInput">
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

                <div className="flexLabelAndInput">
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
                        value={amountFeedings}
                    />
                </div>

                <div className="flexLabelAndInputSmallMargin">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedingTime">Feeding times</label>
                    </div>
                    <div className="flexTimes inputWide">
                        {Array(amountFeedings)
                            .fill(0)
                            .map((x, idx) => (
                                <FeedingTimes
                                    // feedingTimes={feedingTimes} 
                                    key={idx}
                                    idx={idx}
                                    onFeedingsChange={onFeedingsChange}
                                />
                            ))}
                    </div>
                </div>

                <div className="flexLabelAndInput">
                    <div className="labelFixedWidth">
                        <label htmlFor="notes">Notes</label>
                    </div>
                    <textarea
                        className="inputWide"
                        type="text"
                        name="notes"
                        id="notes"
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
                <div className="flexLabelAndInput">
                    <button type="button" onClick={addAnimal}>
                        Add animal
                    </button>
                    <button type="button" onClick={removeLastAnimal}>
                        Delete animal
                    </button>
                </div>
                <button className="topSpaceBig">Create this litter</button>
            </form>
        </section>
    );
}
*/
