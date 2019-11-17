import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadSliceAlbumsFormComponent } from './containers/download-slice-albums-form/download-slice-albums-form.component';

const routes: Routes = [
  { path: '', component: DownloadSliceAlbumsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadSliceAlbumsRoutingModule { }
