import React, { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';
import { isNotNullOrEmpty } from '../utils/utils';
import { message } from 'antd';
import { KEY } from '../constants/keys.constants';
import { useLocation, useNavigate } from 'react-router-dom';

const useFormHook = (screen, MODE = KEY.CREATE) => {
  const navigate = useNavigate()
  const location = useLocation();
  const record_id = location?.state?.id ?? null;

  const [isLoading, setIsLoaing] = useState(false);
  const [schema, setForm] = useState({});
  const [initialData, setData] = useState({});

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

  const submit = async (data = {}, redirect) => {
    try {
      setIsLoaing(true);

      let payload = { ...(MODE === KEY.EDIT ? APIS.UPDATE_RECORD : APIS.CREATE_RECORD) };
      payload.URL = MODE === KEY.EDIT ? payload.URL + screen + '/' + data?.id : payload.URL + screen;
      payload.PAYLOAD = data ?? {};

      let result = await callApi(payload)

      if (result?.status === 200) {
        message.success('Record saved successfully');
        if (isNotNullOrEmpty(redirect)) {
          navigate(redirect)
        }
      } else {
        message.error(result?.response?.data?.detail || err?.message || 'Failed to save record')
      }


      // if (isNotNullOrEmpty(navigate) && isNotNullOrEmpty(result)) {
      //   navigate(redirect)
      // }

      // let resp = await callback();
      // if (isNotNullOrEmpty(resp) && isNotNullOrEmpty(resp?.id)) {
      //   message.success(resp?.message || 'Record saved successfully');
      // } else {
      //   message.error(resp?.message || 'Failed to save record');
      // }
      // return result
    } catch (err) {
      console.error('Submit error:', err);
      message.error('Failed to save record');
    } finally {
      setIsLoaing(false);
    }
  }

  return [schema, isLoading, initialData, submit];
};

export default useFormHook;
