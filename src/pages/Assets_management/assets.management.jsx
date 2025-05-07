import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import AssetForm from './pages/assets.form';
import AssetsList from './pages/assets.list';
import { KEY } from '../../constants/keys.constants';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetsList />} />
      <Route path={ROUTES.PRIVATE.ASSETS.CREATE} element={<AssetForm MODE={KEY.VIEW} />} />
      <Route path={ROUTES.PRIVATE.ASSETS.EDIT} element={<AssetForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default AssetManagement;
