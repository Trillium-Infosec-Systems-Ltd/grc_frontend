import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import { KEY } from '../../constants/keysConstants';
import ControlForm from './pages/ControlForm';
import ControlsList from './pages/ControlsList';

function ControlsManagement() {
  return (
    <Routes>
      <Route index element={<ControlsList />} />
      <Route path={ROUTES.PRIVATE.CONTROLS.CREATE} element={<ControlForm MODE={KEY.CREATE} />} />
      <Route path={ROUTES.PRIVATE.CONTROLS.EDIT} element={<ControlForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ControlsManagement;
