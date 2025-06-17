import { Checkbox, Table } from "antd";

const QuestionTable = ({ value = [], onChange }) => {
  const handleCheck = (id, checked) => {
    const updated = value.map((item) =>
      item.id === id ? { ...item, answer: checked ? "yes" : "no" } : item
    );
    onChange(updated);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, idx) => String(idx + 1).padStart(2, "0"),
      width: 60,
    },
    {
      title: "Control Questions",
      dataIndex: "question",
      width: "80%",
    },
    {
      title: "Yes / No",
      dataIndex: "answer",
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.answer === "yes"}
          onChange={(e) => handleCheck(record.id, e.target.checked)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={value}
      scroll={{ x: "max-content" }}
    />
  );
};

export default QuestionTable;
