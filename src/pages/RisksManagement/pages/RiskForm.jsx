import FormBuilder from '../../../components/Form/FormBuilder';
import { KEY } from '../../../constants/keysConstants';
import { ROUTES } from '../../../constants/routesConstants';


const RiskForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='risks' title={MODE === KEY.EDIT ? 'Edit Risk' : 'Add New Risk'} redirect={ROUTES.PRIVATE.RISK.PARENT} MODE={MODE} />
  );
};

export default RiskForm;
