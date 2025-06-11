import { useCallback, useEffect, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { KEY } from "../constants/keysConstants";

const useTableHook = (screen, MODE = KEY.VIEW) => {
  const [isLoading, setIsLoaing] = useState(false);
  const [stateRef, setStateRef] = useState({
    data: { total: 0, skip: 0, limit: 10, items: [] },
    schema: {},
  });

  const { schema, data } = stateRef ?? {};

  useEffect(() => {
    getTableSchema();
  }, [screen]);

  const getTableSchema = useCallback(async () => {
    setIsLoaing(true);

    const result = await callApi({
      ...APIS.TABLE_SCHEMA,
      URL: APIS.TABLE_SCHEMA.URL + screen,
    });

    const { data: tSchema = {} } = result;

    await getTableData(0, 10, tSchema ?? {});
  }, [screen]);

  const getTableData = useCallback(
    async (skip = 0, limit = 10, tschema = {}) => {
      setIsLoaing(true);

      const result = await callApi({
        ...APIS.GET_RECORDS,
        URL: APIS.GET_RECORDS.URL + screen,
        PARAMS: {
          QUERY: { skip, limit },
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
        data,
        schema: { ...tschema, columns: newColumns } ?? {},
      }));
      setIsLoaing(false);
    },
    [screen]
  );

  return [schema, data, isLoading, getTableData];
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

        let linesLen = Array.isArray(lines) ? lines[0].length : lines.length;
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

        return Array.isArray(lines) ? (
          <ul style={cellStyle}>
            {lines.map((line, index) =>
              line.trim() ? (
                <>
                  <li key={index}>{line}</li>{" "}
                </>
              ) : null
            )}
          </ul>
        ) : (
          <p style={cellStyle}>{lines}</p>
        );
      },
    };
  });
  return columns;
};
