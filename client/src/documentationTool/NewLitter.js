export default function NewLitter() {
    return (
        <section>
            <form className="litterForm">
                <p className="headingInForm">Information about litter</p>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="species">Species</label>
                    </div>
                    <input
                        className="inputWide"
                        type="text"
                        name="species"
                        id="species"
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
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="amount">Amount of animals</label>
                    </div>
                    <input
                        className="inputNarrow"
                        type="number"
                        name="amount"
                        id="amount"
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedings">Feedings per day</label>
                    </div>
                    <input
                        className="inputNarrow"
                        type="number"
                        name="feedings"
                        id="feedings"
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="feedingTime">Feeding times</label>
                    </div>
                    <input
                        className="inputTime"
                        type="time"
                        name="feedingTime"
                        id="feedingTime"
                    />
                    <input
                        className="inputTime"
                        type="time"
                        name="feedingTime"
                    />
                    <input
                        className="inputTime"
                        type="time"
                        name="feedingTime"
                    />
                    <input
                        className="inputTime"
                        type="time"
                        name="feedingTime"
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="notes">Notes</label>
                    </div>
                    <textarea className="inputWide" id="notes"></textarea>
                </div>

                <p className="headingInForm">Animal 1</p>
                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="name">
                            Name / optical identifier / ID
                        </label>
                    </div>
                    <input
                        className="inputWide"
                        type="text"
                        name="species"
                        id="species"
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
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="age">Weight in grams</label>
                    </div>
                    <input
                        className="inputNarrow"
                        type="number"
                        name="age"
                        id="age"
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
                    />
                </div>

                <div className="flexHorizontallyInputs">
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
                </div>

                <p className="headingInForm">Animal 2</p>
                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="name">
                            Name / optical identifier / ID
                        </label>
                    </div>
                    <input
                        className="inputWide"
                        type="text"
                        name="species"
                        id="species"
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
                    />
                </div>

                <div className="flexHorizontallyInputs">
                    <div className="labelFixedWidth">
                        <label htmlFor="age">Weight in grams</label>
                    </div>
                    <input
                        className="inputNarrow"
                        type="number"
                        name="age"
                        id="age"
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
                    />
                </div>

                <div className="flexHorizontallyInputs">
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
                </div>

                <button className="topSpaceBig">Add</button>
            </form>
        </section>
    );
}
