import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';

@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) { }

  public get url() {
    return this.downloadPlaylistForm ? this.downloadPlaylistForm.get('url') : undefined;
  }

  ngOnInit() {
    this.downloadPlaylistForm = this.fb.group({
      url: ['', Validators.required]
    })
  }

  public onSubmit(event) {
    event.preventDefault();
    this.playlistService.downloadYotubePlaylist(this.url.value);
  }

}
