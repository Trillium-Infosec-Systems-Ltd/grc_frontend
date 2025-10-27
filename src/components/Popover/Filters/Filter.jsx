import { useMemo, useState } from "react";
import { Popover, Form, Button, Space, Spin, Col, Row } from "antd";
import useFormHook from "../../../hooks/useFormHook";
import { FilterFilled } from "@ant-design/icons";
import RenderField from "../../Field/FieldRender";
import { isNotNullOrEmpty } from "../../../utils/utils";

const FilterPopover = ({ screen = "", initialValues = null, onApply }) => {
  const [schema, isLoading] = useFormHook(screen);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const handleApply = () => {
    form.validateFields().then((values) => {
      onApply(values);
      setVisible(false);
    });
  };

  const handleReset = () => {
    form.resetFields();
    onApply({});
    setVisible(false);
  };

  const fieldList = useMemo(
    () =>
      schema?.fields
        ?.filter((field) => !field?.hidden && field?.is_filter)
        ?.map((field) => {
          const commonProps = {
            ...field,
            name: field?.fieldname ?? "",
            required: false,
            // rules: getValidators(field),
          };
          return (
            <Col xs={24} sm={24} md={12} key={field?.fieldname}>
              <Form.Item {...commonProps}>
                <RenderField field={{ ...field, fieldtype: field?.fieldtype_filter ?? field?.fieldtype}} screen={screen} />
              </Form.Item>
            </Col>
          );
        }),
    [schema]
  );

  const content = (
    <Spin spinning={isLoading}>
      {isNotNullOrEmpty(fieldList) && fieldList?.length !== 0 ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={10}>{fieldList}</Row>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button size="small" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              size="small"
              color="danger"
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button size="small" type="primary" onClick={handleApply}>
              Apply
            </Button>
          </Space>
        </Form>
      ) : (
        <div
          style={{ padding: "8px 0", minWidth: "200px", textAlign: "center" }}
        >
          No filters available
        </div>
      )}
    </Spin>
  );

  return (
    <Popover
      content={content}
      title="Filters"
      trigger="click"
      open={visible}
      placement="bottomRight"
      styles={{
        root: { minWidth: "300px", maxWidth: "60vw" },
      }}
      onOpenChange={(open) => {
        if (!open) {
          if (isNotNullOrEmpty(initialValues)) {
            form.setFieldsValue(initialValues);
          } else {
            form.resetFields();
          }
        }
        setVisible(open);
      }}
    >
      <span className="filter-btn" style={{ cursor: "pointer" }}>
        <FilterFilled /> Filter
      </span>
    </Popover>
  );
};

export default FilterPopover;
