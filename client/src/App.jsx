import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";
import { lazy } from "react";

import Root from "./Root.jsx";
import LazyLoading from "./LayoutRoute.jsx";

import SignIn from "./signInLogout/SignInLogout.jsx";
import RegistrationForm from "./signInLogout/formsSignIn/RegistrationForm.jsx";
import LoginForm from "./signInLogout/formsSignIn/LoginForm.jsx";

import About from "./about/About.jsx";
import Information from "./information/Information.jsx";
import FeedingTool from "./feedingTool/FeedingTool.jsx";
import WhosNext from "./feedingTool/whosNext/WhosNext.jsx";
const LitterOverview = lazy(() =>
    import("./feedingTool/litterOverview/LitterOverview.jsx")
);
const NewLitter = lazy(() => import("./feedingTool/newLitter/NewLitter.jsx"));
import WildAnimalFound from "./wildanimalfound/WildAnimalFound.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="signIn" element={<SignIn />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="registration" element={<RegistrationForm />} />
            </Route>
            <Route index element={<About />} />
            <Route path="information" element={<Information />} />
            <Route path="feedingTool" element={<FeedingTool />}>
                <Route index element={<WhosNext />} />
                <Route path="whosNext" element={<WhosNext />} />
                <Route element={<LazyLoading />}>
                    <Route path="litterOverview" element={<LitterOverview />} />
                    <Route path="newLitter" element={<NewLitter />} />
                </Route>
                {/* Use wrapper instead of Layout Route if different fallbacks are needed. 
                See ImprovementsThatMightBeInterestingInTheFuture.doc for more info/*/}
            </Route>
            <Route path="wildAnimalFound" element={<WildAnimalFound />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
