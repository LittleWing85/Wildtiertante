import { useState, useEffect } from "react";

export default function IndividualInfo({ animal, idx, onIndividualChange }) {
    const [fields, setFields] = useState({});

    function handleChange(event) {
        setFields({ ...fields, idx, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        onIndividualChange(fields);
    }, [fields]);

    return (
        <div>
            <h1 className="animal">Animal {idx + 1}</h1>
            <div className="flexHorizontallyInputs">
                <div className="labelFixedWidth">
                    <label htmlFor="name">Name / optical identifier / ID</label>
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
            <div className="flexHorizontallyInputs">
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
            <div className="flexHorizontallyInputs">
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
            <div className="flexHorizontallyInputs">
                <div className="labelFixedWidth">
                    <label htmlFor="sex">Sex</label>
                </div>
                <input
                    className="inputMiddle"
                    type="text"
                    name="sex"
                    id="sex"
                    value={animal.sex}
                    onChange={handleChange}
                />
            </div>
            {/*             <div className="flexHorizontallyInputs">
                <div className="labelFixedWidth">
                    <label htmlFor="medication">Medication</label>
                </div>
                <input
                    className="inputWide"
                    type="text"
                    name="medication"
                    id="medication"
                />
            </div>
            <div className="flexHorizontallyInputs">
                <div className="labelFixedWidth">
                    <label htmlFor="doses">Doses per Day</label>
                </div>
                <input
                    className="inputNarrow"
                    type="number"
                    name="doses"
                    id="doses"
                />
            </div>
            <div className="flexHorizontallyInputs">
                <div className="labelFixedWidth">
                    <label htmlFor="medicationTimes">
                        Times for Medication
                    </label>
                </div>
                <input
                    className="inputTime"
                    type="time"
                    name="medicationTime"
                    id="medicationTimes"
                />
                <input
                    className="inputTime"
                    type="time"
                    name="medicationTime"
                />
                <input
                    className="inputTime"
                    type="time"
                    name="medicationTime"
                />
            </div> */}
        </div>
    );
}
