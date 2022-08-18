import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onFormSubmit(event) {
        event.preventDefault();
        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: data.error,
                    });
                    return;
                }
                window.location.href = "/";
            });
    }
    render() {
        return (
            <section className="form registration-form">
                <h2>Login</h2>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                {this.state.error && (
                    <p className="error">{this.state.error}</p>
                )}
            </section>
        );
    }
}

export default Login;
