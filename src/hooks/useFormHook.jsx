import React, { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';
import { isNotNullOrEmpty } from '../utils/utils';
import { message } from 'antd';
import { KEY } from '../constants/keys.constants';
import { useLocation } from 'react-router-dom';

const useFormHook = (screen, MODE = KEY.VIEW) => {
  const location = useLocation();
  const record_id = location?.state?.id ?? null;

  const [isLoading, setIsLoaing] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    getFormSchema();
  }, [screen]);

  const getFormSchema = useCallback(async () => {
    setIsLoaing(true)
    const result = await callApi({ ...APIS.FORM_SCHEMA, URL: APIS.FORM_SCHEMA.URL + screen });
    setForm(result);
    if (MODE === KEY.EDIT) {
      await getFormData()
      return;
    }
    setIsLoaing(false)
  }, [screen]);

  const getFormData = useCallback(async () => {
    setIsLoaing(true)
    const result = await callApi({ ...APIS.GET_RECORDS, URL: APIS.GET_RECORDS.URL + screen + '/' + record_id });
    setData(result);
    setIsLoaing(false)
  }, [screen, record_id]);

  const submit = async (callback) => {
    if (typeof callback === 'function' && isNotNullOrEmpty(callback)) {
      try {
        setIsLoaing(true);
        let resp = await callback();
        if (isNotNullOrEmpty(resp) && isNotNullOrEmpty(resp?.id)) {
          message.success(resp?.message || 'Record saved successfully');
        } else {
          message.error(resp?.message || 'Failed to save record');
        }
        return result
      } catch (err) {
        console.error('Submit error:', err);
        message.error('Failed to save record');
      } finally {
        setIsLoaing(false);
      }
    }
  };

  return [form, isLoading, data, submit];
};

export default useFormHook;
