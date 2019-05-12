import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaylistService } from '../../../shared/services/playlist/playlist.service';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Tracklist } from '../../models/tracklist';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent implements OnInit {
  public downloadAlbumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) { }

  public get url(): string {
    return this.downloadAlbumForm.get('url').value;
  }

  public get tracklist(): string {
    return this.downloadAlbumForm.get('tracklist').value;
  }

  public get disabled(): boolean {
    return this.downloadAlbumForm.invalid;
  }

  public ngOnInit(): void {
    this.downloadAlbumForm = this.fb.group({
      url: ['', Validators.required],
      tracklist: [``, Validators.required]
    });
  }

  public onSubmit(): void {
    console.log('submitted!', this.downloadAlbumForm);

    if (this.downloadAlbumForm.valid) {
      this.loaderService.showLoader();
      /** Do something */
      this.playlistService.sendPlaylist(this.url, this.tracklist).subscribe((res: BaseResponse) => {
        this.loaderService.hideLoader();
        console.log('response from server', res)
        if (res.success) {
          this.playlistService.getPlaylist()
            .subscribe((res: Tracklist & BaseResponse) => {
              this.playlistService.setTracklist({ albumName: res.albumName, playlist: res.playlist });
              console.log('playlist?', res)
              this.router.navigate(['/album']);
            });
        } else {
          this.alertService.setMessage(res.errorMessage);
        }
      });
    }
  }

}
