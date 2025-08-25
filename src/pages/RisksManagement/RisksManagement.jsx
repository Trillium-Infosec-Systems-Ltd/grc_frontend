import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import RiskList from './pages/RisksList';
import RiskForm from './pages/RiskForm';
import { KEY } from '../../constants/keysConstants';

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
