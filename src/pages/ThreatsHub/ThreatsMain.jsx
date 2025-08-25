import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import { KEY } from '../../constants/keysConstants';
import ThreatsList from './pages/ThreatsList';
import ThreatForm from './pages/ThreatForm';

function ThreatsHub() {
  return (
    <Routes>
      <Route index element={<ThreatsList />} />
      <Route path={ROUTES.PRIVATE.THREATS_HUB.CREATE} element={<ThreatForm MODE={KEY.VIEW} />} />
      <Route path={ROUTES.PRIVATE.THREATS_HUB.EDIT} element={<ThreatForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ThreatsHub;
