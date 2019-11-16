import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TracklistItem } from 'src/app/playlist/models/tracklist-item';
import { environment } from 'src/environments/environment';
import { SongInfo } from 'src/app/shared/components/tracklist-item/tracklist-item.component';

type DownloadPlaylistResponse = {
  success?: boolean;
  title?: string;
  playlist?: TracklistItem[]
  playlistDownloadPath: string;
}
@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;
  public tracklistData: DownloadPlaylistResponse;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private loaderService: LoaderService
  ) { }

  public get url() {
    return this.downloadPlaylistForm ? this.downloadPlaylistForm.get('url') : undefined;
  }

  ngOnInit() {
    this.downloadPlaylistForm = this.fb.group({
      url: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.downloadPlaylistForm.valid) {
      this.loaderService.showLoader();

      this.playlistService.downloadYotubePlaylist(this.url.value).subscribe((res: DownloadPlaylistResponse) => {
        this.loaderService.hideLoader();
        console.log('res from server', res)

        this.tracklistData = res;
      },
        error => {
          this.loaderService.hideLoader();
          console.log('download playlist submit error', error);
        }
      );
    }
  }

  public onDownloadClicked(songInfo: SongInfo): void {
    const url = `${environment.serverUrl}/download?isPlaylist=true&albumName=${songInfo.albumName}&songName=${songInfo.songName}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: SongInfo): void {
    console.log('listen', songInfo.albumName, songInfo.songName);
    const url = `${environment.serverUrl}/listen?isPlaylist=true&albumName=${songInfo.albumName}&songName=${songInfo.songName}`;
    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    const url = `${environment.serverUrl}/downloadZip?isPlaylist=true&albumName=${albumName}`;
    window.open(url, '_blank');
  }

}
