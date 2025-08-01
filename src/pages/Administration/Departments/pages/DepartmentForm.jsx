import FormBuilder from '../../../../components/Form/FormBuilder';
import { KEY } from '../../../../constants/keysConstants';
import { ROUTES } from '../../../../constants/routesConstants';

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const DepartmentForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='department' title={MODE === KEY.EDIT ? 'Edit Department' : 'Add New Department'} redirect={DEPARTMENTS.PARENT} MODE={MODE} />
  );
};

export default DepartmentForm;
