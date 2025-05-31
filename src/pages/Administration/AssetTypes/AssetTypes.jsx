import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import AssetTypeForm from './pages/AssetTypesForm';
import AssetTypesList from './pages/AssetTypesList';
import { KEY } from '../../../constants/keysConstants';

const { ASSET_TYPE } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function AssetTypes() {
  return (
    <Routes>
      <Route index element={<AssetTypesList />} />
      <Route path={ASSET_TYPE.CREATE} element={<AssetTypeForm MODE={KEY.VIEW} />} />
      <Route path={ASSET_TYPE.EDIT} element={<AssetTypeForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default AssetTypes;
