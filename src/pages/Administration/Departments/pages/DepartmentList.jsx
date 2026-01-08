import TableBuilder from "../../../../components/Table/TableBuilder";
import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const DepartmentList = () => {
  const navigate = useNavigate();

  const action = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(DEPARTMENTS.PARENT + DEPARTMENTS.EDIT, {
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
        title="List of Departments"
        screen="department"
        actionsList={action}
        isDeletAble={true}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Department",
            className: "add-btn",
            onClick: () => navigate(DEPARTMENTS.PARENT + DEPARTMENTS.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default DepartmentList;
