import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlaylistResponse, Playlist } from 'shared-models/common';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { environment } from 'src/environments/environment';
import { PlaylistItemInfo } from 'src/app/shared/components/list-playlist/playlist-item/playlist-item.component';



@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;
  public playlist: Playlist;

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

    // this.playlist = {
    //   albumName: 'Test Playlists',
    //   playlist: [
    //     {
    //       startTime: '1:30',
    //       name: 'The Underground Youth - Alice (Official Video)'
    //     },
    //     {
    //       startTime: '1:30',
    //       name: 'Test Song'
    //     },
    //   ]
    // }
  }

  public onSubmit() {
    if (this.downloadPlaylistForm.valid) {
      this.loaderService.showLoader();

      this.playlistService.downloadYotubePlaylist(this.url.value).subscribe((res: PlaylistResponse) => {
        this.loaderService.hideLoader();
        if (res.success) {
          this.playlist = res;
        }

        console.log('Playlist data', this.playlist);
      },
        error => {
          this.loaderService.hideLoader();
          console.log('download playlist submit error', error);
        }
      );
    }
  }

  public onDownloadClicked(songInfo: PlaylistItemInfo): void {
    const url = `${environment.serverUrl}/download?isPlaylist=true&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;
    window.open(url, '_blank');
  }

  public onListenClicked(songInfo: PlaylistItemInfo): void {
    console.log('listen', songInfo.title, songInfo.playlistItemName);
    const url = `${environment.serverUrl}/listen?isPlaylist=true&albumName=${encodeURIComponent(songInfo.title)}&songName=${encodeURIComponent(songInfo.playlistItemName)}`;
    window.open(url, '_blank');
  }

  public onDownloadZipClicked(albumName: string): void {
    const url = `${environment.serverUrl}/downloadZip?isPlaylist=true&albumName=${encodeURIComponent(albumName)}`;
    window.open(url, '_blank');
  }

}
