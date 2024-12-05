import { IBackendRes } from "@/types/backend";
import { sendRequest } from "./apiWrapper";
import { GET_TOP_TRACKS_BY_CATEGORIES } from "@/constants/endpoints";

const getTopTracksByCategories = () => {
    const res = sendRequest<IBackendRes<ITrackTop>>({
        endpoint: GET_TOP_TRACKS_BY_CATEGORIES,
        method: 'POST',
        body: {
            category: 'CHILL',
            limit: 1
        }
    })
    return res;
}
