import { useCallback, useEffect, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";
import { message } from "antd";
import { KEY } from "../constants/keysConstants";
import { useLocation, useNavigate } from "react-router-dom";
import useUploadHook from "./useUploadHook";

const useFormHook = (screen, MODE = KEY.CREATE) => {
  const navigate = useNavigate();
  const location = useLocation();
  const record_id = location?.state?.id ?? null;

  const { uploadAttachment } = useUploadHook(null);

  const [isLoading, setIsLoaing] = useState(false);
  const [schema, setForm] = useState({});
  const [initialData, setData] = useState({});

  useEffect(() => {
    getFormSchema();
  }, [screen]);

  const getFormSchema = useCallback(async () => {
    setIsLoaing(true);
    let result = null;

    if (MODE === KEY.EDIT) {
      result = await callApi({
        ...APIS.FORM_SCHEMA,
        URL: APIS.FORM_SCHEMA.URL + screen + "/" + record_id,
      });
    } else {
      result = await callApi({
        ...APIS.FORM_SCHEMA,
        URL: APIS.FORM_SCHEMA.URL + screen,
      });
    }

    if (result.status === 200) {
      const { data = [] } = result;
      let initial = {};

      for (let field of data?.fields ?? []) {
        const { fieldname, default_value, default: initialVal } = field;
        initial[fieldname] = default_value ?? initialVal;
      }
      setForm(data ?? {});
      setData(initial ?? {});
    }

    setIsLoaing(false);
  }, [screen]);

  const submit = async (data = {}, redirect) => {
    try {
      setIsLoaing(true);

      const newData = { ...data };

      let fileField = schema?.fields?.find(
        (field) => field?.fieldtype === "File"
      );

      if (fileField) {
        newData[fileField.fieldname] = newData[fileField.fieldname]
          ?.filter((file) => file?.status === "uploaded")
          ?.map((file) => file.name);
      }

      if (fileField && data?.fileList.length !== 0) {
        let attachmentResult = await uploadAttachment(data?.fileList);

        if (attachmentResult.status === 200) {
          delete newData.fileList;
          newData[fileField.fieldname] = [
            ...newData[fileField.fieldname],
            ...(attachmentResult?.data?.uploaded_paths ?? []),
          ];

          saveRecordHandle(newData, redirect);
        }
      } else {
        delete newData.fileList;
        saveRecordHandle(newData, redirect);
      }
    } catch (err) {
      console.error("Submit error:", err);
      message.error("Failed to save record");
    } finally {
      setIsLoaing(false);
    }
  };

  const saveRecordHandle = async (data, redirect) => {
    let payload = {
      ...(MODE === KEY.EDIT
        ? screen?.toLowerCase() === "users"
          ? APIS.UPDATE_AUTH
          : APIS.UPDATE_RECORD
        : screen?.toLowerCase() === "users"
        ? APIS.POST_AUTH
        : APIS.CREATE_RECORD),
    };
    payload.URL =
      MODE === KEY.EDIT
        ? payload.URL + screen + "/" + record_id
        : payload.URL + screen;
    payload.PAYLOAD = data ?? {};

    let result = await callApi(payload);

    if (result?.status === 200) {
      message.success(
        result?.data?.msg ||
          `Record ${MODE === KEY.EDIT ? "updated" : "saved"} successfully`
      );
      // message.success(
      //   MODE === KEY.EDIT
      //     ? "Record updated successfully"
      //     : "Record saved successfully"
      // );
      if (isNotNullOrEmpty(redirect)) {
        navigate(redirect);
      }
    }
  };

  return [schema, isLoading, initialData, submit];
};

export default useFormHook;
