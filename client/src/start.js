import ReactDOM from "react-dom";
import Welcome from "./Welcome";

fetch("/api/users/me")
    .then((response) => response.json())
    .then((user) => {
        if (!user) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<HelloWorld />, document.querySelector("main"));
        }
    });

function HelloWorld() {
    return <div>Hello, World!</div>;
}
