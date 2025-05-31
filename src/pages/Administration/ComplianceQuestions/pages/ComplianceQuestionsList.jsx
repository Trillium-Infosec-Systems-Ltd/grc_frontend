import TableBuilder from '../../../../components/Table/TableBuilder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routesConstants';

const { COMPLIANCE_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

const ComplianceQuestionsList = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Details',
      render: (_, record) => (
        <Button shape="round" onClick={() => navigate(
          COMPLIANCE_QUESTIONS.PARENT + COMPLIANCE_QUESTIONS.EDIT,
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
      title='List of Compliance Questions'
      screen='complaince_question'
        actionsList={actions}
        headerLinks={[
          {
            Component: null,
            label: '+ Add New Question',
            className: 'add-btn',
            onClick: () =>
              navigate(
                COMPLIANCE_QUESTIONS.PARENT + COMPLIANCE_QUESTIONS.CREATE
              ),
          },
        ]}
      />
    </div>
  );
};

export default ComplianceQuestionsList;
