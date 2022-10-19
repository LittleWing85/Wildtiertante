import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

function formatTime(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime + " ";
}

export default function WhosNext() {
    const [unfedLitters, setUnfedLitters] = useState([]);
    const [feedAgainLitters, setfeedAgainLitters] = useState([]);
    const [noCurrentLitters, setNoCurrentLitters] = useState(true);
    const history = useHistory();

    useEffect(() => {
        updateData();
    }, []);

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

    function updateData() {
        fetch("/api/unfedLitters")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setNoCurrentLitters(false);
                    setUnfedLitters(data);
                    return;
                }
            });
        fetch("/api/nextFeedings")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setNoCurrentLitters(false);
                    setfeedAgainLitters(data);
                    return;
                }
            });
    }

    function onSubmitUnfed(event) {
        event.preventDefault();
        const feedingData = {
            amountMilk: event.target.amountMilk.value,
            feedingSlot: event.target.feedingSlot.value,
            id_associated_litter: event.target.name,
        };

        fetch("/api/feedingDataFirstTime", {
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
            id_associated_litter: event.target.name,
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
            {noCurrentLitters && (
                <p className="topSpace">
                    You have no litters currently. Click{" "}
                    <NavLink to="/newLitter">here</NavLink> to add new litters.
                </p>
            )}
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

                                <input
                                    className="inputMiddle inputMilk"
                                    name="feedingSlot"
                                    id="feedingSlot"
                                    type="time"
                                ></input>
                                <p>
                                    Possible feeding slots:{" "}
                                    {unfedLitter.feedings.map((feedingTime) => (
                                        <span key={feedingTime}>
                                            {formatTime(feedingTime)}
                                        </span>
                                    ))}
                                </p>

                                {/* ToDo for later: Allow user only to choose time from the array with feeding slots */}
                                {/*                                 <select
                                    className="inputMiddle inputMilk"
                                    name="feedingSlot"
                                    id="feedingSlot"
                                >
                                    <option value="08:00">8:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="00:00">00:00</option>
                                </select> */}
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
                {feedAgainLitters.map((currentLitter) => (
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
