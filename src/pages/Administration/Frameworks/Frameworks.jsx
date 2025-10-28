import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import { KEY } from '../../../constants/keysConstants';
import FrameworkList from './pages/FrameworkList';
import FrameworkForm from './pages/FrameworkForm';

const { FRAMEWORKS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function Frameworks() {
  return (
    <Routes>
      <Route index element={<FrameworkList />} />
      <Route path={FRAMEWORKS.CREATE} element={<FrameworkForm MODE={KEY.VIEW} />} />
      <Route path={FRAMEWORKS.EDIT} element={<FrameworkForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default Frameworks;