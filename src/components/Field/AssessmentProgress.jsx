import { Progress } from "antd";
import { useEffect, useState } from "react";

const AssessmentProgress = ({ form, field, ...rest }) => {
  let formData = JSON.parse(JSON.stringify(form.getFieldsValue()));
  const { value = "" } = rest;

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (formData) {
      let currentPercentage =
        formData?.control_assessment
          ?.filter((quest) => quest?.answer)
          ?.reduce((a, b) => {
            return (a += b?.weight);
          }, 0) || 0;

      currentPercentage = (currentPercentage / 2) * 100;
      setPercentage(currentPercentage);
    }
  }, [value, formData?.control_assessment]);

  return (
    <Progress
      percent={percentage}
      percentPosition={{ align: "center", type: "inner" }}
      strokeWidth={30}
      strokeColor={
        percentage > 85
          ? `#4fd1c5`
          : percentage > 65
          ? "#ffbb38"
          : percentage === 0
          ? "transparent"
          : "#fe5c73"
        // : "#ffbb38"
      }
      format={(percent) => value}
      showInfo={true}
      style={{ color: "white" }}
    />
  );
};

export default AssessmentProgress;
