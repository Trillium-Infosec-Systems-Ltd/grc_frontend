import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getValidators } from "../Form/validator";
import GenericSelect from './GenericSelect'
import { useMemo } from 'react';

const { TextArea } = Input;

const RenderField = ({ field = {}, ...rest }) => {
    const formField = useMemo(() => {
        switch (field?.fieldtype) {
            case 'Data':
                return <Input {...rest} />;
            case 'Select':
                return <GenericSelect {...rest} field={field} />;
            case 'LongText':
                return <TextArea {...rest} rows={4} />;
            case 'Date':
                return <DatePicker {...rest} style={{ width: '100%' }} />;
            case 'Tags':
                return <Select {...rest} mode="tags" />;
            case 'MultiLink':
            case 'MultiSelect':
                return <GenericSelect {...rest} field={field} mode="multiple" />;
            case 'Link':
                return <GenericSelect {...rest} field={field} />;
            default:
                return null;
        }
    }, [field])

    return formField
};

export default RenderField