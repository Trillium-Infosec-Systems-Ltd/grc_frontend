import TableBuilder from "../../../components/Table/TableBuilder";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";

const { ASSETS } = ROUTES.PRIVATE;

const AssetsList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Details",
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() =>
            navigate(ASSETS.PARENT + ASSETS.EDIT, {
              state: { id: record?.id ?? null },
            })
          }
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div>
      <TableBuilder
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: "+ Add New Asset",
            className: "add-btn",
            onClick: () => navigate(ASSETS.PARENT + ASSETS.CREATE),
            links: [
              {
                label: <span>New Asset</span>,
                key: "1",
                onClick: () => navigate(ASSETS.PARENT + ASSETS.CREATE),
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AssetsList;
