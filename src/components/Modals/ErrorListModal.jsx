import { Modal, Typography, List } from "antd";

const { Text, Title } = Typography;

const ErrorListModal = ({ errorData = {}, visible, onClose }) => {
  const { created_count = 0, failed_count = 0, errors = [] } = errorData || {};

  return (
    <Modal
      open={visible}
      title={
        <div className="d-flex-valign-between">
          <Title level={3}>Errors</Title>{" "}
          <div className="d-flex-valign gap-2">
            <Text className="text-success">Created: {created_count}</Text>
            <Text className="text-danger">Failed: {failed_count}</Text>
          </div>
        </div>
      }
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div
        id="scrollableDiv"
        style={{
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        <List
          size="small"
          dataSource={errors}
          renderItem={(item, index) => (
            <List.Item key={item?.row + "-" + index}>
              <Text strong className="text-dark">Row {item?.row}: </Text>{" "}
              <Text className="text-danger">{item?.error ?? ""}</Text>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default ErrorListModal;
