import FormBuilder from "../../../components/Form/FormBuilder";
import { KEY } from "../../../constants/keysConstants";
import { ROUTES } from "../../../constants/routesConstants";

const UserForm = ({ MODE = KEY.VIEW }) => {
  return (
    <FormBuilder
      screen="users"
      title={MODE === KEY.EDIT ? "Edit User" : "Add New User"}
      redirect={ROUTES.PRIVATE.USERS.PARENT}
      MODE={MODE}
    />
  );
};

export default UserForm;
