import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import Root from "./basics/Root.js";
import Register from "./basics/loginLogoutRegister/Register.js";
import Login from "./basics/loginLogoutRegister/Login.js";
import "./basics/logo/logo.css";

import About from "./basics/about/About.js";
import Information from "./information/Information.js";
import DocumentationTool from "./documentationTool/DocumentationTool.js";
import LitterOverview from "./documentationTool/litterOverview/LitterOverview.js";
import WhosNext from "./documentationTool/whosNext/WhosNext.js";
import NewLitter from "./documentationTool/newLitter/NewLitter.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<About />} />
            <Route path="information" element={<Information />} />
            <Route path="documentationTool" element={<DocumentationTool />}>
                <Route index element={<LitterOverview />} />
                <Route path="litterOverview" element={<LitterOverview />} />
                <Route path="whosNext" element={<WhosNext />} />
                <Route path="newLitter" element={<NewLitter />} />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
