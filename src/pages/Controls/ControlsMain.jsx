import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import { KEY } from '../../constants/keysConstants';
import ControlForm from './pages/ControlForm';
import ControlsList from './pages/ControlsList';

const { EDIT, CREATE } = ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.CONTROL; 

function ControlsManagement() {
  return (
    <Routes>
      <Route index element={<ControlsList />} />
      <Route path={CREATE} element={<ControlForm MODE={KEY.CREATE} />} />
      <Route path={EDIT} element={<ControlForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ControlsManagement;
