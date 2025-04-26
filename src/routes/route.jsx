import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import Login from '../pages/Auth/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedLayout from '../layouts/ProtectedLayout';
import AssetManagement from '../pages/Assets_management/assets.management';
import ControlsManagement from '../pages/Controls/controls.main';
import RiskManagement from '../pages/Risks_management/risks.management';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.PUBLIC.ROOT} element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route path={ROUTES.PRIVATE.ROOT} element={<Dashboard />} />
          <Route
            path={ROUTES.PRIVATE.ASSETS.PARENT + '/*'}
            element={<AssetManagement />}
          />
          <Route
            path={ROUTES.PRIVATE.CONTROLS}
            element={<ControlsManagement />}
          />
          <Route path={ROUTES.PRIVATE.RISK.PARENT + '/*'} element={<RiskManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}
