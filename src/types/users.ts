
export interface IUSer {
    _id: string;
    username: string;
    email: string;
    isVerify: boolean;
    type: ITypeUSer;
    role: IRoleUSer;
    address?: string;
    name?: string;
    gender?: string;
}
export enum ITypeUSer {
    GITHUB = "GITHUB",
    GOOGLE = "GOOGLE",
    LOCAL = "LOCAL",
    FACEBOOK = "FACEBOOK"
}
export enum IRoleUSer {
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface IResponseUSer {
    access_token: string,
    refresh_token: string,
    user: Partial<IUSer>
}

export interface SocialMediaAuthRequest {
    type: ITypeUSer;
    username: string;
}
export interface LoginRequest {
    username: string;
    password: string;
}