import TableBuilder from '../../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.constants';

const { ASSET_TYPE } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const AssetTypesList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          ASSET_TYPE.PARENT + ASSET_TYPE.EDIT,
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
      title='List of Asset Types'
      screen='asset_type'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Asset Type',
            className: 'add-btn',
            onClick: () =>
              navigate(
                ASSET_TYPE.PARENT + ASSET_TYPE.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default AssetTypesList;
