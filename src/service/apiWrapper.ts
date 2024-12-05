
import { IRequest } from '@/types/backend';
import { BACKEND_URL, TIMEOUT_REQUEST_MESSAGE, TIMEOUT_REQUEST_SERVER } from '@/constants/service';
import queryString from 'query-string';
import { AlertMessageType, AlertType, ERROR, UNKNOWN_ERROR } from '@/constants/globalConstants';
import { useHasMounted } from '@/utils/customHooks';
import { useAlertDialog } from '@/context/AlertDialogContext';

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
            };
            throw error;
        }
    } catch (error: any) {
        clearTimeout(timeout);
        let messageError = '';
        // Kiểm tra lỗi timeout
        if (error.name === 'AbortError') {
            // if (hasMounted) {
            //     showAlertDialog({
            //         title: ERROR,
            //         message: TIMEOUT_REQUEST_MESSAGE || UNKNOWN_ERROR,
            //         alertType: AlertType.Info,
            //         messageType: AlertMessageType.Error
            //     });
            // }
            messageError = TIMEOUT_REQUEST_MESSAGE;
        } else {
            messageError =
                error?.message || UNKNOWN_ERROR;
            // if (hasMounted) {
            //     showAlertDialog({
            //         title: ERROR,
            //         message: message,
            //         alertType: AlertType.Info,
            //         messageType: AlertMessageType.Error
            //     });
            // }
        }

        console.log("messageError>>>>>>>>>>>", messageError);
        throw error;
    }
};

