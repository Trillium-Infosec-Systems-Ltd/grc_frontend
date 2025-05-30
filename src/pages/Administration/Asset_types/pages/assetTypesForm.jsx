import FormBuilder from '../../../../components/Form/Form.Builder';
import { KEY } from '../../../../constants/keys.constants';
import { ROUTES } from '../../../../constants/routes.constants';

const { ASSET_TYPE } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const AssetTypeForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='asset_type' title={MODE === KEY.EDIT ? 'Edit Asset Type' : 'Add New Asset Type'} redirect={ASSET_TYPE.PARENT} MODE={MODE} />
  );
};

export default AssetTypeForm;
