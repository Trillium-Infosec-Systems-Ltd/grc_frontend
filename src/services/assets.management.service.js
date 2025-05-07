import { callApi } from "../axios/callApi"
import { APIS } from "../constants/api.constants"
import { KEY } from "../constants/keys.constants";
import { ROUTES } from "../constants/routes.constants";
import { isNotNullOrEmpty } from "../utils/utils";

export const getAssetsList = async ({ setter }) => {
    let payload = { ...APIS.GET_RECORDS };
    payload.URL = payload.URL + 'assets';

    setter(prev => ({ ...prev, isLoading: true }))

    const result = await callApi(payload)
    setter(prev => ({ ...prev, isLoading: false, assets: result ?? [] }))
}

export const createAsset = async (data = {}, navigate = null, MODE) => {
    let payload = { ...(MODE === KEY.EDIT ? APIS.UPDATE_RECORD : APIS.CREATE_RECORD) };
    payload.URL = MODE === KEY.EDIT ? payload.URL + 'assets/' + data?.id : payload.URL + 'assets';
    payload.PAYLOAD = data ?? {};

    let result = await callApi(payload)

    if (isNotNullOrEmpty(navigate) && isNotNullOrEmpty(result)) {
        navigate(ROUTES.PRIVATE.ASSETS.PARENT)
    }

    return isNotNullOrEmpty(result) ? { ...result, message: 'Assets saved successfully' } : { ...result, id: null, message: 'Failed to save record' };

}