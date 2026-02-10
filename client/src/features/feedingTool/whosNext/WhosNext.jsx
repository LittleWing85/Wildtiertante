/*This component displays a list of the litters that the user has currently in his care.
It is sorted in the order in which the animals must be fed.
If a user clicks on a litter, a form is display where he can enter date of the feedings. */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function WhosNext() {
    const [currentLitters, setCurrentLitters] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/litterOverview")
            .then((response) => response.json())
            .then((data) => {
                setCurrentLitters(data);
            });
    }, [navigate]);

    if (!currentLitters) {
        return <p>Lade Daten...</p>;
    }

    return (
        <div>
            {currentLitters.length === 0 ? (
                <p>
                    Momentan ist niemand eingetragen, der Milch oder Medikamente
                    bekommt. <Link to="/feedingTool/newLitter">Hier</Link>{" "}
                    kannst du neue Tierbabys hinzufügen. Möchtest du
                    Informationen zu Tierbabys, die du schon eingetragen hast,
                    bearbeiten, dann klicke{" "}
                    <Link to="/feedingTool/litterOverview">hier</Link>.
                </p>
            ) : (
                <p>Test-Text</p>
            )}
        </div>
    );
}

/*import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./feedingTool.css";

function formatTime1(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime + " ";
}

function formatTime2(time) {
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return formattedTime;
}

export default function WhosNext() {
    const [unfedLitters, setUnfedLitters] = useState([]);
    const [feedAgainLitters, setfeedAgainLitters] = useState([]);
    const [noCurrentLitters, setNoCurrentLitters] = useState(true);
    const history = useNavigate();

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
                setUnfedLitters([]);
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
            id_associated_litter: event.target.name,
            feedingSlot: event.target.feedingSlot.value, //only difference between onSubmitFed and onSubmitUnfed
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
            id_associated_litter: event.target.name,
            feedingSlot: event.target.currentFeeding.value, //only difference between onSubmitFed and onSubmitUnfed
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
        <div>
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
                                    {unfedLitter.feedingslots.map(
                                        (feedingTime) => (
                                            <span key={feedingTime}>
                                                {formatTime1(feedingTime)}
                                            </span>
                                        )
                                    )}
                                </p>

                                // ToDo for later: Allow user only to choose time from the array with feeding slots
                                //<select
                                //    className="inputMiddle inputMilk"
                                //    name="feedingSlot"
                                //    id="feedingSlot"
                                //>
                                //    <option value="08:00">8:00</option>
                                //    <option value="16:00">16:00</option>
                                //    <option value="00:00">00:00</option>
                                //</select>
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
                            At {formatTime2(currentLitter.nextFeedingTime)}:
                            Litter number {currentLitter.litter_id} (
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
                                value={currentLitter.nextFeedingTime}
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
        </div>
    );
}*/
