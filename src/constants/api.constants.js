export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const APIS = {
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
};
