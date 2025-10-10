import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { lazy } from "react";

import Root from "./basics/Root.js";
import LazyLoading from "./LayoutRoute.js";
import Register from "./basics/loginLogoutRegister/Register.js";
import LoginForm from "./basics/loginLogoutRegister/LoginForm.js";
import "./basics/logo/logo.css";

import About from "./basics/about/About.js";
import Information from "./information/Information.js";
import DocumentationTool from "./documentationTool/DocumentationTool.js";
import LitterOverview from "./documentationTool/litterOverview/LitterOverview.js";
const WhosNext = lazy(() => import("./documentationTool/whosNext/WhosNext.js"));
const NewLitter = lazy(() =>
    import("./documentationTool/newLitter/NewLitter.js")
);
import WildAnimalFound from "./wildanimalfound/WildAnimalFound.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<About />} />
            <Route path="information" element={<Information />} />
            <Route path="documentationTool" element={<DocumentationTool />}>
                <Route index element={<LitterOverview />} />
                <Route path="litterOverview" element={<LitterOverview />} />
                <Route element={<LazyLoading />}>
                    <Route path="whosNext" element={<WhosNext />} />
                    <Route path="newLitter" element={<NewLitter />} />
                </Route>

                {/* Use wrapper instead of Layout Route if different fallbacks are needed. 
                See ImprovementsThatMightBeInterestingInTheFuture.doc for more info/*/}
            </Route>
            <Route path="wildAnimalFound" element={<WildAnimalFound />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<LoginForm />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
