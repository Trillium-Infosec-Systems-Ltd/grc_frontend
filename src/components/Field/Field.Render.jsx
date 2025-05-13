import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getValidators } from "../Form/validator";
import GenericSelect from './GenericSelect'
import { useMemo } from 'react';

const { TextArea } = Input;

const RenderField = ({ field = {} }) => {
    const commonProps = {
        name: field?.fieldname ?? '',
        label: field?.label ?? '',
        rules: getValidators(field),
        hidden: field?.hidden ?? false,
    };

    const formField = useMemo(() => {

        switch (field?.fieldtype) {
            case 'Data':
                return <Form.Item {...commonProps}><Input /></Form.Item>;
            case 'Select':
                return <Form.Item {...commonProps}><GenericSelect field={field} /></Form.Item>;
            case 'LongText':
                return <Form.Item {...commonProps}><TextArea rows={4} /></Form.Item>;
            case 'Date':
                return <Form.Item {...commonProps}><DatePicker style={{ width: '100%' }} /></Form.Item>;
            case 'Tags':
                return <Form.Item {...commonProps}><Select mode="tags" /></Form.Item>;
            case 'MultiLink':
                return <Form.Item {...commonProps}><GenericSelect field={field} mode="multiple" /></Form.Item>;
            case 'Link':
                return <Form.Item {...commonProps}><GenericSelect field={field} /></Form.Item>;
            case 'File':
                return (
                    <Form.Item
                        {...commonProps}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    >
                        <Upload beforeUpload={() => false} multiple>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>
                );
            default:
                return null;
        }
    }, [field])

    return formField
};

export default RenderField