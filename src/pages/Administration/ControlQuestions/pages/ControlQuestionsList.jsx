import TableBuilder from "../../../../components/Table/TableBuilder";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";
import { CodeSandboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row } from "antd";

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ContolQuestionsList = () => {
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
            navigate(CONTROL_QUESTIONS.PARENT + CONTROL_QUESTIONS.EDIT, {
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
        title="List of Control Questions"
        screen="control_question"
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Question",
            className: "add-btn",
            onClick: () =>
              navigate(CONTROL_QUESTIONS.PARENT + CONTROL_QUESTIONS.CREATE),
          },
        ]}
      />
    </div>
  );
};

export default ContolQuestionsList;
