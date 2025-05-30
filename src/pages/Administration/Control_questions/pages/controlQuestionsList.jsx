import TableBuilder from '../../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.constants';

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ContolQuestionsList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          CONTROL_QUESTIONS.PARENT + CONTROL_QUESTIONS.EDIT,
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
      title='List of Control Questions'
      screen='control_question'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Question',
            className: 'add-btn',
            onClick: () =>
              navigate(
                CONTROL_QUESTIONS.PARENT + CONTROL_QUESTIONS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default ContolQuestionsList;
