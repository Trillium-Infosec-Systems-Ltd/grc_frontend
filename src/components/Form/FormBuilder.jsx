import { useMemo, useState } from "react";
import { Form, Button, Row, Col, Upload, Typography } from "antd";
import useFormHook from "../../hooks/useFormHook";
import AppLoader from "../Loader/loader";
import { KEY } from "../../constants/keysConstants";
import { buildInitialValues } from "./utils";
import { getValidators } from "./validator";
import { UploadOutlined } from "@ant-design/icons";
import RenderField from "../Field/FieldRender";
import { isNotNullOrEmpty, isNullOrEmpty } from "../../utils/utils";
import { APIS } from "../../constants/apiConstants";
import { callApi } from "../../axios/callApi";

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

  const fetchDataByValue = async (fetch_to = {}, getValue, setValue) => {
    let {
      to,
      query_params = [],
      path_params = [],
      data_fields = [],
    } = fetch_to;

    let qParams = {};

    if (isNullOrEmpty(to)) return;
    if (isNotNullOrEmpty(path_params) && path_params.length !== 0) {
      for (const key of path_params) {
        const val = getValue(key);
        if (isNullOrEmpty(val)) {
          return;
        }
        to += `/${val}`;
      }
    }
    if (isNotNullOrEmpty(query_params)) {
      qParams = query_params.reduce((acc, k) => {
        acc[k] = getValue(k);
        return acc;
      }, {});
    }

    try {
      let payload = { ...APIS.DYNAMIC_CALL };
      payload.URL = to;

      if (Object.keys(qParams).length !== 0) {
        payload.PARAMS.QUERY = qParams;
      }

      const res = await callApi(payload);

      const { node = {} } = res?.data ?? {};

      let dataFields =
        schema?.fields?.filter((f) => isNotNullOrEmpty(f?.data_field)) || [];

      if (dataFields?.length !== 0) {
        for (let dF of dataFields) {
          setValue(dF.fieldname, node?.[dF.data_field]);
        }
      }

      // form.setFieldValue("asset_value", criticality_level);

      console.log({ res });

      // setOptions(res?.data ?? []);
    } catch (err) {
      console.error("Select search error", err);
    }
  };

  const fieldList = useMemo(
    () =>
      schema?.fields?.map((field) => {
        let {
          hidden = false,
          fieldname = "",
          label = "",
          span = 24,
          min,
          max,
          fieldtype,
          is_edit_disabled = false,
          disabled = false,
          display_on_field,
          display_on_value,
          depend_on_field,
          depend_on_value,
          disable_on_value,
          disable_on_field,
          required_on_value,
          required_on_field,
          isFetchingData = false,
          fetch_to,
        } = field;

        if (!hidden) {
          const watchKeys = [
            display_on_field,
            disable_on_field,
            depend_on_field,
            required_on_field,
            ...(fetch_to?.path_params || []),
            ...(fetch_to?.query_params || []),
          ].filter(Boolean);

          return (
            <Form.Item
              key={fieldname}
              noStyle
              shouldUpdate={(prevValues, curValues) =>
                // re-render only when one of our watched keys changes
                watchKeys.some((k) => prevValues[k] !== curValues[k])
              }
            >
              {({ getFieldValue, setFieldValue }) => {
                let show = true;

                let commonProps = {
                  // ...field,
                  label,
                  name: fieldname ?? "",
                  rules: getValidators(field),
                };

                if (min) commonProps.min = min;
                if (max) commonProps.max = max;

                if (isNotNullOrEmpty(required_on_field) && !field?.required) {
                  let fieldValue = getFieldValue(required_on_field) || null;
                  commonProps.rules = getValidators({
                    ...field,
                    required: isNotNullOrEmpty(required_on_value)
                      ? fieldValue === required_on_value
                      : isNotNullOrEmpty(fieldValue),
                  });
                }

                if (isNotNullOrEmpty(display_on_field)) {
                  let fieldValue = getFieldValue(display_on_field) || null;
                  if (isNotNullOrEmpty(display_on_value)) {
                    show = fieldValue === display_on_value;
                  } else {
                    show = isNotNullOrEmpty(fieldValue);
                  }
                }

                if (!show) {
                  setFieldValue(
                    fieldname,
                    isNotNullOrEmpty(field?.default)
                      ? field?.default
                      : fieldtype === "question_table"
                      ? field?.default_value?.map((q) => ({
                          ...q,
                          answer: false,
                        }))
                      : field?.default_value
                  );
                  return null;
                }

                let readonlyField = disabled ? disabled : is_edit_disabled && MODE === KEY.EDIT ? is_edit_disabled : false;

                if (isNotNullOrEmpty(disable_on_field) && !disabled) {
                  let fieldValue = getFieldValue(disable_on_field) || null;
                  if (isNotNullOrEmpty(disable_on_value)) {
                    readonlyField = fieldValue === disable_on_value;
                  } else {
                    readonlyField = isNotNullOrEmpty(fieldValue);
                  }
                }

                if (isNotNullOrEmpty(depend_on_field) && !readonlyField) {
                  let fieldValue = getFieldValue(depend_on_field) || null;
                  if (isNotNullOrEmpty(depend_on_value)) {
                    readonlyField = fieldValue !== depend_on_value;
                  } else {
                    readonlyField = isNullOrEmpty(fieldValue);
                  }
                }

                if (readonlyField) {
                  setFieldValue(
                    fieldname,
                    isNotNullOrEmpty(field?.default)
                      ? field?.default
                      : field?.default_value
                  );
                }

                // if (isFetchingData && isNotNullOrEmpty(fetch_to)) {
                //   let is_callable = true;
                //   for (const key of Object?.keys(fetch_to?.isCall ?? {}) || []) {
                //     is_callable = getFieldValue(key) === fetch_to?.isCall[key];
                //     if (!is_callable) break;
                //   }
                //   if (is_callable) {
                //     fetchDataByValue(
                //       fetch_to,
                //       (k) => getFieldValue(k),
                //       (k, v) => setFieldValue(k, v)
                //     );
                //   }
                // }

                return (
                  <Col xs={24} sm={24} md={span} key={fieldname}>
                    {fieldtype === "File" ? (
                      <Form.Item
                        {...commonProps}
                        valuePropName="fileList"
                        getValueFromEvent={(e) =>
                          Array.isArray(e) ? e : e?.fileList
                        }
                        shouldUpdate
                      >
                        <Upload {...props}>
                          {/* <Upload {...props} multiple> */}
                          <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                      </Form.Item>
                    ) : (
                      <Form.Item {...commonProps} shouldUpdate>
                        <RenderField
                          field={field}
                          form={form}
                          disabled={readonlyField}
                          screen={screen}
                        />
                      </Form.Item>
                    )}
                  </Col>
                );
              }}
            </Form.Item>
          );
        }
      }),
    [schema]
  );

  const handleValuesChange = (changedValues, allValues) => {
    schema?.fields?.forEach((field) => {
      const { fieldname, isFetchingData, fetch_to } = field;
      if (
        isFetchingData &&
        isNotNullOrEmpty(fetch_to) &&
        Object.prototype.hasOwnProperty.call(changedValues, fieldname)
      ) {
        let is_callable = true;
        for (const key of Object?.keys(fetch_to?.isCall ?? {}) || []) {
          is_callable = allValues[key] === fetch_to?.isCall[key];
          if (!is_callable) break;
        }
        if (is_callable) {
          fetchDataByValue(
            fetch_to,
            (k) => allValues[k],
            (k, v) => form.setFieldValue(k, v)
          );
        }
      }
    });
  };

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
        onValuesChange={handleValuesChange}
        onFinishFailed={({ errorFields }) => {
          if (errorFields.length > 0) {
            form.scrollToField(errorFields[0].name, {
              behavior: "smooth",
              block: "center",
            });
          }
        }}
      >
        <Row gutter={16}>{fieldList}</Row>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}

        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </AppLoader>
  );
};

export default FormBuilder;
