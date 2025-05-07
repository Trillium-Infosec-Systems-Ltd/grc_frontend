import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const ComplianceForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='complaince' title={MODE === KEY.EDIT ? 'Edit Compliance' : 'Add New Compliance'} redirect={ROUTES.PRIVATE.COMPLIANCE.PARENT} MODE={MODE} />
  );
};

export default ComplianceForm;
