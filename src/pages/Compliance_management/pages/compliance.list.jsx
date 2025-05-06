import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const ComplianceList = () => {
  const navigate = useNavigate();

  const action = [

    {
      title: 'Details',
      render: (_, record) => (
        <Button
          shape="round"
          onClick={() => navigate(
            ROUTES.PRIVATE.CONTROLS.PARENT + ROUTES.PRIVATE.COMPLIACE.EDIT,
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
        title='All Compliance'
        screen='complaince'
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
            label: '+ Add New Compliance',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.COMPLIANCE.PARENT + ROUTES.PRIVATE.COMPLIANCE.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default ComplianceList;
