import { FetchError, IResponseFromServer } from "@/types/backend";
import { sendRequest } from "./apiWrapper";
import { GET_TOP_TRACKS_BY_CATEGORIES } from "@/constants/service.Constants";


export const getTopTracksByCategories = async (param: IGetTopTracksByCategoriesRequest) => {
    try {
        // Gửi yêu cầu tới server
        const res = await sendRequest<IResponseFromServer<ITrackTopResponse>>({
            endpoint: GET_TOP_TRACKS_BY_CATEGORIES,
            method: 'POST',
            body: param,
        });

        // Xử lý dữ liệu trả về
        const data = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
        return { ...res, data };
    } catch (error: any) {
        return {
            message: error?.message || 'An error occurred while fetching tracks',
            statusCode: error?.statusCode || 500,
            error: error?.error || 'Unknown error',
            data: undefined, // Không có dữ liệu
        };

    }
};



