import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import Login from "../pages/Auth/Login/Login";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.ROOT} element={<Login />} />
            </Routes>
        </Router>
    );
}
