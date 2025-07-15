import TableBuilder from "../../../../components/Table/TableBuilder";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";

const { ORGANIZATIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const OrganizationList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(ORGANIZATIONS.PARENT + ORGANIZATIONS.EDIT, {
              state: { id: record?.id ?? null },
            })
          }
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div>
      <TableBuilder
        title="List of Organizations"
        screen="organization"
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Organization",
            className: "add-btn",
            onClick: () => navigate(ORGANIZATIONS.PARENT + ORGANIZATIONS.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default OrganizationList;
