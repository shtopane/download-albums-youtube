import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { Tracklist } from 'src/app/download-slice-albums/models/tracklist';
import { Observable, of, fromEvent, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SongInfo } from '../../../shared/components/list-playlist/tracklist-item/tracklist-item.component';
import { TracklistItem } from 'src/app/download-slice-albums/models/tracklist-item';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit, OnDestroy {
  public tracklist$: Observable<Tracklist>;
  public playlist: TracklistItem[];
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

    this.tracklist$ = this.sliceDownloadAlbumService.getTracklist();
  }

  ngAfterViewInit(): void {
    this.determineIsMobile();
  }

  ngOnDestroy(): void {
    this.destroySubs.next(true);
    this.destroySubs.complete();
  }

  public onDownloadClicked(songInfo: SongInfo): void {
    console.log(songInfo);
    encodeURIComponent
    const url = `${environment.serverUrl}/download?isPlaylist=false&albumName=${encodeURIComponent(songInfo.albumName)}&songName=${encodeURIComponent(songInfo.songName)}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: SongInfo): void {
    console.log('listen', songInfo.albumName, songInfo.songName);
    const url = `${environment.serverUrl}/listen?isPlaylist=false&albumName=${encodeURIComponent(songInfo.albumName)}&songName=${encodeURIComponent(songInfo.songName)}`;
    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    const url = `${environment.serverUrl}/downloadZip?isPlaylist=false&albumName=${encodeURIComponent(albumName)}`;
    window.open(url, '_blank');
  }

  protected determineIsMobile(): void {
    this.isMobile = window.document.body.clientWidth <= 640 ? true : false;
  }

}
