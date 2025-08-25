import TableBuilder from "../../../components/Table/TableBuilder";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";

const { PARENT, CREATE, EDIT } =
  ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.CONTROL;

const ControlsList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(PARENT + EDIT, { state: { id: record?.id ?? null } })
          }
          className="view-details-button"
        >
          View Details
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <TableBuilder
        title="All Active Controls"
        screen="control"
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Control",
            className: "add-btn",
            onClick: () => navigate(PARENT + CREATE),
          },
        ]}
      />
    </div>
  );
};

export default ControlsList;
