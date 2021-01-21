import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadSingleSongComponent } from './download-single-song/download-single-song.component';

const routes: Routes = [
  { path: '', redirectTo: 'playlist', pathMatch: 'full' },
  { path: 'playlist', loadChildren: './download-slice-albums/download-slice-albums.module#DownloadSliceAlbumsModule' },
  { path: 'download-playlist', loadChildren: './download-playlist/download-playlist.module#DownloadPlaylistModule' },
  { path: 'album', loadChildren: './album/album.module#AlbumModule' },
  {path: 'single-song', component: DownloadSingleSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
