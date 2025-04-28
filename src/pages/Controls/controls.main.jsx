import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { KEY } from '../../constants/keys.constants';
import ControlForm from './pages/controls.form';
import ControlsList from './pages/controls.list';

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
