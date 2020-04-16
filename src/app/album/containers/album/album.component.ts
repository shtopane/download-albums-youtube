import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Observable, fromEvent, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { Playlist, PlaylistItem } from 'shared-models/common';

import { environment } from 'src/environments/environment';
import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { PlaylistItemInfo } from 'src/app/shared/components/list-playlist/playlist-item/playlist-item.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit, OnDestroy {
  public playlist$: Observable<Playlist>;
  public playlistItemsArr: PlaylistItem[];
  public isMobile: boolean;

  protected destroySubs = new Subject<boolean>();

  constructor(
    private sliceDownloadAlbumService: PlaylistService
  ) { }

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      tap(() => this.determineIsMobile()),
      takeUntil(this.destroySubs)
    ).subscribe();

    this.playlist$ = this.sliceDownloadAlbumService.getLocalPlaylist();
  }

  ngAfterViewInit(): void {
    this.determineIsMobile();
  }

  ngOnDestroy(): void {
    this.destroySubs.next(true);
    this.destroySubs.complete();
  }

  public onDownloadClicked(songInfo: PlaylistItemInfo): void {
    console.log(songInfo);
    // const url = `${environment.serverUrl}/download?isPlaylist=false&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;
    const url = `/api/download?isPlaylist=false&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: PlaylistItemInfo): void {
    console.log('listen', songInfo.title, songInfo.playlistItemName);
    // const url = `${environment.serverUrl}/listen?isPlaylist=false&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;
    const url = `/api/listen?isPlaylist=false&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;

    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    // const url = `${environment.serverUrl}/downloadZip?isPlaylist=false&albumName=${encodeURIComponent(albumName)}`;
    const url = `/api/downloadZip?isPlaylist=false&albumName=${encodeURIComponent(albumName)}`;

    window.open(url, '_blank');
  }

  protected determineIsMobile(): void {
    this.isMobile = window.document.body.clientWidth <= 640 ? true : false;
  }

}
