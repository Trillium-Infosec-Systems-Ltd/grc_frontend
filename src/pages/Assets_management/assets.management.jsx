import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import AssetForm from './pages/assets.form';
import AssetsList from './pages/assets.list';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetsList />} />
      <Route path={ROUTES.PRIVATE.ASSETS.CREATE} element={<AssetForm />} />
      <Route path={ROUTES.PRIVATE.ASSETS.EDIT} element={<AssetForm />} />
    </Routes>
  );
}

export default AssetManagement;
