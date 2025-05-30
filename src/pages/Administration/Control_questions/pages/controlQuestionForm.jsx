import FormBuilder from '../../../../components/Form/Form.Builder';
import { KEY } from '../../../../constants/keys.constants';
import { ROUTES } from '../../../../constants/routes.constants';

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ControlQuestionForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='control_question' title={MODE === KEY.EDIT ? 'Edit Control Question' : 'Add New Control Question'} redirect={CONTROL_QUESTIONS.PARENT} MODE={MODE} />
  );
};

export default ControlQuestionForm;
