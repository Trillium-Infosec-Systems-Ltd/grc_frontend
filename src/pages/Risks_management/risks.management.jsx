import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import RiskList from './pages/risks.list';
import RiskForm from './pages/risk.form';
import { KEY } from '../../constants/keys.constants';

function RiskManagement() {
  return (
    <Routes>
      <Route index element={<RiskList />} />
      <Route path={ROUTES.PRIVATE.RISK.CREATE} element={<RiskForm MODE={KEY.CREATE} />} />
      <Route path={ROUTES.PRIVATE.RISK.EDIT} element={<RiskForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default RiskManagement;
