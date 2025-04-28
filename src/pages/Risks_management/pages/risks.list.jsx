import TableBuilder from '../../../components/Table/Table.Builder';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { FilterFilled } from '@ant-design/icons';

const RiskList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (_, __, index) => (
        <b>{(index + 1).toString().padStart(2, '0')}.</b>
      ),
      width: 60,
    },
    {
      title: 'Risk Title',
      dataIndex: 'risk_title',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => <i>{text}</i>,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Likelihood',
      dataIndex: 'likelihood',
      render: (text) => {
        let color = 'cyan';
        if (text === 'High') color = 'volcano';
        else if (text === 'Medium') color = 'orange';
        else if (text === 'Low') color = 'cyan';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Decision Rationale',
      dataIndex: 'decision_rationale',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Residual',
      dataIndex: 'residual',
      render: (text) => {
        let color = 'cyan';
        if (text === 'High') color = 'volcano';
        else if (text === 'Medium') color = 'orange';
        else if (text === 'Low') color = 'cyan';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Date Reviewed',
      dataIndex: 'date_reviewed',
    },
  ];


  return (
    <div>
      <TableBuilder
        title='Risk Register'
        screen='risks'
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
