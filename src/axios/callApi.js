import { AuthAPI, privateAPI, PublicAPI, FormDataAPI } from './index';
import { API_METHOD } from '../constants/api.constants';

const getClientByType = (type = 'public', contentType = 'application/json') => {
  switch (type) {
    case 'auth':
      return AuthAPI;
    case 'private':
      return privateAPI;
    case 'formData':
      return FormDataAPI;
    default:
      return PublicAPI;
  }
};

export const callApi = async (schema) => {
  const {
    URL,
    METHOD = API_METHOD.GET,
    SERVER = 'public',
    HEADERS = {},
    CONTENT_TYPE = 'application/json',
    PAYLOAD = {},
    PARAMS = {},
  } = schema;

  const client = getClientByType(SERVER, CONTENT_TYPE);

  try {
    let response;

    switch (METHOD.toUpperCase()) {
      case API_METHOD.GET:
        response = await client.get(URL, { params: PARAMS?.QUERY ?? {}, headers: HEADERS });
        break;

      case API_METHOD.POST:
        response = await client.post(URL, PAYLOAD, { params: PARAMS?.QUERY ?? {}, headers: HEADERS });
        break;

      case API_METHOD.PUT:
        response = await client.put(URL, PAYLOAD, { params: PARAMS?.QUERY ?? {}, headers: HEADERS });
        break;

      case API_METHOD.DELETE:
        response = await client.delete(URL, {
          data: PAYLOAD,
          headers: HEADERS,
          params: PARAMS?.QUERY ?? {},
        });
        break;

      default:
        throw new Error(`Unsupported method: ${METHOD}`);
    }

    return response.data;
  } catch (err) {
    console.error(`[callApi] ${METHOD} ${URL} failed:`, err);
    // throw err;
    return err;
  }
};
