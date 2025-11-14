import TableBuilder from '../../../../components/Table/TableBuilder';
import { Button, Row, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routesConstants';
import {
  CodeSandboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { FRAMEWORKS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const FrameworkList = () => {
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
            navigate(FRAMEWORKS.PARENT + FRAMEWORKS.EDIT, {
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
        title='List of Frameworks'
        screen='framework'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Framework',
            className: 'add-btn',
            onClick: () =>
              navigate(
                FRAMEWORKS.PARENT + FRAMEWORKS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default FrameworkList;
