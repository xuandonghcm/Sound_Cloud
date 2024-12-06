export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const BACKEND_IMAGES_URL = process.env.NEXT_PUBLIC_BACKEND_IMAGES_URL;
export const BACKEND_TRACKS_URL = process.env.NEXT_PUBLIC_BACKEND_TRACKS_URL;
export const GET_BACKEND_TRACKS = (audio: string): string => {
    return BACKEND_TRACKS_URL ? `${BACKEND_TRACKS_URL}${audio}` : '';
};
export const TIMEOUT_REQUEST_SERVER = 60 * 1000 * 3;
//export const TIMEOUT_REQUEST_SERVER = 1;
export const TIMEOUT_REQUEST_MESSAGE = 'TIMEOUT_LIMITED';


// end poin
export const GET_TRACK_FOOTER_URL = '/tracks/hoidanit.mp3';
export const GET_TOP_TRACKS_BY_CATEGORIES = '/v1/tracks/top';

//path client
export const PATH = {
    BLANK: '/',
    HOME: '/home',
    TRACK: (id: string, audio: string) => `/track/${id}?audio=${audio}`,
    LIKE: '/likes',
    PLAYLIST: '/playlist',
    PROFILE: '/profile',
    UPLOAD: '/upload',
};

export const PATH_SERVER = (audio: string) => `/api?audio=${audio}`;