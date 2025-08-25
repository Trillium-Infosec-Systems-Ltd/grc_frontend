import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstants';
import { KEY } from '../../../constants/keysConstants';
import ControlQuestionForm from './pages/ControlQuestionForm';
import ContolQuestionsList from './pages/ControlQuestionsList';

const { CONTROL_QUESTIONS } = ROUTES.PRIVATE.ADMINISTRATION.CHILD;

function ControlQuestions() {
  return (
    <Routes>
      <Route index element={<ContolQuestionsList />} />
      <Route path={CONTROL_QUESTIONS.CREATE} element={<ControlQuestionForm MODE={KEY.VIEW} />} />
      <Route path={CONTROL_QUESTIONS.EDIT} element={<ControlQuestionForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ControlQuestions;
