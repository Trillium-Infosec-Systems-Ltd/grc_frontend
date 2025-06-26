import { Button, Form, Popconfirm, Table, Input, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getValidators } from "../Form/validator";
import { useEffect } from "react";

export const SERIAL_NO_COLUMN = {
  title: "Sr. No.",
  key: "sr_no",
  fixed: "left",
  width: "Sr. No.".length * 9,
  align: "center",
  render: (_, record, index) => (
    <p style={{ maxWidth: "100%", display: "flex", justifyContent: "center" }}>
      {index + 1}
    </p>
  ),
};

const FormListField = ({ fieldname, form }) => {
  let formRecord = JSON.parse(JSON.stringify(form.getFieldsValue()));

  useEffect(() => {
    console.log(form.getFieldsValue());
    let formData = JSON.parse(JSON.stringify(form.getFieldsValue()));

    if (formData) {
      let totalQuestions = formData?.question || [];

      if (totalQuestions?.length > 1) {
        totalQuestions = totalQuestions?.map((quest, index) => ({
          ...quest,
          wheightage:
            index === 0
              ? 1
              : Number((1 / (totalQuestions?.length - 1)).toFixed(2)),
        }));
      } else if (totalQuestions?.length === 1) {
        totalQuestions[0].wheightage = 2;
      }
      form.setFieldValue("question", totalQuestions);
    }
  }, [formRecord?.question?.length]);

  return (
    <div className="childTableContainer">
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
                  rules={getValidators({ required: true, label: "Question" })}
                >
                  <Input />
                </Form.Item>
              ),
            },
            {
              title: "Weightage",
              dataIndex: "wheightage",
              width: "15%",
              render: (_, record) => {
                return (
                  <Form.Item
                    name={[record.name, "wheightage"]}
                    style={{ margin: 0 }}
                  >
                    <InputNumber readOnly style={{ width: "100%" }} />
                  </Form.Item>
                );
              },
            },
            {
              title: (
                <Button
                  type="text"
                  onClick={() => {
                    add({ question: "", wheightage: 0 });
                  }}
                  icon={<PlusOutlined />}
                />
              ),
              key: "actions",
              fixed: "right",
              width: "5%",
              render: (_, record) => (
                // <Popconfirm
                //   title="Delete"
                //   description="Are you sure to delete this record?"
                //   onConfirm={() => remove(record.name)}
                //   okText="Delete"
                //   okType="danger"
                //   cancelText="Cancel"
                // >
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => remove(record.name)}
                />
                // </Popconfirm>
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
              rowKey="name"
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

export default FormListField;
