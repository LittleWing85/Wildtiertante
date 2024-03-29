import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "./loggedinSlice.js";

export default function Register() {
    const [errorOnRegistration, setErrorOnRegistration] = useState(false);
    const dispatch = useDispatch();

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
                dispatch(login());
                setErrorOnRegistration(false);
            });
    }

    return (
        <div>
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
            {errorOnRegistration && (
                <p className="errorMessage">
                    Maybe this email adress is already in use. If not, please
                    try again later.
                </p>
            )}
        </div>
    );
}
