import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { KEY } from '../../../constants/keys.constants';
import DepartmentList from './pages/departmentList';
import DepartmentForm from './pages/departmentForm';

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