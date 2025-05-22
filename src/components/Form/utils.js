import dayjs from 'dayjs';
import { BASE_URLS } from '../../axios';

export const buildInitialValues = (schema, initialData) => {
    const initialValues = {};

    schema?.fields?.forEach((field) => {
        let val = initialData[field.fieldname] ?? field.default;
        if (field.fieldtype === 'Date' && val) {
            val = dayjs(val);
        }

        if (field.fieldtype === 'File' && val) {
            val = val.map((file, index) => ({ uid: index + 1, name: file, url: BASE_URLS.public + file, status: 'uploaded' }));
        }
        initialValues[field.fieldname] = val;
    });

    return initialValues;
};

