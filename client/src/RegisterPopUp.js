import { useState } from "react";

export default function RegisterPopUp({ onRegisterClose, toggleLoggedIn }) {
    const [errorOnRegistration, setErrorOnRegistration] = useState(false);

    function onSubmitRegistrationData(event) {
        event.preventDefault();
        const registrationData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        fetch("/api/registration", {
            method: "POST",
            body: JSON.stringify(registrationData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setErrorOnRegistration(true);
                    return;
                }
                setErrorOnRegistration(false);
                toggleLoggedIn();
                onRegisterClose();
            });
    }

    return (
        <div className="popUpContainer">
            <div className="registerPopUp">
                <button className="closingButton" onClick={onRegisterClose}>
                    X
                </button>
                {errorOnRegistration && (
                    <p className="errorMessage">
                        Maybe this email adress is already in use. If not,
                        please try again later.
                    </p>
                )}
                <form
                    className="flexVertically"
                    onSubmit={onSubmitRegistrationData}
                >
                    <label htmlFor="name">Name of your shelter</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Name of your shelter"
                    />
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <button>Submit Data</button>
                </form>
            </div>
        </div>
    );
}
