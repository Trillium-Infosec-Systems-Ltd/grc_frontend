import React, { useCallback, useEffect, useState } from 'react';
import { callApi } from '../axios/callApi';
import { APIS } from '../constants/api.constants';

const useFormHook = (formUrl) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    getFormSchema();
  }, [formUrl]);

  const getFormSchema = useCallback(async () => {
    const result = await callApi({ ...APIS.FORM_SCHEMA, URL: formUrl });
    setForm(result);
  }, [formUrl]);

  return [form];
};

export default useFormHook;
