import React from 'react';
import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import GenericSelect from '../Field/GenericSelect';
import { isNotNullOrEmpty } from '../../utils/utils';

const { TextArea } = Input;

const FormBuilder = ({ schema = {}, onFinish, initialData = {} }) => {
    const [form] = Form.useForm();

    const defaultValues = {};
    schema?.fields?.forEach((field) => {
        if (isNotNullOrEmpty(field.default)) {
            defaultValues[field.fieldname] = field.default;
        }
    });

    const initialValues = { ...defaultValues, ...initialData };

    const renderField = (field) => {
        const commonProps = {
            name: field?.fieldname ?? '',
            label: field?.label ?? '',
            rules: [],
        };

        if (field.required) {
            commonProps?.rules?.push({
                required: true,
                message: `${field.label} is required`,
            });
        }

        if (field?.validation?.min_length || field?.validation?.max_length) {
            commonProps.rules.push({
                validator: (_, value) => {
                    if (value) {
                        const len = value.length;
                        if (
                            isNotNullOrEmpty(field?.validation?.min_length) &&
                            len < field?.validation?.min_length
                        ) {
                            return Promise.reject(
                                `Minimum ${field?.validation?.min_length} characters required`
                            );
                        }
                        if (
                            isNotNullOrEmpty(field?.validation?.max_length) &&
                            len > field?.validation?.max_length
                        ) {
                            return Promise.reject(
                                `Maximum ${field?.validation?.max_length} characters allowed`
                            );
                        }
                    }
                    return Promise.resolve();
                },
            });
        }

        if (isNotNullOrEmpty(field?.validation?.regex)) {
            commonProps.rules.push({
                pattern: new RegExp(field?.validation?.regex),
                message: field?.validation?.message || `${field?.label} is invalid`,
            });
        }

        switch (field?.fieldtype) {
            case 'Data':
                return (
                    <Form.Item {...commonProps}>
                        <Input />
                    </Form.Item>
                );

            case 'Select':
                return (
                    <Form.Item {...commonProps}>
                        <GenericSelect field={field} />
                        {/* <Select placeholder={`Select ${field?.label}`}>
                            {field?.options.map((opt) => (
                                <Option key={opt} value={opt}>
                                    {opt}
                                </Option>
                            ))}
                        </Select> */}
                    </Form.Item>
                );

            case 'LongText':
                return (
                    <Form.Item {...commonProps}>
                        <TextArea rows={4} />
                    </Form.Item>
                );

            case 'Date':
                return (
                    <Form.Item {...commonProps}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                );

            case 'Tags':
                return (
                    <Form.Item {...commonProps}>
                        <Select mode="tags" placeholder={`Enter ${field?.label}`} />
                    </Form.Item>
                );

            case 'MultiLink':
                return (
                    <Form.Item {...commonProps}>
                        <GenericSelect
                            field={field}
                            mode='multiple'
                        />
                        {/* <Select mode="multiple" placeholder={`Select ${field?.label}`} /> */}
                        {/* Later: Fetch data from API and populate options */}
                    </Form.Item>
                );

            case 'Link':
                return (
                    <Form.Item {...commonProps}>
                        <GenericSelect
                            field={field}
                        />
                        {/* <Select placeholder={`Select ${field?.label}`} /> */}
                    </Form.Item>
                );

            case 'File':
                return (
                    <Form.Item
                        {...commonProps}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload beforeUpload={() => false} multiple>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>
                );

            default:
                return null;
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
        >
            {schema?.fields?.map((field) => (
                <div key={field?.fieldname}>{renderField(field)}</div>
            ))}

            <Form.Item>
                <Button type="primary" className="bg-primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormBuilder;
