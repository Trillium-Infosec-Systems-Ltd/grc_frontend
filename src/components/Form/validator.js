import { isNotNullOrEmpty } from "../../utils/utils";

export const getValidators = (field) => {
    const rules = [];

    if (field.required) {
        rules.push({ required: true, message: `${field.label} is required` });
    }

    if (field?.validation?.min_length || field?.validation?.max_length) {
        rules.push({
            validator: (_, value) => {
                if (value) {
                    const len = value.length;
                    if (isNotNullOrEmpty(field?.validation?.min_length) && len < field.validation.min_length) {
                        return Promise.reject(`Minimum ${field.validation.min_length} characters required`);
                    }
                    if (isNotNullOrEmpty(field?.validation?.max_length) && len > field.validation.max_length) {
                        return Promise.reject(`Maximum ${field.validation.max_length} characters allowed`);
                    }
                }
                return Promise.resolve();
            }
        });
    }

    if (isNotNullOrEmpty(field?.validation?.regex)) {
        rules.push({
            pattern: new RegExp(field.validation.regex),
            message: field.validation.message || `${field.label} is invalid`,
        });
    }

    return rules;
};
