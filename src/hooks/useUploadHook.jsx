import { useCallback, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { PublicAPI } from "../axios";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";

const useUploadHook = (screen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploadingErrors, setUploadingErrors] = useState({
    error: false,
    errorDetail: {},
  });

  const {error, errorDetail} = uploadingErrors;

  const downloadTemplate = useCallback(
    async (endpointStr = "CSV_TEMPLATE") => {
      if (isNullOrEmpty(screen)) return;
      try {
        let targetUrl = APIS[endpointStr]?.URL;
        if (isNullOrEmpty(targetUrl)) return;

        setLoading(true);

        let resp = await PublicAPI.get(targetUrl + screen, {
          responseType: "blob",
        });

        const blob = resp.data;

        const url = window.URL.createObjectURL(blob);
        const disposition = resp.headers["content-disposition"] || "";
        let filename = screen;
        const match = disposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"']+)/i
        );
        if (match?.[1]) {
          filename = decodeURIComponent(match[1]);
        }

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (err) {
        console.error("Download failed:", err);
        message.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [screen]
  );

  const uploadCSVData = useCallback(
    async (files = null) => {
      if (isNullOrEmpty(screen) || isNullOrEmpty(files)) return;
      setLoading(true);
      try {
        let payload = { ...APIS.UPLOAD_BULK };
        payload.PARAMS.PATH.screen = screen;
        let resp = await uploadAttachment(files, "file", payload);
        const { status, data } = resp || {};
        if (status === 200) {
          if(isNotNullOrEmpty(data?.errors) && data?.failed_count > 0){
            setUploadingErrors({error: true, errorDetail: data})
            return false
          } else {
            setUploadingErrors({error: false, errorDetail: {}})
            return true;
          }
          // message.success(`${screen} uploaded successfully!`);
        } else {
          message.error(data?.detail || "Upload failed");
          return false;
        }
      } catch (err) {
        console.error("Download failed:", err);
        message.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [screen]
  );

  const uploadAttachment = async (
    files,
    key = "files",
    payloadContent = null,
    targetEndpoint = "UPLOAD"
  ) => {
    try {
      // setIsLoaing(true);

      let formData = new FormData();
      // formData.append('files', files)
      files.forEach((file) => {
        formData.append(key, file);
      });

      let payload = isNullOrEmpty(payloadContent)
        ? { ...APIS?.[targetEndpoint] }
        : { ...payloadContent };
      if (isNullOrEmpty(payload)) return;
      payload.PAYLOAD = formData ?? {};

      let result = await callApi(payload);

      return result;
    } catch (err) {
      console.error("Submit error:", err);
      message.error(err?.message || "Failed to upload attachemnt");
    } finally {
      // setIsLoaing(false);
    }
  };

  return {
    loading,
    error,
    errorDetail,
    template: downloadTemplate,
    uploadAttachment,
    uploadBulk: uploadCSVData,
    resetError: () => setUploadingErrors({error: false, errorDetail: {}}),
  };
};

export default useUploadHook;
