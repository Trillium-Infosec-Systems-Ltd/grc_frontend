import TableBuilder from "../../../../components/Table/TableBuilder";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";
import { CodeSandboxOutlined, DeleteOutlined } from "@ant-design/icons";

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const DepartmentList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "More Actions",
      align: "center",
      type: "popover",
      actions: [
        {
          label: (
            <Row gutter={8} className="action-items">
              <CodeSandboxOutlined /> Manage
            </Row>
          ),
          onClick: (record) =>
            navigate(DEPARTMENTS.PARENT + DEPARTMENTS.EDIT, {
              state: { id: record?.id ?? null },
            }),
        },
        {
          label: (
            <Row gutter={8} className="action-items">
              <DeleteOutlined /> Delete
            </Row>
          ),
          type: "delete",
        },
      ],
    },
  ];

  return (
    <div>
      <TableBuilder
        title="List of Departments"
        screen="department"
        actionsList={actions}
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
