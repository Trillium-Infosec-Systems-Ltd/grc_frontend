import { useEffect, useState, useMemo } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { callApi } from "../../axios/callApi";
import { APIS } from "../../constants/apiConstants";
import { isNotNullOrEmpty, isNullOrEmpty } from "../../utils/utils";

const GenericSelect = ({ field, mode = undefined, ...rest }) => {

  const {
    link_to,
    options: dropdownOptions,
    label,
    fieldtype,
    target_field = "",
    fieldname = "",
    isFetchingData = false,
    fetch_to = null,
  } = field;

  const { screen = "", value = "", form } = rest;

  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchOptions = async (search = "", filters = null) => {
    setFetching(true);
    try {
      const optList = await callFilterOptionAPi(search);
      if (isNullOrEmpty(filters)) {
        setOptions(optList ?? []);
      } else {
        const newOptList = await callFilterOptionAPi("", filters);
        setOptions([...(newOptList ?? []), ...(optList ?? [])]);
      }
    } catch (err) {
      console.error("Select search error", err);
    } finally {
      setFetching(false);
    }
  };

  const callFilterOptionAPi = async (search = "", filters = null) => {
    try {
      let payload = { ...APIS.LINK_OPTIONS };
      payload.PARAMS.QUERY.document_type = link_to ?? "";
      payload.PARAMS.QUERY.filters = isNullOrEmpty(filters)
        ? null
        : JSON.stringify(filters);
      payload.PARAMS.QUERY.field = target_field ?? "";
      payload.PARAMS.QUERY.search_term = search ?? "";

      const res = await callApi(payload);
      return res?.data ?? [];
    } catch (err) {
      console.error("Select search error", err);
    }
  };

  const debounceFetcher = useMemo(() => debounce(fetchOptions, 400), []);

  useEffect(() => {
    if (Array.isArray(dropdownOptions)) {
      setOptions(
        dropdownOptions?.map((opt) => ({
          label: opt ?? "",
          value: opt ?? "",
        })) ?? []
      );
      // } else if (link_to && isNotNullOrEmpty(value)) {
    } else if (link_to) {
      fetchOptions("", isNullOrEmpty(value) ? null : { id: value });
      // fetchOptions();
    }
  }, [value]);

  useEffect(() => {
    if (isFetchingData && isNotNullOrEmpty(value) && isNullOrEmpty(fetch_to)) {
      fetchDataByValue();
    }
  }, [value, fieldname]);

  const fetchDataByValue = async () => {
    if (screen === "risks") {
      if (fieldname === "associated_assets") {
        try {
          let payload = { ...APIS.ASSETS_INFO };
          payload.URL = payload.URL + value ?? "";

          const res = await callApi(payload);

          // const { asset_type = "", asset_value = "" } = res?.data ?? {};

          for (let key of Object.keys(res?.data ?? {})) {
            form.setFieldValue(key, res?.data[key]);
          }

          // form.setFieldValue("type", asset_type);
          // form.setFieldValue("asset_value", asset_value);

          console.log({ res });

          // setOptions(res?.data ?? []);
        } catch (err) {
          console.error("Select search error", err);
        }
      }
    }
  };

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
