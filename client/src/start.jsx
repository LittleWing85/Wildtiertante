import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./store/store.js";
import "./style.css";

async function prepare() {
    if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./mocks/browser");
        await worker.start();
    }
}

prepare().then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});
