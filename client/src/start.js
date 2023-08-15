import ReactDOM from "react-dom";
import Mainpage from "./Mainpage";
import { Provider } from "react-redux";

import { store } from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <Mainpage />
    </Provider>,
    document.querySelector("main")
);
