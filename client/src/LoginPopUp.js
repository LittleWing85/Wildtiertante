export default function LoginPopUp({ onLogin, onLoginClose }) {
    function onSubmitLogin(event) {
        event.preventDefault();
        onLogin(event);
    }

    return (
        <div className="loginPopUpContainer">
            <div className="loginPopUp">
                <button className="closingButtonLogin" onClick={onLoginClose}>
                    X
                </button>
                <form onSubmit={onSubmitLogin}>
                    <label className="labeling" htmlFor="email">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                    />
                    <label className="labeling" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}
