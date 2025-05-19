import TableBuilder from '../../../components/Table/Table.Builder';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const IncidentList = () => {
  const navigate = useNavigate();

  const action = [

    {
      title: 'Details',
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() => navigate(
            ROUTES.PRIVATE.INCIDENT.PARENT + ROUTES.PRIVATE.INCIDENT.EDIT,
            { state: { id: record?.id ?? null } }
          )}
          className="view-details-button"
        >
          Manage
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <div>
      <TableBuilder
        title='List of Incident'
        screen='incident'
        actionsList={action}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Incident',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.INCIDENT.PARENT + ROUTES.PRIVATE.INCIDENT.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default IncidentList;
