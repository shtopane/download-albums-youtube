import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PlaylistItemInfo } from './playlist-item/playlist-item.component';
import { Playlist } from 'shared-models/common';

@Component({
    selector: 'app-list-playlist',
    templateUrl: './list-playlist.component.html',
    styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent {
    @Input() playlist: Playlist;
    @Output() listen: EventEmitter<PlaylistItemInfo> = new EventEmitter<PlaylistItemInfo>();
    @Output() download: EventEmitter<PlaylistItemInfo> = new EventEmitter<PlaylistItemInfo>();
    @Output() downloadZip: EventEmitter<string> = new EventEmitter<string>();
}