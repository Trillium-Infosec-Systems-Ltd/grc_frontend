import FormBuilder from '../../../components/Form/FormBuilder';
import { KEY } from '../../../constants/keysConstants';
import { ROUTES } from '../../../constants/routesConstants';


const IncidentForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='incident' title={MODE === KEY.EDIT ? 'Edit Incident' : 'Add New Incident'} redirect={ROUTES.PRIVATE.INCIDENT.PARENT} MODE={MODE} />
  );
};

export default IncidentForm;
