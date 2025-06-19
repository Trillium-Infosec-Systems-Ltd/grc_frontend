import {
  Input,
  Select,
  DatePicker,
  Radio,
  Typography,
  InputNumber,
} from "antd";
import GenericSelect from "./GenericSelect";
import { useMemo } from "react";
import FormListField from "./FormListField";

const { TextArea } = Input;
const { Text } = Typography;

const RenderField = ({ field = {}, ...rest }) => {
  const formField = useMemo(() => {
    switch (field?.fieldtype) {
      case "Data":
        return <Input {...rest} />;
      case "Float":
        return <InputNumber {...rest} min={field.min} max={field.max} />;
      case "Select":
        return <GenericSelect {...rest} field={field} />;
      case "Radio":
        return (
          <Radio.Group
            {...rest}
            options={field?.options?.map((opt) => ({
              label: opt ?? "",
              value: opt ?? "",
            }))}
          />
        );
      case "LongText":
        return <TextArea {...rest} rows={4} />;
      case "Date":
        return <DatePicker {...rest} style={{ width: "100%" }} />;
      case "Tags":
        return <Select {...rest} mode="tags" />;
      case "MultiLink":
      case "MultiSelect":
        return <GenericSelect {...rest} field={field} mode="multiple" />;
      case "Link":
        return <GenericSelect {...rest} field={field} />;
      case "Text":
        return (
          <Text style={{ maxWidth: "100%" }} {...rest} field={field}>
            {field?.default_value ?? ""}
          </Text>
        );
      case "form_list_question":
        return <FormListField fieldname={field?.fieldname} />;
      default:
        return null;
    }
  }, [field, rest]);

  return formField;
};

export default RenderField;
