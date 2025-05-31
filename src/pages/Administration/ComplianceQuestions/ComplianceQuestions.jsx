import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import { KEY } from '../../../constants/keysConstants';
import ComplianceQuestionForm from './pages/ComplianceQuestionForm';
import ComplianceQuestionsList from './pages/ComplianceQuestionsList';

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
