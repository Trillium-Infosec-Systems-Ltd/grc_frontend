import FormBuilder from '../../../../components/Form/Form.Builder';
import { KEY } from '../../../../constants/keys.constants';
import { ROUTES } from '../../../../constants/routes.constants';

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const DepartmentForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='department' title={MODE === KEY.EDIT ? 'Edit Department' : 'Add New Department'} redirect={DEPARTMENTS.PARENT} MODE={MODE} />
  );
};

export default DepartmentForm;
