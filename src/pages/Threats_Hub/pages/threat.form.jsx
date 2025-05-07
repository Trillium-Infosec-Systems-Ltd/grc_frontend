import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const ThreatForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='threat' title={MODE === KEY.EDIT ? 'Edit Threat' : 'Add New Threat'} redirect={ROUTES.PRIVATE.THREATS_HUB.PARENT} MODE={MODE} />
  );
};

export default ThreatForm;
