import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { KEY } from '../../constants/keys.constants';
import ThreatsList from './pages/threats.list';
import ThreatForm from './pages/threat.form';

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
