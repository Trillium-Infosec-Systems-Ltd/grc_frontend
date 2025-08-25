import React, { useEffect, useState, useMemo } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { callApi } from "../../axios/callApi";
import { APIS } from "../../constants/apiConstants";
import { isNotNullOrEmpty, isNullOrEmpty } from "../../utils/utils";

const GenericSelect = ({ field, mode = undefined, ...rest }) => {
  // console.log({ rest });

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

  const fetchOptions = async (search = "") => {
    setFetching(true);
    try {
      let payload = { ...APIS.LINK_OPTIONS };
      payload.PARAMS.QUERY.document_type = link_to ?? "";
      // payload.PARAMS.QUERY.field = field?.fieldname ?? '';
      // payload.PARAMS.QUERY.document_type = 'assets';
      payload.PARAMS.QUERY.field = target_field ?? "";
      payload.PARAMS.QUERY.search_term = search ?? "";

      const res = await callApi(payload);
      setOptions(res?.data ?? []);
    } catch (err) {
      console.error("Select search error", err);
    } finally {
      setFetching(false);
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
    } else if (link_to) {
      fetchOptions();
    }
  }, []);

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
      // else if (fieldname === "associated_threats") {
      //   try {
      //     let payload = { ...APIS.THREAT_INFO };
      //     payload.URL = payload.URL + value ?? "";
      //     payload.PARAMS.QUERY.asset_value =
      //       form.getFieldValue("asset_value") ?? "";

      //     const res = await callApi(payload);

      //     const {
      //       likelihood = "",
      //       vulnerabilities = "",
      //       control_id = "",
      //       ease_of_exploitation = "",
      //       risk = "",
      //     } = res?.data ?? {};

      //     form.setFieldValue("threat_probability", likelihood);
      //     form.setFieldValue("ease_of_exploitation", ease_of_exploitation);
      //     form.setFieldValue("related_vulnerabilities", vulnerabilities);
      //     form.setFieldValue("control_ids", control_id);
      //     form.setFieldValue("residual_risk", risk);
      //   } catch (err) {
      //     console.error("Select search error", err);
      //   }
      // }
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
