import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import AssetTypeForm from './pages/assetTypesForm';
import AssetTypesList from './pages/assetTypesList';
import { KEY } from '../../../constants/keys.constants';

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
