import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const ControlsList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (_, __, index) => (
        <b>{(index + 1).toString().padStart(2, '0')}.</b>
      ),
      width: 80,
    },
    {
      title: 'Control Name',
      dataIndex: 'control_name',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => {
        let color = 'green';
        if (text === 'Non Compliant') color = 'volcano';
        else if (text === 'Partially Compliant') color = 'orange';
        else if (text === 'Not Applicable') color = 'geekblue';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_updated',
    },
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
        columns={columns}
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
