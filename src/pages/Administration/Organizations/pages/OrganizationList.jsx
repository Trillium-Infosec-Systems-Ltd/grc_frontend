import TableBuilder from "../../../../components/Table/TableBuilder";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";
import {
  CodeSandboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { ORGANIZATIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const OrganizationList = () => {
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
            navigate(ORGANIZATIONS.PARENT + ORGANIZATIONS.EDIT, {
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
