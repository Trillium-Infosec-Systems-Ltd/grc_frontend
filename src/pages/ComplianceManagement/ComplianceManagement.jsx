import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import { KEY } from '../../constants/keysConstants';
import ComplianceList from './pages/ComplianceList';
import ComplianceForm from './pages/ComplianceForm';

function ComplianceManagement() {
  return (
    <Routes>
      <Route index element={<ComplianceList />} />
      <Route path={ROUTES.PRIVATE.COMPLIANCE.CREATE} element={<ComplianceForm MODE={KEY.CREATE} />} />
      <Route path={ROUTES.PRIVATE.COMPLIANCE.EDIT} element={<ComplianceForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ComplianceManagement;
