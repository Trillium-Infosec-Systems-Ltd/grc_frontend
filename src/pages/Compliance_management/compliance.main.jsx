import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { KEY } from '../../constants/keys.constants';
import ComplianceList from './pages/compliance.list';
import ComplianceForm from './pages/compliance.form';

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
