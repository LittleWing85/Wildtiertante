import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { lazy } from "react";

import Root from "./basics/Root.jsx";
import LazyLoading from "./basics/LayoutRoute.jsx";
import Register from "./basics/loginLogoutRegister/Register.jsx";
import LoginForm from "./basics/loginLogoutRegister/LoginForm.jsx";
import "./basics/logo/logo.css";

import About from "./about/About.jsx";
import Information from "./information/Information.jsx";
import DocumentationTool from "./documentationTool/DocumentationTool.jsx";
import LitterOverview from "./documentationTool/litterOverview/LitterOverview.jsx";
const WhosNext = lazy(() =>
    import("./documentationTool/whosNext/WhosNext.jsx")
);
const NewLitter = lazy(() =>
    import("./documentationTool/newLitter/NewLitter.jsx")
);
import WildAnimalFound from "./wildanimalfound/WildAnimalFound.jsx";

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
