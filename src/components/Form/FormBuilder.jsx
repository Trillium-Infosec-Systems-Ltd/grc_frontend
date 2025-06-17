import { useMemo, useState } from "react";
import { Form, Button, Row, Col, Upload, Typography } from "antd";
import useFormHook from "../../hooks/useFormHook";
import AppLoader from "../Loader/Loader";
import { KEY } from "../../constants/keysConstants";
import { buildInitialValues } from "./utils";
import { getValidators } from "./validator";
import { UploadOutlined } from "@ant-design/icons";
import RenderField from "../Field/FieldRender";
import QuestionTable from "../Field/QuestionTable";

const { Title } = Typography;

const FormBuilder = ({
  screen = "assets",
  title = "",
  redirect = "",
  MODE = KEY.CREATE,
}) => {
  const [schema, isLoading, initialData, submit] = useFormHook(screen, MODE);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => buildInitialValues(schema, initialData),
    [schema, initialData]
  );

  const props = {
    onRemove: (file) => {
      if (fileList.length === 0) return;
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((prevFileList) => [...prevFileList, file]);
      return false;
    },
    // fileList,
  };

  const fieldList = useMemo(
    () =>
      schema?.fields?.map((field) => {
        const {
          hidden = false,
          fieldname = "",
          label = "",
          span = 24,
          min,
          max,
          fieldtype,
        } = field;
        if (!hidden) {
          const commonProps = {
            // ...field,
            label,
            name: fieldname ?? "",
            rules: getValidators(field),
          };

          if (min) commonProps.min = min;
          if (max) commonProps.max = max;

          return (
            <Col xs={24} sm={24} md={span} key={fieldname}>
              {fieldtype === "File" ? (
                <Form.Item
                  {...commonProps}
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e?.fileList
                  }
                >
                  <Upload {...props}>
                    {/* <Upload {...props} multiple> */}
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              ) : fieldtype === "question_table" ? (
                <Form.Item {...commonProps} valuePropName="value">
                  <QuestionTable />;
                </Form.Item>
              ) : (
                <Form.Item {...commonProps}>
                  <RenderField field={field} />
                </Form.Item>
              )}
            </Col>
          );
        }
      }),
    [schema]
  );

  return (
    <AppLoader isLoading={isLoading}>
      <div className="table-header">
        <Title level={4}>{title ?? ""}</Title>
      </div>
      <Form
        name={`form_of_${screen}`}
        form={form}
        layout="vertical"
        onFinish={(fields) => submit({ ...fields, fileList }, redirect)}
        initialValues={initialValues}
      >
        <Row gutter={16}>{fieldList}</Row>

        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </AppLoader>
  );
};

export default FormBuilder;
