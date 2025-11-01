//This component renders the form for registration

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../loggedinSlice.jsx";

export default function RegistrationForm() {
    const [errorOnRegistration, setErrorOnRegistration] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                navigate("/feedingTool");
            });
    }

    return (
        <div>
            <form
                className="flexVertically"
                onSubmit={onSubmitRegistrationData}
            >
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name of your shelter"
                />
                <label htmlFor="email">Emailadresse</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                />
                <label htmlFor="password">Passwort</label>
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
