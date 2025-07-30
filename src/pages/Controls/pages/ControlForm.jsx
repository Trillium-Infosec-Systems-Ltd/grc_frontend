import FormBuilder from "../../../components/Form/FormBuilder";
import { KEY } from "../../../constants/keysConstants";
import { ROUTES } from "../../../constants/routesConstants";

const { PARENT } = ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.CONTROL;

const ControlForm = ({ MODE = KEY.VIEW }) => {
  return (
    <FormBuilder
      screen="control"
      title={MODE === KEY.EDIT ? "Edit Control" : "Add New Control"}
      redirect={PARENT}
      MODE={MODE}
    />
  );
};

export default ControlForm;
