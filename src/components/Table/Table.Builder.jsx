import { Table, Button, Select } from 'antd';
import './table.style.css';
import { useNavigate } from 'react-router-dom';
import useTableHook from '../../hooks/useTableHook';
import AppLoader from '../Loader/loader';
import { isNotNullOrEmpty } from '../../utils/utils';

const { Option } = Select;

const TableBuilder = ({
    pageSize = 5,
    onDownload,
    downloadFormat = 'csv',
    screen = 'assets',
    title = 'List of Assets',
    isShowHeader = true,
    isExport = true,
    pagination = true,
    headerLinks = [],
    actionsList = [],
}) => {
    const navigate = useNavigate();

    const [schema, data, isLoading] = useTableHook(screen);
    const { items = [], total = 0, skip = 0, limit = 10 } = data ?? {};
    const { columns = [] } = schema ?? {};

    let columnList = [...(columns ?? []), ...(actionsList ?? [])]

    return (
        <AppLoader isLoading={isLoading}>
            {isShowHeader && (
                <div className="table-header">
                    <h2 className="title">{title ?? ''}</h2>
                    {isNotNullOrEmpty(headerLinks) && (
                        <div className="actions">
                            {headerLinks?.map((link, index) =>
                                isNotNullOrEmpty(link?.Component) ? (
                                    <div key={'table-h-link_' + index}>{link?.Component}</div>
                                ) : (
                                    <span
                                        key={'table-h-link_' + index}
                                        className={link?.className ?? ''}
                                        onClick={link?.onClick}
                                    >
                                        {link?.label ?? ''}
                                    </span>
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
            <div className="table-container">
                <Table
                    className="custom-table"
                    columns={columnList}
                    dataSource={items ?? []}
                    pagination={
                        pagination
                            ? {
                                pageSize,
                                total: items?.length || 0,
                                showSizeChanger: false,
                            }
                            : false
                    }
                    rowKey="id"
                />

                {isExport && (
                    <div className="table-footer">
                        <div className="export">
                            <span>Download List of Assets as</span>
                            <Select
                                defaultValue={downloadFormat}
                                style={{ width: 220, marginLeft: 10 }}
                            >
                                <Option value="xlsx">Portable document format (.pdf)</Option>
                                <Option value="csv">comma separated values (.csv)</Option>
                                <Option value="xlsx">HTML file(.html)</Option>
                                <Option value="xlsx">Javascript Open Notaion (.json)</Option>
                            </Select>
                            <Button
                                type="primary"
                                className="ml-3 bg-primary"
                                onClick={onDownload}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLoader>
    );
};

export default TableBuilder;
