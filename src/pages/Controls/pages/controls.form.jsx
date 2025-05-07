import FormBuilder from '../../../components/Form/Form.Builder';
import { KEY } from '../../../constants/keys.constants';
import { ROUTES } from '../../../constants/routes.constants';


const ControlForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='control' title={MODE === KEY.EDIT ? 'Edit Control' : 'Add New Control'} redirect={ROUTES.PRIVATE.CONTROLS.PARENT} MODE={MODE} />
  );
};

export default ControlForm;
