import FormBuilder from '../../../../components/Form/Form.Builder';
import { KEY } from '../../../../constants/keys.constants';
import { ROUTES } from '../../../../constants/routes.constants';

const { COMPLIANCE_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ComplianceQuestionForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='complaince_question' title={MODE === KEY.EDIT ? 'Edit Compliance Question' : 'Add New Compliance Question'} redirect={COMPLIANCE_QUESTIONS.PARENT} MODE={MODE} />
  );
};

export default ComplianceQuestionForm;
