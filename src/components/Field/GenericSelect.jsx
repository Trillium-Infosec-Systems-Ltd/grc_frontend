import React, { useEffect, useState, useMemo } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { callApi } from '../../axios/callApi';
import { APIS } from '../../constants/api.constants';

const GenericSelect = ({
  field,
  mode = undefined,
  ...rest
}) => {
  const { link_to, options: dropdownOptions, label, fieldtype } = field;

  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchOptions = async (search = '') => {
    setFetching(true);
    try {
      let payload = { ...APIS.LINK_OPTIONS };
      payload.PARAMS.QUERY.document_type = link_to ?? '';
      // payload.PARAMS.QUERY.field = field?.fieldname ?? '';
      // payload.PARAMS.QUERY.document_type = 'assets';
      payload.PARAMS.QUERY.field = '';
      payload.PARAMS.QUERY.search_term = search ?? '';

      const res = await callApi(payload);
      setOptions(res ?? []);
    } catch (err) {
      console.error('Select search error', err);
    } finally {
      setFetching(false);
    }
  };

  const debounceFetcher = useMemo(() => debounce(fetchOptions, 400), []);

  useEffect(() => {
    if (Array.isArray(dropdownOptions) && fieldtype === 'Select') {
      setOptions(dropdownOptions?.map((opt) => ({ label: opt ?? '', value: opt ?? '' })) ?? []);
    }
    else if (link_to) {
      fetchOptions();
    }
  }, []);

  return (
    <Select
      showSearch
      mode={mode}
      {...rest}
      onSearch={debounceFetcher}
      placeholder={`Select ${label}`}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
    />
  );
};

export default GenericSelect;
