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
  const { link_to, options: dropdownOptions, label, fieldtype, target_field = '' } = field;

  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchOptions = async (search = '') => {
    setFetching(true);
    try {
      let payload = { ...APIS.LINK_OPTIONS };
      payload.PARAMS.QUERY.document_type = link_to ?? '';
      // payload.PARAMS.QUERY.field = field?.fieldname ?? '';
      // payload.PARAMS.QUERY.document_type = 'assets';
      payload.PARAMS.QUERY.field = target_field ?? '';
      payload.PARAMS.QUERY.search_term = search ?? '';

      const res = await callApi(payload);
      setOptions(res?.data ?? []);
    } catch (err) {
      console.error('Select search error', err);
    } finally {
      setFetching(false);
    }
  };

  const debounceFetcher = useMemo(() => debounce(fetchOptions, 400), []);

  useEffect(() => {
    if (Array.isArray(dropdownOptions)) {
      setOptions(dropdownOptions?.map((opt) => ({ label: opt ?? '', value: opt ?? '' })) ?? []);
    }
    else if (link_to) {
      fetchOptions();
    }
  }, []);

  return (
    <Select
      loading={fetching}
      showSearch
      mode={mode}
      {...rest}
      onSearch={link_to ? debounceFetcher : undefined}
      placeholder={`Select ${label}`}
      filterOption={link_to ? false : true}
      options={options && options.length > 0 ? options : []}
    />
  );
};

export default GenericSelect;
