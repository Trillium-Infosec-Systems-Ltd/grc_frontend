import FormBuilder from "../../../components/Form/FormBuilder";
import { KEY } from "../../../constants/keysConstants";
import { ROUTES } from "../../../constants/routesConstants";

const { PARENT } = ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.ASSESSMENT;

const ControlAssessmentForm = ({ MODE = KEY.VIEW }) => {
  return (
    <FormBuilder
      screen="control_assessment"
      title="Control Assessment"
      redirect={PARENT}
      MODE={MODE}
    />
  );
};

export default ControlAssessmentForm;
