import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const AssetsList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          ROUTES.PRIVATE.ASSETS.PARENT + ROUTES.PRIVATE.ASSETS.EDIT,
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
        actionsList={actions}
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
            label: '+ Add New Asset',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ROUTES.PRIVATE.ASSETS.PARENT + ROUTES.PRIVATE.ASSETS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default AssetsList;
