import { useMemo, useState } from 'react';
import { Popover, Form, Button, Space, Spin, Col, Row } from 'antd';
import useFormHook from '../../../hooks/useFormHook';
import { FilterFilled } from '@ant-design/icons';
import RenderField from '../../Field/Field.Render';

const FilterPopover = ({ screen = '', onApply }) => {
    const [schema, isLoading] = useFormHook(screen);
    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    const handleApply = () => {
        form.validateFields().then(values => {
            onApply(values);
            setVisible(false);
        });
    };

    const fieldList = useMemo(() => (
        schema?.fields?.map((field) => {
            if (!field?.hidden && field?.fieldtype !== 'File') {
                const commonProps = {
                    ...field,
                    name: field?.fieldname ?? '',
                    required: false
                    // rules: getValidators(field),
                };
                return <Col xs={24} sm={24} md={field?.span ?? 24} key={field?.fieldname}>
                    <Form.Item {...commonProps} ><RenderField field={field} /></Form.Item>
                </Col>
            }
        })
    ), [schema]);

    const content = (
        <Spin spinning={isLoading}>
            <Form form={form} layout="vertical">
                <Row gutter={10}>
                    {fieldList}
                </Row>
                <Space style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button size="small" onClick={() => setVisible(false)}>Cancel</Button>
                    <Button size="small" type="primary" onClick={handleApply}>Apply</Button>
                </Space>
            </Form>
        </Spin>
    );

    return (
        <Popover
            content={content}
            title="Filters"
            trigger="click"
            open={visible}
            onOpenChange={setVisible}
            placement="bottomRight"
        >
            <span className="filter-btn" style={{ cursor: 'pointer' }}>
                <FilterFilled /> Filter
            </span>
        </Popover>
    );
};

export default FilterPopover;
