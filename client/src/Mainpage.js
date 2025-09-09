import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import Root from "./basics/Root.js";
import About from "./basics/about/About.js";
import DocumentationTool from "./documentationTool/DocumentationTool.js";
import Information from "./information/Information.js";
import Register from "./basics/loginLogoutRegister/Register.js";
import Login from "./basics/loginLogoutRegister/Login.js";
import "./basics/logo/logo.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/documentationTool" element={<DocumentationTool />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Route>
    )
);

export default function Mainpage() {
    return <RouterProvider router={router} />;
}
