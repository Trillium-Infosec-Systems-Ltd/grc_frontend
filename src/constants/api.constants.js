export const API_CONTENT_TYPE = {
  MULTIPART: 'multipart/form-data',
};

export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const APIS = {
  TABLE_SCHEMA: {
    URL: '/table_meta/',
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  FORM_SCHEMA: {
    URL: '/schemas/',
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  GET_RECORDS: {
    URL: '/data/',
    METHOD: API_METHOD.GET,
    AUTH: false,
  },
  CREATE_RECORD: {
    URL: '/data/',
    METHOD: API_METHOD.POST,
    AUTH: false,
    PAYLOAD: {}
  },
  UPDATE_RECORD: {
    URL: '/data/',
    METHOD: API_METHOD.PUT,
    AUTH: false,
    PAYLOAD: {}
  },
  LINK_OPTIONS: {
    URL: '/link-options',
    METHOD: API_METHOD.GET,
    AUTH: false,
    PARAMS: {
      QUERY: { document_type: '', field: '', search_term: '', limit: 10, offset: 0 },
    }
  },
  UPLOAD: {
    URL: '/upload_files',
    METHOD: API_METHOD.POST,
    CONTENT_TYPE: API_CONTENT_TYPE.MULTIPART,
    AUTH: false,
  },
};
