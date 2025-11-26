//This component renders the form for registration

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../loggedinSlice.js";

export default function RegistrationForm() {
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onSubmitRegistrationData(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const registrationData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch("/api/registration", {
                method: "POST",
                body: JSON.stringify(registrationData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.error) {
                throw {
                    type: "application",
                    text:
                        data.errorMessage ||
                        "Diese E-Mail-Adresse wird bereits verwendet.",
                };
            }

            if (!response.ok) {
                throw {
                    type: "server",
                    code: response.status,
                    text: `Serverfehler:${response.status}${response.statusText}`,
                };
            }

            dispatch(login());
            navigate("/feedingTool");
        } catch (error) {
            console.error("Error during registration:", error);
            if (!error.type) {
                setErrorMessage({
                    type: "network",
                    text: "Ein Netzwerkfehler ist aufgetreten. Bitte überprüfe deine Verbindung zum Internet.",
                });
            } else {
                setErrorMessage(error);
            }
        }
    }

    return (
        <div className="topSpaceBig">
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
                <label htmlFor="email" className="topSpaceSmall">
                    Emailadresse
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                />
                <label htmlFor="password" className="topSpaceSmall">
                    Passwort
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                />

                <button className="topSpace">Submit Data</button>
            </form>
            {errorMessage && <p className="errorBanner">{errorMessage.text}</p>}
        </div>
    );
}
