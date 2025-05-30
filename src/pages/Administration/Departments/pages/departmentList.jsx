import TableBuilder from '../../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.constants';

const { DEPARTMENTS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const DepartmentList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          DEPARTMENTS.PARENT + DEPARTMENTS.EDIT,
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
        title='List of Departments'
        screen='department'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Department',
            className: 'add-btn',
            onClick: () =>
              navigate(
                DEPARTMENTS.PARENT + DEPARTMENTS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default DepartmentList;
