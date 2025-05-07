import { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';
import { KEY } from '../constants/keys.constants';

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

    const tSchema = await callApi({
      ...APIS.TABLE_SCHEMA,
      URL: APIS.TABLE_SCHEMA.URL + screen,
    });

    await getTableData(0, 10, tSchema ?? {})
  }, [screen]);

  const getTableData = useCallback(async (skip = 0, limit = 10, tschema = {}) => {
    setIsLoaing(true);

    const result = await callApi({
      ...APIS.GET_RECORDS,
      URL: APIS.GET_RECORDS.URL + screen,
      PARAMS: {
        QUERY: { skip, limit },
      },
    });


    setStateRef(prev => ({ ...prev, data: result ?? {}, schema: tschema ?? {} }));
    setIsLoaing(false);
  }, [screen]);

  return [schema, data, isLoading, getTableData];
};

export default useTableHook;
