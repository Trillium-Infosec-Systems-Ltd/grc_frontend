import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import Login from "../pages/Auth/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthLayout from "../layouts/AuthLayout";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.ROOT} element={<Login />} />

                <Route element={<AuthLayout />}>
                    <Route path={ROUTES.PRIVATE.ROOT} element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}
