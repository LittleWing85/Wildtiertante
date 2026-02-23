// Provides routes for App.jsx

import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";
import { lazy } from "react";

import Root from "./Root.jsx";

import LayoutRoute from "../routes/LayoutRoute.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";

import Auth from "../features/auth/Auth.jsx";
import RegistrationForm from "../features/auth/formsAuth/RegistrationForm.jsx";
import LoginForm from "../features/auth/formsAuth/LoginForm.jsx";

import About from "../features/about/About.jsx";
import Information from "../features/information/Information.jsx";
import FeedingTool from "../features/feedingTool/FeedingTool.jsx";
import WhosNext from "../features/feedingTool/whosNext/WhosNext.jsx";
const LitterOverview = lazy(
    () => import("../features/feedingTool/litterOverview/LitterOverview.jsx"),
);
const NewLitter = lazy(
    () => import("../features/feedingTool/newLitter/NewLitter.jsx"),
);
import WildAnimalFound from "../features/wildanimalfound/WildAnimalFound.jsx";
import NotFound from "../features/notFound/NotFound.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="auth" element={<Auth />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="registration" element={<RegistrationForm />} />
            </Route>
            <Route index element={<About />} />
            <Route path="information" element={<Information />} />
            <Route
                path="feedingTool"
                element={
                    <ProtectedRoute>
                        <FeedingTool />
                    </ProtectedRoute>
                }
            >
                <Route index element={<WhosNext />} />
                <Route path="whosNext" element={<WhosNext />} />
                <Route element={<LayoutRoute />}>
                    <Route path="litterOverview" element={<LitterOverview />} />
                    <Route path="newLitter" element={<NewLitter />} />
                </Route>
            </Route>
            <Route path="wildAnimalFound" element={<WildAnimalFound />} />
            <Route path="*" element={<NotFound />} />
        </Route>,
    ),
);
