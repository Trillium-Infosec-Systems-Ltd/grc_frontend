import { Table, Button, Select, Typography, Row, Popconfirm } from "antd";
import "./tableStyle.css";
import useTableHook from "../../hooks/useTableHook";
import AppLoader from "../Loader/loader";
import { isNotNullOrEmpty, textCapitalize } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import FilterPopover from "../Popover/Filters/Filter";
import UploadBulkModal from "../Modals/UploadBulkModal";
import { useState } from "react";
import useUploadHook from "../../hooks/useUploadHook";
import PopoverAction from "../Popover/Popover";
import { CodeSandboxOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const TableBuilder = ({
  pageSize = 5,
  downloadFormat = "csv",
  screen = "assets",
  title = "List of Assets",
  isShowHeader = true,
  isDeletAble = false,
  isExport = true,
  pagination = true,
  isfilter = true,
  headerLinks = [],
  actionsList = [],
}) => {
  const [tPageSize, setTPage] = useState(pageSize);
  const [bulkModal, setBulkModal] = useState(false);
  

  const { loading, template } = useUploadHook(screen);
  const {
    schema,
    data,
    filters,
    isLoading,
    selectedRowKeys,
    rowSelection,
    fetchData,
    getTableSchema,
    deleteRecord,
  } = useTableHook(screen);
  const { items = [], total = 0, skip = 0, limit = 10 } = data ?? {};
  const { columns = [] } = schema ?? {};

  let columnList = [
    ...(columns ?? []),
    ...(actionsList?.map((action) =>
      action?.type === "popover"
        ? {
            ...action,
            fixed: "right",
            render: (_, record) => (
              <PopoverAction
                screen={screen}
                content={action?.actions ?? []}
                record={record}
                operations={{ delete: deleteRecord }}
              >
                <Button shape="round" className="view-details-button">
                  {action?.title ?? "More Actions"}
                </Button>
              </PopoverAction>
            ),
          }
        : { ...action, fixed: "right" }
    ) ?? []),
  ];

  const ensureRecordIds = (records = []) => {
    return records.map((record, index) => {
      return {
        ...record,
        t_row_record_id: record?.id ?? uuidv4(),
        _generatedId: true,
      };
    });
  };

  const tableProps = {
    size: "small",
  };

  return (
    <AppLoader isLoading={isLoading}>
      {isShowHeader && (
        <div className="table-header">
          <Title level={4}>{title ?? ""}</Title>
          <UploadBulkModal
            screen={screen}
            visible={bulkModal}
            onClose={() => setBulkModal(false)}
            onRefresh={getTableSchema}
          />
          {/* <Button variant="primary" onClick={() => setBulkModal(true)}>
            Import
          </Button> */}
          {/* <DropdownButton /> */}

          {(isNotNullOrEmpty(headerLinks) || isExport) && (
            <div className="actions">
              {isDeletAble && isNotNullOrEmpty(selectedRowKeys) && (
                <Popconfirm
                  title="Delete"
                  description="Are you sure to delete this record?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteRecord(selectedRowKeys)}
                >
                  {/* <span
                  style={{
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  {action?.label}
                </span> */}
                  <Button
                    type="primary"
                    disabled={loading}
                    loading={loading}
                    style={{ backgroundColor: 'red' }}
                  >
                    <span className="text-white" style={{ fontWeight: 600 }}>
                      Delete
                    </span>
                  </Button>
                </Popconfirm>
              )}
              {isExport && (
                <Button
                  type="primary"
                  className="bg-primary"
                  onClick={() => template("CSV_EXPORT", filters)}
                  disabled={loading}
                  loading={loading}
                >
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    Export
                  </span>
                </Button>
              )}
              {isfilter && (
                <FilterPopover
                  screen={screen}
                  initialValues={filters}
                  onApply={(filters) => {
                    console.log("Applied filters:", filters);
                    fetchData({ schema, filters });
                  }}
                />
              )}

              {headerLinks?.map((link, index) =>
                isNotNullOrEmpty(link?.Component) ? (
                  <div key={"table-h-link_" + index}>{link?.Component}</div>
                ) : (
                  <PopoverAction
                    key={"table-h-link_" + index}
                    screen={screen}
                    content={[
                      {
                        label: (
                          <Row gutter={8} className="action-items">
                            <CodeSandboxOutlined /> Add {textCapitalize(screen)}
                          </Row>
                        ),
                        onClick: link?.onClick,
                      },
                      {
                        label: (
                          <Row gutter={8} className="action-items">
                            <UploadOutlined /> Import
                          </Row>
                        ),
                        onClick: () => setBulkModal(true),
                      },
                    ]}
                  >
                    <span className={link?.className ?? ""}>
                      {link?.label ?? ""}
                    </span>
                  </PopoverAction>
                )
              )}
            </div>
          )}
        </div>
      )}
      <div className="table-container">
        <Table
          name={`table_builder_${screen}`}
          columns={columnList}
          dataSource={ensureRecordIds(items ?? [])}
          scroll={{ x: "max-content" }}
          rowSelection={isDeletAble && rowSelection}
          tableProps={tableProps}
          pagination={
            pagination
              ? {
                  size: "default",
                  pageSizeOptions: [5, 10],
                  current: Math.floor(skip / limit) + 1,
                  pageSize: tPageSize,
                  total: total ?? 0,
                  onChange: (page, pageSize) => {
                    setTPage(pageSize);
                    fetchData({
                      skip: (page - 1) * pageSize,
                      limit: pageSize,
                      schema,
                      filters,
                    });
                  },
                  itemRender: (_, type, originalElement) => {
                    if (type === "prev") {
                      return <a>Previous</a>;
                    }
                    if (type === "next") {
                      return <a>Next</a>;
                    }
                    return originalElement;
                  },
                }
              : false
          }
          rowKey="t_row_record_id"
          // size="middle"
        />

        {/* {isExport && (
          <div className="table-footer">
            <div className="export">
              <span>Download List as</span>
              <Select
                defaultValue={downloadFormat}
                style={{ marginLeft: 10 }}
                disabled
              >
                <Option value="xlsx">Portable document format (.pdf)</Option>
                <Option value="csv">comma separated values (.csv)</Option>
                <Option value="html">HTML file(.html)</Option>
                <Option value="json">Javascript Open Notaion (.json)</Option>
              </Select>
              <Button
                type="primary"
                className="ml-3 bg-primary"
                onClick={() => template("CSV_EXPORT", filters)}
                disabled={loading}
                loading={loading}
              >
                Download
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </AppLoader>
  );
};

export default TableBuilder;
