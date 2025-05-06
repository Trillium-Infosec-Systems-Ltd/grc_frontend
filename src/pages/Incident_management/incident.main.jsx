import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { KEY } from '../../constants/keys.constants';
import IncidentList from './pages/incident.list';
import IncidentForm from './pages/incident.form';

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
