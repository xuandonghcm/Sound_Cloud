
interface IUploader {
    _id: string;
    email: string;
    name: string;
    role: string;
    type: string;
}

interface ITrackTop {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    uploader: IUploader;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}