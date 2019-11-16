import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'playlist', pathMatch: 'full' },
  { path: 'playlist', loadChildren: './playlist/playlist.module#PlaylistModule' },
  { path: 'download-playlist', loadChildren: './download-playlist/download-playlist.module#DownloadPlaylistModule' },
  { path: 'album', loadChildren: './album/album.module#AlbumModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
