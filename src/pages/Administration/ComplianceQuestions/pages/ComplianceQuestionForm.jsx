import FormBuilder from '../../../../components/Form/FormBuilder';
import { KEY } from '../../../../constants/keysConstants';
import { ROUTES } from '../../../../constants/routesConstants';

const { COMPLIANCE_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ComplianceQuestionForm = ({ MODE = KEY.VIEW }) => {

  return (
    <FormBuilder screen='complaince_question' title={MODE === KEY.EDIT ? 'Edit Compliance Question' : 'Add New Compliance Question'} redirect={COMPLIANCE_QUESTIONS.PARENT} MODE={MODE} />
  );
};

export default ComplianceQuestionForm;
