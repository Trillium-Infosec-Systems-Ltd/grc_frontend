import { AuthAPI, privateAPI, PublicAPI, FormDataAPI } from './index';
import { API_METHOD } from '../constants/api.constants';
import { isNotNullOrEmpty } from '../utils/utils';

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
  let finalUrl = URL;

  if (isNotNullOrEmpty(PARAMS?.PATH)) {
    Object.keys(PARAMS.PATH).forEach((key) => {
      const value = PARAMS.PATH[key];
      finalUrl = finalUrl.replace(`:${key}`, value);
    });
  }

  let headers = {
    ...HEADERS,
    'Content-Type': CONTENT_TYPE,
  }

  try {
    let response;

    switch (METHOD.toUpperCase()) {
      case API_METHOD.GET:
        response = await client.get(finalUrl, { params: PARAMS?.QUERY ?? {}, headers });
        break;

      case API_METHOD.POST:
        response = await client.post(finalUrl, PAYLOAD, { params: PARAMS?.QUERY ?? {}, headers });
        break;

      case API_METHOD.PUT:
        response = await client.put(finalUrl, PAYLOAD, { params: PARAMS?.QUERY ?? {}, headers });
        break;

      case API_METHOD.DELETE:
        response = await client.delete(finalUrl, {
          data: PAYLOAD,
          headers,
          params: PARAMS?.QUERY ?? {},
        });
        break;

      default:
        throw new Error(`Unsupported method: ${METHOD}`);
    }

    return response;
  } catch (err) {
    console.error(`[callApi] ${METHOD} ${finalUrl} failed:`, err);
    // throw err;
    return err;
  }
};
