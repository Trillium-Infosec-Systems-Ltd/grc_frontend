import { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';
import { KEY } from '../constants/keys.constants';

const useTableHook = (screen, MODE = KEY.VIEW) => {
  const [isLoading, setIsLoaing] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTableData();
  }, [screen]);

  const getTableData = useCallback(async () => {
    setIsLoaing(true);

    const result = await callApi({
      ...APIS.GET_RECORDS,
      URL: APIS.GET_RECORDS.URL + screen,
    });
    setData(result ?? []);
    setIsLoaing(false);
  }, [screen]);

  return [data, isLoading];
};

export default useTableHook;
