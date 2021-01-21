export type BaseResponse = {
    success?: boolean;
    errorMessage?: string;
}

export type PlaylistResponse = BaseResponse & Playlist;

export interface PlaylistItem {
    startTime?: string;
    name: string;
    thumbnail?: string;
}

export type Playlist = {
    albumName: string;
    playlist: PlaylistItem[];
}