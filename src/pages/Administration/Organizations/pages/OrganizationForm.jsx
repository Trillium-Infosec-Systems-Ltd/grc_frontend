import FormBuilder from "../../../../components/Form/FormBuilder";
import { KEY } from "../../../../constants/keysConstants";
import { ROUTES } from "../../../../constants/routesConstants";

const { ORGANIZATIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const OrganizationForm = ({ MODE = KEY.VIEW }) => {
  return (
    <FormBuilder
      screen="organization"
      title={MODE === KEY.EDIT ? "Edit Organization" : "Add New Organization"}
      redirect={ORGANIZATIONS.PARENT}
      MODE={MODE}
    />
  );
};

export default OrganizationForm;
