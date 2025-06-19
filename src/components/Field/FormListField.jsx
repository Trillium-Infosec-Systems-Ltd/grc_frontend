import { Button, Form, Popconfirm, Table, Input, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getValidators } from "../Form/validator";

export const SERIAL_NO_COLUMN = {
  title: "Sr. No.",
  key: "sr_no",
  fixed: "left",
  width: "Sr. No.".length * 9,
  align: "left",
  render: (_, record, index) => <p style={{ maxWidth: "20px" }}>{index + 1}</p>,
};

const FormListField = ({ fieldname }) => {
  return (
    <div className="childTableContainer">
      <Form.List name={fieldname}>
        {(fields, { add, remove }) => {
          const totalQuestions = fields.length;

          const columns = [
            SERIAL_NO_COLUMN,
            {
              title: "Question",
              dataIndex: "question",
              width: "75%",
              render: (_, record, rowIndex) => (
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
              dataIndex: "weightage",
              width: "15%",
              render: (_, record, rowIndex) => {
                let weightage = 2;
                if (totalQuestions > 1) {
                  if (rowIndex === 0) {
                    weightage = 1;
                  } else {
                    weightage = (1 / (totalQuestions - 1)).toFixed(2);
                  }
                }
                return (
                  <Form.Item
                    name={[record.name, "weightage"]}
                    style={{ margin: 0 }}
                  >
                    <InputNumber
                      readOnly
                      value={weightage}
                      style={{ width: "100%" }}
                    />
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
              // scroll={{ x: "80vw", y: "max-content" }}
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
