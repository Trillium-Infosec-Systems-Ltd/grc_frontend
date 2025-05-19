import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const ControlsList = () => {
  const navigate = useNavigate();

  const actions = [

    {
      title: 'Details',
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() => navigate(
            ROUTES.PRIVATE.CONTROLS.PARENT + ROUTES.PRIVATE.CONTROLS.EDIT,
            { state: { id: record?.id ?? null } }
          )}
          className="view-details-button"
        >
          View Details
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <div>
      <TableBuilder
        title='All Active Controls'
        screen='control'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Control',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.CONTROLS.PARENT + ROUTES.PRIVATE.CONTROLS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default ControlsList;
