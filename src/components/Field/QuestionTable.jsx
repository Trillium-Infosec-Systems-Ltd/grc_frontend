import { Checkbox, Table, Form, Input, InputNumber } from "antd";
import { SERIAL_NO_COLUMN } from "./FormListField";

const QuestionTable = ({ fieldname, form }) => {
  return (
    <div className="childTableContainer">
      <Form.List name={fieldname}>
        {(fields, { add, remove }) => {
          const columns = [
            SERIAL_NO_COLUMN,
            {
              title: "Question",
              dataIndex: "question",
              width: "75%",
            },
            {
              title: "Yes / No",
              dataIndex: "answer",
              width: "15%",
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
