
export interface IRequest {
    getfile?: boolean;
    endpoint: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
    responseType?: string;
}

export interface IResponseFromServer<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export type FetchError = {
    message: string; // Mô tả lỗi
    statusCode: number; // Mã trạng thái HTTP
    error?: string; // Chi tiết lỗi (nếu có)
    digest?: string; // Dấu vết duy nhất hoặc mã tham chiếu lỗi
};

