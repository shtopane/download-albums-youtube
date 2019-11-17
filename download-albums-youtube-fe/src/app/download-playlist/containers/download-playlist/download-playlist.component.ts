import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { environment } from 'src/environments/environment';
import { SongInfo } from 'src/app/shared/components/list-playlist/tracklist-item/tracklist-item.component';
import { Tracklist } from 'src/app/download-slice-albums/models/tracklist';

type DownloadPlaylistResponse = Tracklist & {
  success?: boolean;
}

@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;
  public tracklistData: Tracklist;

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

    // this.tracklistData = {
    //   albumName: 'Test Playlists',
    //   playlist: [
    //     {
    //       songBegin: '1:30',
    //       songName: 'The Underground Youth - Alice (Official Video)'
    //     },
    //     {
    //       songBegin: '1:30',
    //       songName: 'Test Song'
    //     },
    //   ]
    // }
  }

  public onSubmit() {
    if (this.downloadPlaylistForm.valid) {
      this.loaderService.showLoader();

      this.playlistService.downloadYotubePlaylist(this.url.value).subscribe((res: DownloadPlaylistResponse) => {
        this.loaderService.hideLoader();
        if (res.success) {
          this.tracklistData = res;
        }

        console.log('Tracklist data', this.tracklistData);
      },
        error => {
          this.loaderService.hideLoader();
          console.log('download playlist submit error', error);
        }
      );
    }
  }

  public onDownloadClicked(songInfo: SongInfo): void {
    const url = `${environment.serverUrl}/download?isPlaylist=true&albumName=${encodeURIComponent(songInfo.albumName)}&songName=${encodeURIComponent(songInfo.songName)}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: SongInfo): void {
    console.log('listen', songInfo.albumName, songInfo.songName);
    const url = `${environment.serverUrl}/listen?isPlaylist=true&albumName=${encodeURIComponent(songInfo.albumName)}&songName=${encodeURIComponent(songInfo.songName)}`;
    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    const url = `${environment.serverUrl}/downloadZip?isPlaylist=true&albumName=${encodeURIComponent(albumName)}`;
    window.open(url, '_blank');
  }

}
