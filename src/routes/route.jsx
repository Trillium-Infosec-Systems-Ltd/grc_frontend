import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import Login from "../pages/Auth/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.ROOT} element={<Login />} />

                <Route element={<ProtectedLayout />}>
                    <Route path={ROUTES.PRIVATE.ROOT} element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}
