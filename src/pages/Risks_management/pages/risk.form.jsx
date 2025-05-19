import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const RiskForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='risks' title={MODE === KEY.EDIT ? 'Edit Risk' : 'Add New Risk'} redirect={ROUTES.PRIVATE.RISK.PARENT} MODE={MODE} />
  );
};

export default RiskForm;
