import { useCallback, useEffect, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { KEY } from "../constants/keysConstants";
import { useDispatch, useSelector } from "react-redux";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";
import { message } from "antd";
import { clearUserQuery, setModule } from "../features/user/userSlice";

const useTableHook = (screen, MODE = KEY.VIEW) => {
  const dispatch = useDispatch();
  const { user, userQuery, module } = useSelector((state) => state.session);
  const { pagination = {}, screen: moduleScreen, filters: moduleFilters } = module ?? {};

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);
  const [stateRef, setStateRef] = useState({
    filters: moduleFilters,
    originalData: [],
    data: { total: 0, skip: (pagination.current - 1) * 5, limit: 5, items: [] },
    schema: {},
  });

  const { org_id = "" } = user;
  const { schema, data, filters } = stateRef ?? {};

  useEffect(() => {
    getTableSchema();
  }, [screen, org_id]);

  useEffect(() => {
    searchData(userQuery);
  }, [userQuery]);

  useEffect(() => {
    return () => {
      dispatch(clearUserQuery());
    };
  }, []);

  const getTableSchema = useCallback(async () => {
    setIsLoaing(true);
    setSelectedRowKeys([]);

    const result = await callApi({
      ...APIS.TABLE_SCHEMA,
      URL: APIS.TABLE_SCHEMA.URL + screen,
    });

    const { data: tSchema = {} } = result;

    await getTableData({
      skip: moduleScreen === screen ? data.skip : 0,
      limit: 5,
      schema: tSchema ?? {},
      filters: moduleScreen === screen ? moduleFilters : {},
    });
  }, [screen]);

  const getTableData = useCallback(
    async ({ skip = data.skip, limit = 5, schema: tschema = {}, filters }) => {
      const currentPage = (skip / limit) + 1;
      setIsLoaing(true);

      dispatch(setModule({ screen, pagination: { current: currentPage }, filters }));

      let apiConfig = { ...APIS.GET_RECORDS };
      if (screen?.toLowerCase() === "users") apiConfig = { ...APIS.GET_AUTH };

      const result = await callApi({
        ...apiConfig,
        URL: apiConfig.URL + screen,
        PARAMS: {
          QUERY: { skip, limit, ...(isNotNullOrEmpty(filters) ? filters : {}) },
        },
      });

      let { data = {} } = result;
      data = {
        ...data,
        items: data?.items?.map((i) => ({ ...i, ...i?.node })),
      };
      const { items = [] } = data;
      const { columns = [] } = tschema;

      let newColumns = columnPropertiesUpdator(columns, items);

      setStateRef((prev) => ({
        ...prev,
        filters,
        originalData: items,
        data,
        schema: { ...tschema, columns: newColumns } ?? {},
      }));
      setIsLoaing(false);
    },
    [screen, pagination, moduleFilters]
  );

  const deleteRecord = useCallback(
    async (recordIds = []) => {
      if (isNullOrEmpty(recordIds)) return;

      setIsLoaing(true);

      let apiConfig = { ...APIS.DELETE_RECORD };
      apiConfig.PAYLOAD = { ids: recordIds };
      const result = await callApi({
        ...apiConfig,
        PARAMS: { PATH: { screen } },
      });
      if (result?.status === 200) {
        message.success(result?.data?.detail || `Record deleted successfully`);
        await getTableSchema();
      } else {
        message.error(result?.data?.detail || `Failed to delete record`);
      }
      setIsLoaing(false);
    },
    [screen]
  );

  const searchData = (query) => {
    if (isNullOrEmpty(query)) {
      // const { columns = [] } = stateRef.schema;

      // let newColumns = columnPropertiesUpdator(columns, stateRef.originalData);

      setStateRef((prev) => ({
        ...prev,
        data: { ...prev.data, items: prev.originalData },
        // schema: { ...prev.schema, columns: newColumns } ?? {},
      }));
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filterData = stateRef.originalData.filter((entry) =>
      Object.values(entry).some(
        (value) =>
          isNotNullOrEmpty(value) &&
          String(value).toLowerCase().includes(lowerQuery)
      )
    );
    setStateRef((prev) => ({
      ...prev,
      data: { ...prev.data, items: filterData },
      // schema: { ...prev.schema, columns: newColumns } ?? {},
    }));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (onSelectedRowKeys) => setSelectedRowKeys(onSelectedRowKeys),
  };

  return {
    schema,
    data,
    selectedRowKeys,
    rowSelection,
    filters: moduleScreen === screen ? moduleFilters : filters,
    currentPage: moduleScreen === screen ? module.pagination?.current : 1,
    isLoading,
    fetchData: getTableData,
    getTableSchema,
    deleteRecord,
  };
};

export default useTableHook;

const columnPropertiesUpdator = (columns = []) => {
  columns = columns.map((key) => {
    return {
      ...key,
      render: (_, record) => {
        if (!record[key.key]) return <></>;

        // const lines = record[key.key].split("\n");
        const lines = record[key.key];

        // const lines =
        //   key.key !== "control_id"
        //     ? record[key.key]
        //     : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

        let linesLen = Array.isArray(lines) ? lines[0]?.length : lines?.length;
        const cellStyle = {
          minWidth: `${
            linesLen * 5 < 80 ? 80 : linesLen * 3 <= 400 ? linesLen * 3 : 400
          }px`,
          whiteSpace: "normal",
          maxWidth: "inherit",
        };

        if (linesLen * 3 > 400) {
          cellStyle.overflow = "hidden";
          cellStyle.whiteSpace = "nowrap";
          cellStyle.textOverflow = "ellipsis";
          cellStyle.wordBreak = "keep-all";
          cellStyle.maxWidth = "400px";
        }

        let cellValClasses = "";
        if (key?.isColorful) cellValClasses = colColorSwitcher(lines);

        return Array.isArray(lines) ? (
          <ul style={cellStyle}>
            {lines.map((line, index) =>
              line?.toString()?.trim() ? (
                <>
                  <li key={index + "_cell_list"}>{line}</li>{" "}
                </>
              ) : null
            )}
          </ul>
        ) : (
          <p className={cellValClasses} style={cellStyle}>
            {lines}
          </p>
        );
      },
    };
  });
  return columns;
};

const colColorSwitcher = (caseValue) => {
  let colorClass = "";
  switch (caseValue) {
    case "Compliant":
    case "Low":
      colorClass = "text-compliant";
      break;

    case "Partially Compliant":
    case "Medium":
      colorClass = "text-partial-comliant";
      break;

    case "Non-Compliant":
    case "High":
      colorClass = "text-non-compliant";
      break;

    case "Critical":
      colorClass = "text-violet";
      break;

    default:
      break;
  }

  return colorClass;
};
