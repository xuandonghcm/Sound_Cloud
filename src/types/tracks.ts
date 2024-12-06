
interface IUploaderResponse {
    _id: string;
    email: string;
    name: string;
    role: string;
    type: string;
}

interface ITrackTopResponse {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    uploader: IUploaderResponse;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface IGetTopTracksByCategoriesRequest {
    category?: string;
    limit: number
}