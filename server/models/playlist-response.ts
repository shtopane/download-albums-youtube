import { Playlist } from "./playlist";
import { BaseResponse } from "./base-response";

export interface PlaylistResponse extends BaseResponse {
    playlist: Playlist[];
    albumName: string;
}
