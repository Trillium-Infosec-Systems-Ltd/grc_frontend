import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { KEY } from '../../../constants/keys.constants';
import ControlQuestionForm from './pages/controlQuestionForm';
import ContolQuestionsList from './pages/controlQuestionsList';

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
