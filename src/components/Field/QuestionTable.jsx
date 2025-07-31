import { Checkbox, Table, Form, Input } from "antd";
import { SERIAL_NO_COLUMN } from "./FormListField";
import { useEffect, useState } from "react";
import { isNotNullOrEmpty, isNullOrEmpty } from "../../utils/utils";

const QuestionTable = ({ fieldname, form }) => {
  let formData = JSON.parse(JSON.stringify(form.getFieldsValue()));

  // const [percentage, setPercentage] = useState(86);

  useEffect(() => {
    if (isNotNullOrEmpty(formData)) {
      let status = formData?.compliance_status || "Non Compliant";
      let controlRating = formData?.rating || "Low";
      let currentPercentage = formData?.control_ratting_percentage || 0;
      let sQuestions = formData?.control_assessment?.filter(
        (quest) => quest?.answer
      );

      if (isNullOrEmpty(sQuestions?.length)) {
        status = "Non Compliant";
        controlRating = "Low";
      } else {
        currentPercentage =
          sQuestions?.reduce((a, b) => {
            return (a += b?.weight);
          }, 0) || 0;
        currentPercentage = (currentPercentage / 2) * 100;

        if (sQuestions?.length < formData?.control_assessment?.length) {
          status = "Partially Compliant";
        } else {
          status = "Compliant";
        }
        controlRating =
          currentPercentage > 85
            ? "High"
            : currentPercentage > 65
            ? "Medium"
            : "Low";
      }

      form.setFieldValue("compliance_status", status);
      form.setFieldValue("rating", controlRating);
      form.setFieldValue("control_ratting_percentage", currentPercentage);
      // form.setFieldValue("control_assessment", formData?.control_assessment);
    }
  }, [formData]);

  return (
    <div className="childTableContainer">
      <Form.List name={fieldname}>
        {(fields) => {
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
