import { Checkbox, Table, Form, Input, Typography, Progress } from "antd";
import { SERIAL_NO_COLUMN } from "./FormListField";
import { useEffect, useState } from "react";

const { Text } = Typography;

const QuestionTable = ({ fieldname, form }) => {
  let formData = JSON.parse(JSON.stringify(form.getFieldsValue()));

  const [percentage, setPercentage] = useState(86);

  console.log({ formData });

  useEffect(() => {
    if (formData) {
      let status = formData?.compliance_status || "Status";
      let currentPercentage =
        formData?.control_assessment
          ?.filter((quest) => quest?.answer)
          .reduce((a, b) => a?.weight + b?.weight, 0) || 0;

      currentPercentage = (currentPercentage / 2) * 100;
      status =
        currentPercentage <= 65
          ? "Non Compliant"
          : currentPercentage > 85
          ? `Compliance`
          : "Partially Compliant";

      form.setFieldValue("compliance_status", status);
      setPercentage(currentPercentage);
    }
  }, [formData]);

  return (
    <div className="childTableContainer">
      <Progress
        percent={percentage}
        percentPosition={{ align: "center", type: "inner" }}
        strokeWidth={30}
        strokeColor={
          percentage === 0
            ? "Status"
            : percentage <= 65
            ? "#fe5c73"
            : percentage > 85
            ? `#4fd1c5`
            : "#ffbb38"
        }
        format={(percent) =>
          percent === 0
            ? "Status"
            : percent <= 65
            ? "Non Compliant"
            : percent > 85
            ? `Compliance`
            : "Partially Compliant"
        }
        // format={percent => `${percent}%`}
        showInfo={true}
      />
      <Form.List name={fieldname}>
        {(fields, { add, remove }) => {
          console.log({ fields });

          const columns = [
            SERIAL_NO_COLUMN,
            {
              title: "Question",
              dataIndex: "question",
              width: "75%",
              render: (_, record) => (
                <Form.Item
                  name={[record.name, "question"]}
                  style={{ margin: 0 }}
                >
                  <Input disabled />
                </Form.Item>
              ),
            },
            {
              title: "Yes / No",
              dataIndex: "answer",
              width: "15%",
              align: "center",
              render: (_, record) => (
                <Form.Item
                  name={[record.name, "answer"]}
                  valuePropName="checked"
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox />
                </Form.Item>
              ),
            },
          ];

          return (
            <Table
              columns={columns}
              dataSource={fields.map((field) => ({
                ...field,
                key: field.name,
              }))}
              pagination={false}
              rowKey="question"
              bordered
              size="middle"
              style={{ width: "100%" }}
            />
          );
        }}
      </Form.List>
    </div>
  );
};

export default QuestionTable;
