import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routesConstants';
import AssetForm from './pages/AssetsForm';
import AssetsList from './pages/AssetsList';
import { KEY } from '../../constants/keysConstants';

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
