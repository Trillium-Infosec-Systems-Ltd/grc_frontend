import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import Home from "../pages/Home/home";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.ROOT} element={<Home />} />
            </Routes>
        </Router>
    );
}
