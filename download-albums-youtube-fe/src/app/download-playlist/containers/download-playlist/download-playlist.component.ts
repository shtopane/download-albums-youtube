import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.downloadPlaylistForm = this.fb.group({
      url: ['', Validators.required]
    })
  }

  public onSubmit(event) {
    event.preventDefault();
  }

}
