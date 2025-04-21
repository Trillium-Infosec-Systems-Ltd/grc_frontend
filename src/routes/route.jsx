import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import Login from "../pages/Auth/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedLayout from "../layouts/ProtectedLayout";
import RiskManagement from "../pages/Risk_Management/risk.management";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.ROOT} element={<Login />} />

                <Route element={<ProtectedLayout />}>
                    <Route path={ROUTES.PRIVATE.ROOT} element={<Dashboard />} />
                    <Route path={ROUTES.PRIVATE.RISK} element={<RiskManagement />} />
                </Route>
            </Routes>
        </Router>
    );
}
