import TableBuilder from "../../../../components/Table/TableBuilder";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";

const { ORGANIZATIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const OrganizationList = () => {
  const navigate = useNavigate();

  const action = [
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
        title="List of Organizations"
        screen="organization"
        actionsList={action}
        isDeletAble={true}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Organization",
            className: "add-btn",
            onClick: () =>
              navigate(ORGANIZATIONS.PARENT + ORGANIZATIONS.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default OrganizationList;
