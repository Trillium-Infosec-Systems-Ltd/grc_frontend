import TableBuilder from "../../../components/Table/TableBuilder";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";
import { ROLE } from "../../../constants/keysConstants";
import { useSelector } from "react-redux";

const RiskList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const { role = null } = user;

   const action = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(
              ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.EDIT,
              { state: { id: record?.id ?? null } }
            )
          }
          className="view-details-button"
        >
          Manage
        </Button>
      ),
      align: "center",
    },
  ];

  // const action = [
  //   {
  //     title: "More Actions",
  //     align: "center",
  //     type: "popover",
  //     actions: [
  //       {
  //         label: (
  //           <Row gutter={8} className="action-items">
  //             <CodeSandboxOutlined /> Manage
  //           </Row>
  //         ),
  //         onClick: (record) =>
  //           navigate(ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.EDIT, {
  //             state: { id: record?.id ?? null },
  //           }),
  //       },
  //       {
  //         label: (
  //           <Row gutter={8} className="action-items">
  //             <DeleteOutlined /> Delete
  //           </Row>
  //         ),
  //         type: "delete",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      <TableBuilder
        title="Risk Register"
        screen="risks"
        actionsList={action}
        isDeletAble={role === ROLE.SUPER_ADMIN}
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
