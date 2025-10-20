/*This component is part of the form for adding a new litter to the user's account.
The user can add information about an individual animal which is part of the added litter.*/

import { useState, useEffect } from "react";

export default function IndividualInfo({ animal, idx, onIndividualChange }) {
    const [fields, setFields] = useState(animal);
    function handleChange(event) {
        setFields({ ...fields, idx, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        onIndividualChange(fields);
    }, [fields]);

    return (
        <div>
            <h1 className="animal topSpaceBig">
                Information about animal {idx + 1}
            </h1>
            <div className="flexLabelAndInput">
                <div className="labelFixedWidth">
                    <label htmlFor="name">Name / ID</label>
                </div>
                <input
                    required
                    className="inputWide"
                    type="text"
                    name="name"
                    id="name"
                    value={animal.name}
                    onChange={handleChange}
                />
            </div>
            <div className="flexLabelAndInput">
                <div className="labelFixedWidth">
                    <label htmlFor="age">Age in days</label>
                </div>
                <input
                    className="inputNarrow"
                    type="number"
                    name="age"
                    id="age"
                    value={animal.age}
                    min="0"
                    onChange={handleChange}
                />
            </div>
            <div className="flexLabelAndInput">
                <div className="labelFixedWidth">
                    <label htmlFor="weight">Weight in grams</label>
                </div>
                <input
                    className="inputNarrow"
                    type="number"
                    name="weight"
                    id="weight"
                    min="1"
                    value={animal.weight}
                    onChange={handleChange}
                />
            </div>
            <div className="flexLabelAndInput">
                <div className="labelFixedWidth">
                    <label htmlFor="sex">Sex</label>
                </div>
                <select className="inputMiddle" name="sex" id="sex">
                    <option value="not sure yet">not sure yet</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    value={animal.sex}
                </select>
            </div>
        </div>
    );
}
