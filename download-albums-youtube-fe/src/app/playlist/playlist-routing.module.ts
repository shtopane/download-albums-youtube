import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistFormComponent } from './containers/playlist-form/playlist-form.component';

const routes: Routes = [
  { path: '', component: PlaylistFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
