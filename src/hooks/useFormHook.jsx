import { useCallback, useEffect, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { isNotNullOrEmpty } from "../utils/utils";
import { message, Modal, notification } from "antd";
import { KEY } from "../constants/keysConstants";
import { useLocation, useNavigate } from "react-router-dom";

const useFormHook = (screen, MODE = KEY.CREATE) => {
  const navigate = useNavigate();
  const location = useLocation();
  const record_id = location?.state?.id ?? null;

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

  // const getFormSchema = useCallback(async () => {
  //   setIsLoaing(true)
  //   const result = await callApi({ ...APIS.FORM_SCHEMA, URL: APIS.FORM_SCHEMA.URL + screen });
  //   setForm(result?.data ?? {});
  //   if (MODE === KEY.EDIT) {
  //     await getFormData()
  //     return;
  //   }
  //   setIsLoaing(false)
  // }, [screen]);

  // const getFormData = useCallback(async () => {
  //   setIsLoaing(true)
  //   const result = await callApi({ ...APIS.GET_RECORDS, URL: APIS.GET_RECORDS.URL + screen + '/' + record_id });
  //   setData(result?.data ?? {});
  //   setIsLoaing(false)
  // }, [screen, record_id]);

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
      ...(MODE === KEY.EDIT ? APIS.UPDATE_RECORD : APIS.CREATE_RECORD),
    };
    payload.URL =
      MODE === KEY.EDIT
        ? payload.URL + screen + "/" + record_id
        : payload.URL + screen;
    payload.PAYLOAD = data ?? {};

    let result = await callApi(payload);

    if (result?.status === 200) {
      if (isNotNullOrEmpty(redirect)) {
        navigate(redirect);
      }

      // notification.success({ message: 'Record saved successfully' })

      // Modal.success({
      //   title: 'Success',
      //   content: 'Record saved successfully',
      //   onOk() {
      //   },
      // });
    } else {
      message.error(
        result?.response?.data?.detail ||
          err?.message ||
          "Failed to save record"
      );
    }
  };

  return [schema, isLoading, initialData, submit];
};

export default useFormHook;

const uploadAttachment = async (files) => {
  try {
    // setIsLoaing(true);

    let formData = new FormData();
    // formData.append('files', files)
    files.forEach((file) => {
      formData.append("files", file);
    });

    let payload = { ...APIS.UPLOAD };
    payload.PAYLOAD = formData ?? {};

    let result = await callApi(payload);

    return result;
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Failed to save record");
  } finally {
    // setIsLoaing(false);
  }
};
