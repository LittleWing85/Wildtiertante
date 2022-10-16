export default function RegisterPopUp({ onRegisterClose }) {
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
        });
        onRegisterClose();
    }

    return (
        <div className="popUpContainer">
            <div className="registerPopUp">
                <button className="closingButton" onClick={onRegisterClose}>
                    X
                </button>
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
