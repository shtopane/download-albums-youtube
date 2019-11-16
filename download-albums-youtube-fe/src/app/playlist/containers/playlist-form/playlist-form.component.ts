import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaylistService } from '../../../shared/services/playlist/playlist.service';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Tracklist } from '../../models/tracklist';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent implements OnInit, AfterViewInit {
  public downloadAlbumForm: FormGroup;
  public textAreaRows: number = 15;

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

  public ngAfterViewInit(): void {
    this.textAreaRows = window.document.body.clientWidth === 320 && window.document.body.clientWidth <= 768 ? 5 : 15;
    console.log(this.textAreaRows)
  }

  public onSubmit(): void {
    if (this.downloadAlbumForm.valid) {
      this.loaderService.showLoader();
      /** Do something */
      this.playlistService.sendPlaylist(this.url, this.tracklist)
        .subscribe((res: BaseResponse) => {
          this.loaderService.hideLoader();
          if (res.success) {
            this.playlistService.getPlaylist()
              .subscribe((res: Tracklist & BaseResponse) => {
                this.playlistService.setTracklist({ albumName: res.albumName, playlist: res.playlist });
                this.router.navigate(['/album']);
              });
          }
        },
          (error) => {
            console.log('in error clause of observable', error)
            this.alertService.setMessage(error.error.errorMessage);
            this.loaderService.hideLoader();
          }
        );
    }
  }

  public openMenu(event) {
    event.preventDefault();
  }

}
