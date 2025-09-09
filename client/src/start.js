import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App.js";
import { store } from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("main")
);
