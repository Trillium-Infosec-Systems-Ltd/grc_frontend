import TableBuilder from "../../../../components/Table/TableBuilder";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";
import { Button, Row } from "antd";

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ContolQuestionsList = () => {
  const navigate = useNavigate();

  const action = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(CONTROL_QUESTIONS.PARENT + CONTROL_QUESTIONS.EDIT, {
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
        title="List of Control Questions"
        screen="control_question"
        actionsList={action}
        isDeletAble={true}
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
