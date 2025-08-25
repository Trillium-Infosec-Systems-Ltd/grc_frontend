import TableBuilder from "../../../components/Table/TableBuilder";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";
import { FilterFilled } from "@ant-design/icons";

const UserList = () => {
  const navigate = useNavigate();

  const action = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(ROUTES.PRIVATE.USERS.PARENT + ROUTES.PRIVATE.USERS.EDIT, {
              state: { id: record?.id ?? null },
            })
          }
          className="view-details-button"
        >
          Manage
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <TableBuilder
        title="All Users"
        screen="users"
        actionsList={action}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New User",
            className: "add-btn",
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.USERS.PARENT + ROUTES.PRIVATE.USERS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default UserList;
