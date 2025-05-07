import TableBuilder from '../../../components/Table/Table.Builder';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const RiskList = () => {
  const navigate = useNavigate();

  const action = [

    {
      title: 'Details',
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() => navigate(
            ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.EDIT,
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
        title='Risk Register'
        screen='risks'
        actionsList={action}
        headerLinks={[
          {
            Component: (
              <span className="filter-btn">
                <FilterFilled /> Filter
              </span>
            ),
            label: '',
            onClick: () => console.log('...clicked'),
            className: '',
          },
          {
            Component: null,
            label: '+ Add New Risk',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default RiskList;
