import { useMemo, useState } from 'react';
import { Form, Button, Row, Col, Upload } from 'antd';
import useFormHook from '../../hooks/useFormHook';
import AppLoader from '../Loader/loader';
import { KEY } from '../../constants/keys.constants';
import { buildInitialValues } from './utils';
import { getValidators } from './validator';
import { UploadOutlined } from '@ant-design/icons';
import RenderField from '../Field/Field.Render'

const FormBuilder = ({ screen = 'assets', title = '', redirect = '', MODE = KEY.CREATE }) => {
    const [schema, isLoading, initialData, submit] = useFormHook(screen, MODE);
    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();

    const initialValues = useMemo(() => buildInitialValues(schema, initialData), [schema, initialData]);

    const props = {
        onRemove: file => {
            if (fileList.length === 0) return;
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: file => {
            setFileList((prevFileList) => [...prevFileList, file]);
            return false;
        },
        // fileList,
    };

    const fieldList = useMemo(() => (
        schema?.fields?.map((field) => {
            if (!field?.hidden) {
                const commonProps = {
                    ...field,
                    name: field?.fieldname ?? '',
                    rules: getValidators(field),
                };
                return <Col xs={24} sm={24} md={field?.span ?? 24} key={field?.fieldname}>
                    {field?.fieldtype !== 'File' ? <Form.Item {...commonProps} ><RenderField field={field} /></Form.Item>
                        :
                        <Form.Item
                            {...commonProps}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        >
                            <Upload {...props}>
                                {/* <Upload {...props} multiple> */}
                                <Button icon={<UploadOutlined />}>Upload File</Button>
                            </Upload>
                        </Form.Item>
                    }
                </Col>
            }
        })
    ), [schema]);

    return (
        <AppLoader isLoading={isLoading}>
            <div className="table-header">
                <h2 className="title">{title ?? ''}</h2>
            </div>
            <Form
                name={`form_of_${screen}`}
                form={form}
                layout="vertical"
                onFinish={(fields) => submit({ ...fields, fileList, id: MODE === KEY.EDIT ? initialData?.id : null }, redirect)}
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    {fieldList}
                </Row>

                <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button type="primary" className="bg-primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AppLoader>
    );
};

export default FormBuilder;
