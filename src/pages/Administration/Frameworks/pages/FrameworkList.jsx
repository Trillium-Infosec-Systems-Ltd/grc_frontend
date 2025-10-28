import TableBuilder from '../../../../components/Table/TableBuilder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routesConstants';

const { FRAMEWORKS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const FrameworkList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          FRAMEWORKS.PARENT + FRAMEWORKS.EDIT,
          {
            state: { id: record?.id ?? null },
          }
        )}>
          Manage
        </Button>
      ),
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
