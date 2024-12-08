import { IResponseFromServer } from "@/types/backend";
import { sendRequest } from "./apiWrapper";
import { GET_TOP_TRACKS_BY_CATEGORIES } from "@/constants/service.Constants";


export const getTopTracksByCategories = async (param: IGetTopTracksByCategoriesRequest) => {
    const res = await sendRequest<IResponseFromServer<ITrackTopResponse>>({
        endpoint: GET_TOP_TRACKS_BY_CATEGORIES,
        method: 'POST',
        body: param

    })
    const data = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
    return { ...res, data };
}


