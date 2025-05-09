import dayjs from 'dayjs';

export const buildInitialValues = (schema, initialData) => {
    const initialValues = {};

    schema?.fields?.forEach((field) => {
        let val = initialData[field.fieldname] ?? field.default;
        if (field.fieldtype === 'Date' && val) {
            val = dayjs(val);
        }
        initialValues[field.fieldname] = val;
    });

    return initialValues;
};

