import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routesConstants';
import Login from '../pages/Auth/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedLayout from '../layouts/ProtectedLayout';
import AssetManagement from '../pages/AssetsManagement/AssetsManagement';
import ThreatsHub from '../pages/ThreatsHub/ThreatsMain';
import VulnerabilityManagement from '../pages/VulnerabilityManagement/VulnerabilityManagement';
import ControlsManagement from '../pages/Controls/ControlsMain';
import ComplianceManagement from '../pages/ComplianceManagement/ComplianceManagement';
import IncidentManagement from '../pages/IncidentManagement/IncidentManagement';
import RiskManagement from '../pages/RisksManagement/RisksManagement';
import ProfileManagement from '../pages/Profile/Profile';
import AssetTypes from '../pages/Administration/AssetTypes/AssetTypes';
import Departments from '../pages/Administration/Departments/departments';
import ControlQuestions from '../pages/Administration/ControlQuestions/ControlQuestions';
import ComplianceQuestions from '../pages/Administration/ComplianceQuestions/ComplianceQuestions';
import Organizations from '../pages/Administration/Organizations/Organizations';
import UserManagement from '../pages/UserManagement/UserManagement';

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
            path={ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.CONTROL.PARENT + '/*'}
            element={<ControlsManagement />}
          />
          <Route
            path={ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.ASSESSMENT.PARENT + '/*'}
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
          <Route path={ROUTES.PRIVATE.USERS.PARENT + '/*'} element={<UserManagement />} />
          <Route path={ROUTES.PRIVATE.PROFILE} element={<ProfileManagement />} />
          <Route
            path={ROUTES.PRIVATE.ADMINISTRATION.CHILD.ASSET_TYPE.PARENT + '/*'}
            element={<AssetTypes />}
          />
          <Route
            path={ROUTES.PRIVATE.ADMINISTRATION.CHILD.DEPARTMENTS.PARENT + '/*'}
            element={<Departments />}
          />
          <Route
            path={ROUTES.PRIVATE.ADMINISTRATION.CHILD.CONTROL_QUESTIONS.PARENT + '/*'}
            element={<ControlQuestions />}
          />
          <Route
            path={ROUTES.PRIVATE.ADMINISTRATION.CHILD.COMPLIANCE_QUESTIONS.PARENT + '/*'}
            element={<ComplianceQuestions />}
          />
          <Route
            path={ROUTES.PRIVATE.ADMINISTRATION.CHILD.ORGANIZATIONS.PARENT + '/*'}
            element={<Organizations />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
