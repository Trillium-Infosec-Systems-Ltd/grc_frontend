import TableBuilder from "../../../components/Table/TableBuilder";
import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";
import {
  CodeSandboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const RiskList = () => {
  const navigate = useNavigate();

  const action = [
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
            navigate(ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.EDIT, {
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
        title="Risk Register"
        screen="risks"
        actionsList={action}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Risk",
            className: "add-btn",
            onClick: () =>
              navigate(ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default RiskList;
