import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/routesConstants";
import { KEY } from "../../constants/keysConstants";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

function UserManagement() {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route
        path={ROUTES.PRIVATE.USERS.CREATE}
        element={<UserForm MODE={KEY.CREATE} />}
      />
      <Route
        path={ROUTES.PRIVATE.USERS.EDIT}
        element={<UserForm MODE={KEY.EDIT} />}
      />
    </Routes>
  );
}

export default UserManagement;
