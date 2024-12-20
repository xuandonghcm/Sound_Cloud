import { IResponseFromServer } from "@/types/backend";
import { sendRequest } from "./apiWrapper";
import { GET_TOKEN_BY_SOCIAL_MEDIA, LOGIN } from "@/constants/service.Constants";
import { IResponseUSer, LoginRequest, SocialMediaAuthRequest } from "@/types/users";


export const getTokenBySocialMedia = async (param: SocialMediaAuthRequest) => {
    try {
        // Gửi yêu cầu tới server
        const res = await sendRequest<IResponseFromServer<IResponseUSer>>({
            endpoint: GET_TOKEN_BY_SOCIAL_MEDIA,
            method: 'POST',
            body: param,
        });

        return { ...res };
    } catch (error: any) {
        return {
            message: error?.message || 'An error occurred while fetching tracks',
            statusCode: error?.statusCode || 500,
            error: error?.error || 'Unknown error',
            data: undefined, // Không có dữ liệu
        };

    }
};

export const Login = async (param: LoginRequest) => {
    try {
        // Gửi yêu cầu tới server
        const res = await sendRequest<IResponseFromServer<IResponseUSer>>({
            endpoint: LOGIN,
            method: 'POST',
            body: param,
        });

        return { ...res };
    } catch (error: any) {
        return {
            message: error?.message || 'An error occurred while fetching tracks',
            statusCode: error?.statusCode || 500,
            error: error?.error || 'Unknown error',
            data: undefined, // Không có dữ liệu
        };

    }
};