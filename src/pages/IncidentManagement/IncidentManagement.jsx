import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import { KEY } from '../../constants/keysConstants';
import IncidentList from './pages/IncidentList';
import IncidentForm from './pages/IncidentForm';

function IncidentManagement() {
  return (
    <Routes>
      <Route index element={<IncidentList />} />
      <Route path={ROUTES.PRIVATE.INCIDENT.CREATE} element={<IncidentForm MODE={KEY.CREATE} />} />
      <Route path={ROUTES.PRIVATE.INCIDENT.EDIT} element={<IncidentForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default IncidentManagement;
