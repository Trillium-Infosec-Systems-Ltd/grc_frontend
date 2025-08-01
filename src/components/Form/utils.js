import dayjs from "dayjs";
import { createBaseURL } from "../../axios";

export const buildInitialValues = (schema, initialData) => {
  const initialValues = {};

  schema?.fields?.forEach((field) => {
    let val = initialData[field.fieldname] ?? field.default;
    if (field.fieldtype === "Date" && val) {
      val = dayjs(val);
    }

    if (field.fieldtype === "File" && val) {
      val = val.map((file, index) => ({
        uid: index + 1,
        name: file,
        url: createBaseURL() + file,
        status: "uploaded",
      }));
    }
    initialValues[field.fieldname] = val;
  });

  return initialValues;
};
