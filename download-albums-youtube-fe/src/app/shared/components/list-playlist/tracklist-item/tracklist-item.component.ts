import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TracklistItem } from 'src/app/download-slice-albums/models/tracklist-item';

export type SongInfo = {
  albumName: string;
  songName: string;
}

@Component({
  selector: 'app-tracklist-item',
  templateUrl: './tracklist-item.component.html',
  styleUrls: ['./tracklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracklistItemComponent implements OnInit {
  @Input() albumName: string;
  @Input() track: TracklistItem;
  @Input() cssClasses: string;
  @Output() download: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();
  @Output() listen: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();

  constructor() { }

  ngOnInit() {
    console.log('in track item ALBUMNAME - TRACK', this.albumName, this.track);
  }

  public onListenClicked() {
    this.listen.emit({ albumName: this.albumName, songName: this.track.songName });
  }

  public onDownloadClicked() {
    this.download.emit({ albumName: this.albumName, songName: this.track.songName });
  }
}
