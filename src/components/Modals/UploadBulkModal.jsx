// AssetUploadModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, Typography, message } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import useUploadHook from "../../hooks/useUploadHook";
import ErrorListModal from "./ErrorListModal";
import { isNullOrEmpty, textCapitalize } from "../../utils/utils";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const UploadBulkModal = ({ screen = "", visible, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const {
    loading,
    error = false,
    errorDetail,
    template,
    uploadBulk,
    resetError,
  } = useUploadHook(screen);
  const [fileList, setFileList] = useState([]);

  // Only allow one file
  const uploadProps = {
    accept: ".csv, .xlsx",
    multiple: false,
    beforeUpload: (file) => {
      if (
        !file.name.toLowerCase().endsWith(".csv") &&
        !file.name.toLowerCase().endsWith(".xlsx")
      ) {
        message.error("Only .csv or xlsx files are allowed");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      form.setFieldsValue({ fileName: file.name });
      return false; // prevent auto-upload
    },
    onRemove: () => {
      setFileList([]);
      form.setFieldsValue({ fileName: "" });
    },
    fileList,
  };

  const handleOk = async () => {
    try {
      if (!fileList.length) {
        form.setFields([
          {
            name: "file",
            errors: ["Please choose a file"],
          },
        ]);
        return;
      }
      let resp = await uploadBulk(fileList);
      if (resp) {
        message.success(`${screen} uploaded successfully!`);
        form.resetFields();
        setFileList([]);
        onClose();
        onRefresh();
      }
    } catch (err) {
      message.error(err.message || "Something went wrong");
    }
  };

  return (
    <Modal
      open={visible}
      title={<Title level={3}>Upload</Title>}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      onCancel={onClose}
      footer={[
        <Button
          key="upload"
          type="primary"
          onClick={handleOk}
          disabled={!fileList.length || loading}
          loading={loading}
          className="text-white"
        >
          Upload<span className="">{textCapitalize(screen)}</span>
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="fileName"
          label={
            <Text strong className="text-primary">
              File Name
            </Text>
          }
        >
          <Input placeholder="TISS_ASSETS_MARCH_2025.csv" disabled />
        </Form.Item>

        <Form.Item
          label={
            <Text strong className="text-primary">
              Upload File
            </Text>
          }
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              type="primary"
              shape="round"
              icon={<UploadOutlined />}
              onClick={() =>
                document.getElementById("hidden-upload-input").click()
              }
            >
              Choose a file
            </Button>
            <a
              href="#"
              rel="noopener noreferrer"
              className="text-primary"
              style={{ marginLeft: 16 }}
              onClick={() => template()}
            >
              sample file <DownloadOutlined />
            </a>
          </div>
        </Form.Item>

        <Form.Item
          name="file"
          rules={[{ required: true, message: "Please select a file" }]}
          noStyle
        >
          {/* hidden field just to trigger validation */}
          <Input type="hidden" />
        </Form.Item>

        <Dragger
          id="hidden-upload-input"
          {...uploadProps}
          style={{ marginBottom: 24, padding: "10px 0" }}
        >
          <UploadOutlined style={{ fontSize: 32 }} />
          <Title level={5}>You can drag and drop files to add them.</Title>
        </Dragger>

        <Form.Item
          name="separator"
          label={
            <Text strong className="text-primary">
              CSV Separator
            </Text>
          }
          initialValue=","
        >
          <Input style={{ width: 120 }} disabled />
        </Form.Item>

        <Form.Item
          name="encoding"
          label={
            <Text strong className="text-primary">
              Encoding
            </Text>
          }
          initialValue="UTF-8"
        >
          <Input style={{ width: 120 }} disabled />
        </Form.Item>
      </Form>
      <ErrorListModal
        visible={error}
        errorData={errorDetail}
        onClose={resetError}
      />
    </Modal>
  );
};

export default UploadBulkModal;
