
import { IRequest, IResponseFromServer } from '@/types/backend';
import { ABORT_ERROR, BACKEND_URL, TIMEOUT_REQUEST_MESSAGE, TIMEOUT_REQUEST_SERVER } from '@/constants/PathConstants';
import queryString from 'query-string';
import { UNKNOWN_ERROR } from '@/constants/GlobalConstants';


export const sendRequest = async <T>(props: IRequest): Promise<T> => {

    //const { showAlertDialog } = useAlertDialog();

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
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_REQUEST_SERVER);
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
                message: errorData?.message || UNKNOWN_ERROR,
                error: errorData?.error || '',
            } as T;
            throw error;
        }
    } catch (error: any) {
        clearTimeout(timeout);
        let messageError = '';
        // Kiểm tra lỗi timeout
        if (error.name === ABORT_ERROR) {
            messageError = TIMEOUT_REQUEST_MESSAGE;
        } else {
            messageError =
                error?.message || UNKNOWN_ERROR;
        }

        const backendError = {
            message: messageError,
            statusCode: error?.statusCode || 500, // Thêm statusCode nếu cần
            error: error?.error
        }
        throw backendError;
    }
};

