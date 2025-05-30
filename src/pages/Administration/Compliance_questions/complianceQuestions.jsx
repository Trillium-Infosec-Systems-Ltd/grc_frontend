import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { KEY } from '../../../constants/keys.constants';
import ComplianceQuestionForm from './pages/complianceQuestionForm';
import ComplianceQuestionsList from './pages/complianceQuestionsList';

const { COMPLIANCE_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function ComplianceQuestions() {
  return (
    <Routes>
      <Route index element={<ComplianceQuestionsList />} />
      <Route path={COMPLIANCE_QUESTIONS.CREATE} element={<ComplianceQuestionForm MODE={KEY.VIEW} />} />
      <Route path={COMPLIANCE_QUESTIONS.EDIT} element={<ComplianceQuestionForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ComplianceQuestions;
