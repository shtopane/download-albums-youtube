import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlaylistItem } from 'shared-models/common';

export type PlaylistItemInfo = {
  title: string;
  playlistItemName: string;
}

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistItemComponent implements OnInit {
  @Input() albumName: string;
  @Input() playlistItem: PlaylistItem;
  @Input() cssClasses: string;
  @Output() download: EventEmitter<PlaylistItemInfo> = new EventEmitter<PlaylistItemInfo>();
  @Output() listen: EventEmitter<PlaylistItemInfo> = new EventEmitter<PlaylistItemInfo>();

  constructor() { }

  ngOnInit() {
    console.log('in track item ALBUM NAME - TRACK', this.albumName, this.playlistItem);
  }

  public onListenClicked() {
    this.listen.emit({ title: this.albumName, playlistItemName: this.playlistItem.name });
  }

  public onDownloadClicked() {
    this.download.emit({ title: this.albumName, playlistItemName: this.playlistItem.name });
  }
}
