import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import { KEY } from '../../../constants/keysConstants';
import OrganizationList from './pages/OrganizationList';
import OrganizationForm from './pages/OrganizationForm';

const { ORGANIZATIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function Organizations() {
  return (
    <Routes>
      <Route index element={<OrganizationList />} />
      <Route path={ORGANIZATIONS.CREATE} element={<OrganizationForm MODE={KEY.VIEW} />} />
      <Route path={ORGANIZATIONS.EDIT} element={<OrganizationForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default Organizations;