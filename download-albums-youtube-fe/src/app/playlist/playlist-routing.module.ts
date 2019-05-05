import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadAlbumFormComponent } from './containers/download-album-form/download-album-form.component';

const routes: Routes = [
  { path: '', component: DownloadAlbumFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
