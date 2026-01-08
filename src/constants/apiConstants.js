export const API_CONTENT_TYPE = {
  MULTIPART: "multipart/form-data",
};

export const API_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const APIS = {
  CSV_EXPORT: {
    URL: "/export_csv/",
    METHOD: API_METHOD.GET,
    AUTH: true,
    SERVER: "private",
  },
  CSV_TEMPLATE: {
    URL: "/csv_template/",
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  TABLE_SCHEMA: {
    URL: "/table_meta/",
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  FORM_SCHEMA: {
    URL: "/schemas/",
    METHOD: API_METHOD.GET,
    AUTH: true,
    SERVER: "private",
  },
  GET_AUTH: {
    URL: "/auth/",
    METHOD: API_METHOD.GET,
    AUTH: true,
    SERVER: "private",
  },
  POST_AUTH: {
    URL: "/auth/",
    METHOD: API_METHOD.POST,
    AUTH: true,
    PAYLOAD: {},
    SERVER: "private",
  },
  UPDATE_AUTH: {
    URL: "/auth/",
    METHOD: API_METHOD.PUT,
    AUTH: true,
    PAYLOAD: {},
    SERVER: "private",
  },
  GET_RECORDS: {
    URL: "/data/",
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  CREATE_RECORD: {
    URL: "/data/",
    METHOD: API_METHOD.POST,
    AUTH: false,
    PAYLOAD: {},
  },
  UPDATE_RECORD: {
    URL: "/data/",
    METHOD: API_METHOD.PUT,
    AUTH: false,
    PAYLOAD: {},
  },
  CREATE_RECORD: {
    URL: "/data/",
    METHOD: API_METHOD.POST,
    AUTH: false,
    PAYLOAD: {},
  },
  UPDATE_RECORD: {
    URL: "/data/",
    METHOD: API_METHOD.PUT,
    AUTH: false,
    PAYLOAD: {},
  },
  DELETE_RECORD: {
    URL: "/data/:screen",
    METHOD: API_METHOD.DELETE,
    CONTENT_TYPE: API_CONTENT_TYPE.MULTIPART,
    PARAMS: {
      PATH: { screen: "" },
    },
    PAYLOAD: {},
  },
  ASSETS_INFO: {
    URL: "/assets_info/",
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  THREAT_INFO: {
    URL: "/threat_info/",
    METHOD: API_METHOD.GET,
    AUTH: false,
    PARAMS: {
      QUERY: { asset_value: "" },
    },
  },
  LINK_OPTIONS: {
    URL: "/link-options",
    METHOD: API_METHOD.GET,
    AUTH: false,
    PARAMS: {
      QUERY: {
        document_type: "",
        field: "",
        filters: null,
        search_term: "",
        offset: 0,
      },
    },
  },
  UPLOAD: {
    URL: "/upload_files",
    METHOD: API_METHOD.POST,
    CONTENT_TYPE: API_CONTENT_TYPE.MULTIPART,
    AUTH: false,
    SERVER: "formData",
  },
  UPLOAD_BULK: {
    URL: "/bulk_upload/:screen",
    METHOD: API_METHOD.POST,
    CONTENT_TYPE: API_CONTENT_TYPE.MULTIPART,
    AUTH: false,
    SERVER: "formData",
    PARAMS: {
      PATH: { screen: "" },
    },
  },
  DYNAMIC_CALL: {
    URL: "",
    METHOD: API_METHOD.GET,
    AUTH: false,
    PARAMS: {
      QUERY: {},
    },
  },
};
