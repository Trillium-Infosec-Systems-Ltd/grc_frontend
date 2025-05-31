import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import { KEY } from '../../../constants/keysConstants';
import DepartmentList from './pages/DepartmentList';
import DepartmentForm from './pages/DepartmentForm';

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function Departments() {
  return (
    <Routes>
      <Route index element={<DepartmentList />} />
      <Route path={DEPARTMENTS.CREATE} element={<DepartmentForm MODE={KEY.VIEW} />} />
      <Route path={DEPARTMENTS.EDIT} element={<DepartmentForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default Departments;