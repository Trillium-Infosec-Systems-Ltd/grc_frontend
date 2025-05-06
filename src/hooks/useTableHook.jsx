import { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';
import { KEY } from '../constants/keys.constants';

const useTableHook = (screen, MODE = KEY.VIEW) => {
  const [isLoading, setIsLoaing] = useState(false);
  const [stateRef, setStateRef] = useState({
    data: {},
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

    await getTableData(tSchema ?? {})
  }, [screen]);

  const getTableData = useCallback(async (tschema = {}) => {
    setIsLoaing(true);

    const result = await callApi({
      ...APIS.GET_RECORDS,
      URL: APIS.GET_RECORDS.URL + screen,
    });


    setStateRef(prev => ({ ...prev, data: result ?? {}, schema: tschema ?? {} }));
    setIsLoaing(false);
  }, [screen]);

  return [schema, data, isLoading];
};

export default useTableHook;
