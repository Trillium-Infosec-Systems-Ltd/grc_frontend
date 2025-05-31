import FormBuilder from '../../../components/Form/FormBuilder';
import { KEY } from '../../../constants/keysConstants';
import { ROUTES } from '../../../constants/routesConstants';


const AssetForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder title={MODE === KEY.EDIT ? 'Edit Asset' : 'Add New Asset'} redirect={ROUTES.PRIVATE.ASSETS.PARENT} MODE={MODE} />
  );
};

export default AssetForm;
