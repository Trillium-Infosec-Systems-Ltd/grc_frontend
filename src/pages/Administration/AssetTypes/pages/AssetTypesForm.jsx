import FormBuilder from '../../../../components/Form/FormBuilder';
import { KEY } from '../../../../constants/keysConstants';
import { ROUTES } from '../../../../constants/routesConstants';

const { ASSET_TYPE } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const AssetTypeForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='asset_type' title={MODE === KEY.EDIT ? 'Edit Asset Type' : 'Add New Asset Type'} redirect={ASSET_TYPE.PARENT} MODE={MODE} />
  );
};

export default AssetTypeForm;
