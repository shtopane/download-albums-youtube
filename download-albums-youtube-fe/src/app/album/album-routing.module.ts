import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumOutletComponent } from './containers/album-outlet/album-outlet.component';

const routes: Routes = [
  {
    path: '', component: AlbumOutletComponent, children: [
      { path: '', component: AlbumComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
