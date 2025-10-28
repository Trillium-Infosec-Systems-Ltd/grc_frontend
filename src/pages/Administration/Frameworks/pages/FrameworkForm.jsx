import FormBuilder from "../../../../components/Form/FormBuilder";
import { KEY } from "../../../../constants/keysConstants";
import { ROUTES } from "../../../../constants/routesConstants";

const { FRAMEWORKS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const FrameworkForm = ({ MODE = KEY.VIEW }) => {
  return (
    <FormBuilder
      screen="framework"
      title={MODE === KEY.EDIT ? "Edit Framework" : "Add New Framework"}
      redirect={FRAMEWORKS.PARENT}
      MODE={MODE}
    />
  );
};

export default FrameworkForm;
