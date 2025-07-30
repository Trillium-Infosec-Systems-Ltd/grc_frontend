import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/routesConstants";
import { KEY } from "../../constants/keysConstants";
import ControlAssessmentForm from "./pages/ControlAssessmentForm";
import ControlAssessmentList from "./pages/ControlAssessmentList";

const { EDIT } = ROUTES.PRIVATE.CONTROL_MANAGEMENT.CHILD.ASSESSMENT;

function ControlAssessment() {
  return (
    <Routes>
      <Route index element={<ControlAssessmentList />} />
      <Route path={EDIT} element={<ControlAssessmentForm MODE={KEY.EDIT} />} />
    </Routes>
  );
}

export default ControlAssessment;
