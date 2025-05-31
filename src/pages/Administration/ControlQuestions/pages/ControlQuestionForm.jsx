import FormBuilder from '../../../../components/Form/FormBuilder';
import { KEY } from '../../../../constants/keysConstants';
import { ROUTES } from '../../../../constants/routesConstants';

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ControlQuestionForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='control_question' title={MODE === KEY.EDIT ? 'Edit Control Question' : 'Add New Control Question'} redirect={CONTROL_QUESTIONS.PARENT} MODE={MODE} />
  );
};

export default ControlQuestionForm;
