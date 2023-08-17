import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Mainpage from "./Mainpage";
import { store } from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <Mainpage />
    </Provider>,
    document.querySelector("main")
);
