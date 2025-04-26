import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import RiskList from './pages/risks.list';
import RiskForm from './pages/risk.form';

function RiskManagement() {
  return (
    <Routes>
      <Route index element={<RiskList />} />
      <Route path={ROUTES.PRIVATE.RISK.CREATE} element={<RiskForm />} />
      <Route path={ROUTES.PRIVATE.RISK.EDIT} element={<RiskForm />} />
    </Routes>
  );
}

export default RiskManagement;
