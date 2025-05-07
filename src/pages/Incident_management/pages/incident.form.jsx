import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const IncidentForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='incident' title={MODE === KEY.EDIT ? 'Edit Incident' : 'Add New Incident'} redirect={ROUTES.PRIVATE.INCIDENT.PARENT} MODE={MODE} />
  );
};

export default IncidentForm;
