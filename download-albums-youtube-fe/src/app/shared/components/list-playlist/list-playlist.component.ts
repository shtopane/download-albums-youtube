import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tracklist } from 'src/app/playlist/models/tracklist';
import { SongInfo } from '../tracklist-item/tracklist-item.component';

@Component({
    selector: 'app-list-playlist',
    templateUrl: './list-playlist.component.html',
    styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent {
    @Input() tracklist: Tracklist;
    @Output() listen: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();
    @Output() download: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();
    @Output() downloadZip: EventEmitter<string> = new EventEmitter<string>();
}