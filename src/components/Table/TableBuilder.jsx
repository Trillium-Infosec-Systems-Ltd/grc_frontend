import { Table, Button, Select, Typography } from "antd";
import "./tableStyle.css";
import useTableHook from "../../hooks/useTableHook";
import AppLoader from "../Loader/Loader";
import { isNotNullOrEmpty } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import FilterPopover from "../Popover/Filters/Filter";
import DropdownButton from "../Button/DropdownButton";
import UploadBulkModal from "../Modals/UploadBulkModal";
import { useState } from "react";

const { Option } = Select;
const { Title } = Typography;

const TableBuilder = ({
  pageSize = 5,
  onDownload,
  downloadFormat = "csv",
  screen = "assets",
  title = "List of Assets",
  isShowHeader = true,
  isExport = true,
  pagination = true,
  filters = true,
  headerLinks = [],
  actionsList = [],
}) => {
  const [bulkModal, setBulkModal] = useState(false);
  const [schema, data, isLoading, fetchData, getTableSchema] = useTableHook(screen);
  const { items = [], total = 0, skip = 0, limit = 10 } = data ?? {};
  const { columns = [] } = schema ?? {};

  let columnList = [
    ...(columns ?? []),
    ...(actionsList?.map((action) => ({ ...action, fixed: "right" })) ?? []),
  ];

  const ensureRecordIds = (records = []) => {
    return records.map((record, index) => {
      return {
        ...record,
        t_row_record_id: uuidv4(),
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

          {isNotNullOrEmpty(headerLinks) && (
            <div className="actions" style={{ display: "flex", gap: "20px" }}>
              {/* {filters && (
                <FilterPopover
                  screen={screen}
                  onApply={(filters) => {
                    console.log("Applied filters:", filters);
                  }}
                />
              )} */}
              {headerLinks?.map((link, index) =>
                isNotNullOrEmpty(link?.Component) ? (
                  <div key={"table-h-link_" + index}>{link?.Component}</div>
                ) : (
                  <span
                    key={"table-h-link_" + index}
                    className={link?.className ?? ""}
                    onClick={link?.onClick}
                  >
                    {link?.label ?? ""}
                  </span>
                )
              )}
              <span
                key={"table-h-link_import"}
                // className={link?.className ?? ""}
                onClick={() => setBulkModal(true)}
              >
                Import
              </span>
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
          tableProps={tableProps}
          pagination={
            pagination
              ? {
                  current: Math.floor(skip / limit) + 1,
                  pageSize,
                  total: total ?? 0,
                  onChange: (page, pageSize) => {
                    fetchData((page - 1) * pageSize, pageSize, schema);
                  },
                }
              : false
          }
          rowKey="t_row_record_id"
        />

        {isExport && (
          <div className="table-footer">
            <div className="export">
              <span>Download List as</span>
              <Select
                defaultValue={downloadFormat}
                style={{ width: 220, marginLeft: 10 }}
              >
                <Option value="xlsx">Portable document format (.pdf)</Option>
                <Option value="csv">comma separated values (.csv)</Option>
                <Option value="html">HTML file(.html)</Option>
                <Option value="json">Javascript Open Notaion (.json)</Option>
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
