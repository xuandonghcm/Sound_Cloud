
import { IRequest } from '@/types/backend';
import { BACKEND_URL } from '@/types/service';
import queryString from 'query-string';

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
    let {
        endpoint,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {},
    } = props;

    let url = `${BACKEND_URL}${endpoint}`;
    const options: any = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption,
    };

    if (useCredentials) options.credentials = "include";

    if (Object.keys(queryParams).length > 0) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // Timeout 10 giây
    options.signal = controller.signal;

    try {
        const response = await fetch(url, options);
        clearTimeout(timeout);

        if (response.ok) {
            return (await response.json()) as T;
        } else {
            const errorData = await response.json();
            const error = {
                statusCode: response.status,
                message: errorData?.message || 'Đã xảy ra lỗi không xác định.',
                error: errorData?.error || '',
            };
            throw error;
        }
    } catch (error: any) {
        clearTimeout(timeout);

        // Kiểm tra lỗi timeout
        if (error.name === 'AbortError') {
            showSnackbar('Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.', 'error');
        } else {
            const message =
                error?.message || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
            showSnackbar(message, 'error');
        }

        // Vẫn ném lỗi để xử lý tiếp ở nơi gọi
        throw error;
    }
};

function showSnackbar(arg0: string, arg1: string) {
    throw new Error('Function not implemented.');
}
