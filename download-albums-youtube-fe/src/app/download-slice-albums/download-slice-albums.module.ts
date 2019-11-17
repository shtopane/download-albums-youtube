import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DownloadSliceAlbumsRoutingModule } from './download-slice-albums-routing.module';
import { DownloadSliceAlbumsFormComponent } from './containers/download-slice-albums-form/download-slice-albums-form.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { PlaylistTextareaComponent } from './components/playlist-textarea/playlist-textarea.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DownloadSliceAlbumsFormComponent, HowToUseComponent, PlaylistTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DownloadSliceAlbumsRoutingModule
  ]
})
export class DownloadSliceAlbumsModule { }
