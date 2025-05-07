import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import Login from '../pages/Auth/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedLayout from '../layouts/ProtectedLayout';
import AssetManagement from '../pages/Assets_management/assets.management';
import ControlsManagement from '../pages/Controls/controls.main';
import RiskManagement from '../pages/Risks_management/risks.management';
import ProfileManagement from '../pages/Profile/Profile';
import ThreatsHub from '../pages/Threats_Hub/threats.main';
import ComplianceManagement from '../pages/Compliance_management/compliance.main';
import VulnerabilityManagement from '../pages/Vulnerability_management/vulnerability.main';
import IncidentManagement from '../pages/Incident_management/incident.main';

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
            path={ROUTES.PRIVATE.THREATS_HUB.PARENT + '/*'}
            element={<ThreatsHub />}
          />
          <Route
            path={ROUTES.PRIVATE.VULNERABILITY.PARENT + '/*'}
            element={<VulnerabilityManagement />}
          />
          <Route
            path={ROUTES.PRIVATE.CONTROLS.PARENT + '/*'}
            element={<ControlsManagement />}
          />
          <Route
            path={ROUTES.PRIVATE.COMPLIANCE.PARENT + '/*'}
            element={<ComplianceManagement />}
          />
          <Route
            path={ROUTES.PRIVATE.INCIDENT.PARENT + '/*'}
            element={<IncidentManagement />}
          />
          <Route path={ROUTES.PRIVATE.RISK.PARENT + '/*'} element={<RiskManagement />} />
          <Route path={ROUTES.PRIVATE.PROFILE} element={<ProfileManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}
