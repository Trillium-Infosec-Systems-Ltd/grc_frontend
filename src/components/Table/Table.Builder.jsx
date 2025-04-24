import React from 'react';
import { Table, Tag, Button, Select, Pagination } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './table.style.css';

const { Option } = Select;

const TableBuilder = ({
    columns = [],
    data = [],
    currentPage = 1,
    pageSize = 10,
    onPageChange,
    onDownload,
    downloadFormat = 'csv',
    onManage,
}) => {
    const paginationProps = {
        current: currentPage,
        pageSize,
        total: data?.length ? data?.length : 0,
        onChange: onPageChange,
        showSizeChanger: false,
        className: 'custom-pagination',
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <h2 className="title">List of Assets</h2>
                <div className="actions">
                    <span className="filter-btn">🔍 Filter</span>
                    <span className="add-btn">+ Add New Asset</span>
                </div>
            </div>

            <Table
                className="custom-table"
                columns={columns}
                dataSource={data}
                pagination={false}
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

                <Pagination {...paginationProps} />
            </div>
        </div>
    );
};

export default TableBuilder;
