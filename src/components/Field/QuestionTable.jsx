import { Table } from "antd";

const columns = [
  { title: "#", dataIndex: "searial_no", key: "searial_no" },
  {
    title: "Question",
    dataIndex: "question",
    key: "question",
    ellipsis: true,
  },
  { title: "Yes / No", dataIndex: "answer", key: "answer" },
];

const QuestionTable = ({ field, ...rest }) => {
  const { questions = [] } = field;

  return (
    <Table
      columns={columns}
      dataSource={questions}
      scroll={{ x: "max-content" }}
    />
  );
};

export default QuestionTable;
