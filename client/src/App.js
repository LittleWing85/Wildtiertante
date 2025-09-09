import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Suspense,
    lazy,
} from "react-router-dom";

import Root from "./basics/Root.js";
import Register from "./basics/loginLogoutRegister/Register.js";
import Login from "./basics/loginLogoutRegister/Login.js";
import "./basics/logo/logo.css";

import About from "./basics/about/About.js";
import Information from "./information/Information.js";
import DocumentationTool from "./documentationTool/DocumentationTool.js";
import LitterOverview from "./documentationTool/litterOverview/LitterOverview.js";
const WhosNext = lazy(() => import("./documentationTool/whosNext/WhosNext.js"));
const NewLitter = lazy(() =>
    import("./documentationTool/newLitter/NewLitter.js")
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<About />} />
            <Route path="information" element={<Information />} />
            <Route path="documentationTool" element={<DocumentationTool />}>
                <Route index element={<LitterOverview />} />
                <Route path="litterOverview" element={<LitterOverview />} />
                <Route
                    path="whosNext"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <WhosNext />
                        </Suspense>
                    }
                />
                <Route
                    path="newLitter"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewLitter />
                        </Suspense>
                    }
                />
                {/* add wrapper if number of Routes with lazy loading will be more than three. 
                See ImprovementsThatMightBeInterestingInTheFuture.doc for more info/*/}
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
