import React, { useMemo } from 'react';
import { Form, Button, Row, Col } from 'antd';
import useFormHook from '../../hooks/useFormHook';
import AppLoader from '../Loader/loader';
import { KEY } from '../../constants/keys.constants';
import { buildInitialValues } from './utils';
import RenderField from '../Field/Field.Render';

const FormBuilder = ({ screen = 'assets', title = '', redirect = '', MODE = KEY.CREATE }) => {
    const [schema, isLoading, initialData, submit] = useFormHook(screen, MODE);

    const [form] = Form.useForm();

    const initialValues = useMemo(() => buildInitialValues(schema, initialData), [schema, initialData]);

    const fieldList = useMemo(() => (
        schema?.fields?.map((field) => (
            <Col xs={24} sm={24} md={field?.span ?? 24} key={field?.fieldname}>
                <RenderField field={field ?? {}} />
            </Col>
        ))
    ), [schema]);

    return (
        <AppLoader isLoading={isLoading}>
            <div className="table-header">
                <h2 className="title">{title ?? ''}</h2>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={(fields) => submit({ ...fields, id: MODE === KEY.EDIT ? initialData?.id : null }, redirect)}
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    {fieldList}
                </Row>

                <Form.Item>
                    <Button type="primary" className="bg-primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AppLoader>
    );
};

export default FormBuilder;
