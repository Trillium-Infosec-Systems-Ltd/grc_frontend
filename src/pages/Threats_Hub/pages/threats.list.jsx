import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const ThreatsList = () => {
  const navigate = useNavigate();

  const action = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          ROUTES.PRIVATE.THREATS_HUB.PARENT + ROUTES.PRIVATE.THREATS_HUB.EDIT,
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
        screen='threats'
        actionsList={action}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Threat',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.THREATS_HUB.PARENT + ROUTES.PRIVATE.THREATS_HUB.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default ThreatsList;
