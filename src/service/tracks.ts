import { IBackendRes } from "@/types/backend";
import { sendRequest } from "./apiWrapper";
import { GET_TOP_TRACKS_BY_CATEGORIES } from "@/constants/service";


export const getTopTracksByCategories = async (param: IGetTopTracksByCategoriesRequest) => {
    const res = await sendRequest<IBackendRes<ITrackTopResponse>>({
        endpoint: GET_TOP_TRACKS_BY_CATEGORIES,
        method: 'POST',
        body: param

    })

    return res.data;
}
