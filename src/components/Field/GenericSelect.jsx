import React, { useEffect, useState, useMemo } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { callApi } from '../../axios/callApi';

const GenericSelect = ({
  field,
  mode = undefined,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchOptions = async (search = '') => {
    setFetching(true);
    try {
      const res = await callApi({
        URL: `/search/${field.link_to}`,
        METHOD: 'GET',
        SERVER: 'private',
        PAYLOAD: { query: search },
      });
      const results = res?.results || [];
      setOptions(
        results.map((opt) => ({
          label: opt?.name || opt?.label || opt?.value,
          value: opt?.id || opt?.value,
        }))
      );
    } catch (err) {
      console.error('Select search error', err);
    } finally {
      setFetching(false);
    }
  };

  const debounceFetcher = useMemo(() => debounce(fetchOptions, 400), []);

  useEffect(() => {
    if (field.options?.length) {
      setOptions(field.options.map((opt) => ({ label: opt, value: opt })));
    } 
    // else if (field.link_to) {
    //   fetchOptions();
    // }
  }, []);

  return (
    <Select
      showSearch
      value={value}
      mode={mode}
      labelInValue={false}
      filterOption={false}
      onSearch={debounceFetcher}
      onChange={onChange}
      placeholder={`Select ${field.label}`}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
    />
  );
};

export default GenericSelect;
