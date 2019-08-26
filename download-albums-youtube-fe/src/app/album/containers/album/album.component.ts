import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { Tracklist } from 'src/app/playlist/models/tracklist';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SongInfo } from '../../components/tracklist-item/tracklist-item.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public tracklist$: Observable<Tracklist>;

  constructor(
    private sliceDownloadAlbumService: PlaylistService
  ) { }

  ngOnInit() {
    this.tracklist$ = this.sliceDownloadAlbumService.getTracklist();
  }

  public onDownloadClicked(songInfo: SongInfo): void {
    const url = `${environment.serverUrl}/download?albumName=${songInfo.albumName}&songName=${songInfo.songName}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: SongInfo): void {
    console.log('listen', songInfo.albumName, songInfo.songName);
    const url = `${environment.serverUrl}/listen?albumName=${songInfo.albumName}&songName=${songInfo.songName}`;
    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    const url = `${environment.serverUrl}/downloadZip?albumName=${albumName}`;
    window.open(url, '_blank');
  }

}
