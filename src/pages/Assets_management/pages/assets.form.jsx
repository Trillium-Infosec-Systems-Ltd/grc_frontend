import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const AssetForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder title={MODE === KEY.EDIT ? 'Edit Asset' : 'Add New Asset'} redirect={ROUTES.PRIVATE.ASSETS.PARENT} MODE={MODE} />
  );
};

export default AssetForm;
