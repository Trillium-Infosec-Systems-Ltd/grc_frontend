import FormBuilder from '../../../components/Form/FormBuilder';
import { KEY } from '../../../constants/keysConstants';
import { ROUTES } from '../../../constants/routesConstants';


const ComplianceForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='complaince' title={MODE === KEY.EDIT ? 'Edit Compliance' : 'Add New Compliance'} redirect={ROUTES.PRIVATE.COMPLIANCE.PARENT} MODE={MODE} />
  );
};

export default ComplianceForm;
