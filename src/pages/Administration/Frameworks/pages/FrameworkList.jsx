import TableBuilder from "../../../../components/Table/TableBuilder";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";

const { FRAMEWORKS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const FrameworkList = () => {
  const navigate = useNavigate();

  const action = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(FRAMEWORKS.PARENT + FRAMEWORKS.EDIT, {
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
        title="List of Frameworks"
        screen="framework"
        actionsList={action}
        isDeletAble={true}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Framework",
            className: "add-btn",
            onClick: () => navigate(FRAMEWORKS.PARENT + FRAMEWORKS.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default FrameworkList;
