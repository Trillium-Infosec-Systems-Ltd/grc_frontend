import TableBuilder from "../../../components/Table/TableBuilder";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";

const { PARENT, EDIT } =
  ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.ASSESSMENT;

const ControlAssessmentList = () => {
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
        title="List of Control Assessments"
        screen="control_assessment"
        actionsList={actions}
        // headerLinks={[
        //   {
        //     Component: null,
        //     label: "+ Add New Control",
        //     className: "add-btn",
        //     onClick: () => navigate(PARENT + CREATE),
        //   },
        // ]}
      />
    </div>
  );
};

export default ControlAssessmentList;
