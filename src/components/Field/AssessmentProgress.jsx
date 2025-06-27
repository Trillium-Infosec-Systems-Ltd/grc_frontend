import { Progress } from "antd";

const progressData = {
  "Non Compliant": { percent: 25, strokeColor: "#fe5c73" },
  "Partially Compliant": { percent: 75, strokeColor: "#ffbb38" },
  Compliant: { percent: 100, strokeColor: "#4fd1c5" },
};

const AssessmentProgress = ({ form, field, ...rest }) => {
  const { value = "" } = rest;

  let data = progressData[value] || {};

  return (
    <Progress
      percent={data?.percent}
      percentPosition={{ align: "center", type: "inner" }}
      size={["100%", 30]}
      //   strokeWidth={30}
      strokeColor={data?.strokeColor}
      format={(percent) => value}
      showInfo={true}
    />
  );
};

export default AssessmentProgress;
