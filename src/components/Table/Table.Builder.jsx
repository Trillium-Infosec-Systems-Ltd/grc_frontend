import React from 'react';
import { Table, Button, Select } from 'antd';
import './table.style.css';

const { Option } = Select;

const TableBuilder = ({
    columns = [],
    data = [],
    pageSize = 5,
    onDownload,
    downloadFormat = 'csv',
}) => {

    return (
        <div className="table-container">

            <Table
                className="custom-table"
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize,
                    total: data?.length || 0,
                    showSizeChanger: false,
                }}
                rowKey="id"
            />

            <div className="table-footer">
                <div className="export">
                    <span>Download List of Assets as</span>
                    <Select defaultValue={downloadFormat} style={{ width: 220, marginLeft: 10 }}>
                        <Option value="xlsx">Portable document format (.pdf)</Option>
                        <Option value="csv">comma separated values (.csv)</Option>
                        <Option value="xlsx">HTML file(.html)</Option>
                        <Option value="xlsx">Javascript Open Notaion (.json)</Option>
                    </Select>
                    <Button type="primary" className="ml-3 bg-primary" onClick={onDownload}>
                        Download
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default TableBuilder;
