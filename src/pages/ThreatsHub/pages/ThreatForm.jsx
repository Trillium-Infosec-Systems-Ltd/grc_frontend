import FormBuilder from '../../../components/Form/FormBuilder';
import { KEY } from '../../../constants/keysConstants';
import { ROUTES } from '../../../constants/routesConstants';


const ThreatForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='threat' title={MODE === KEY.EDIT ? 'Edit Threat' : 'Add New Threat'} redirect={ROUTES.PRIVATE.THREATS_HUB.PARENT} MODE={MODE} />
  );
};

export default ThreatForm;
