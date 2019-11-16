import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadPlaylistComponent } from './containers/download-playlist/download-playlist.component';

const routes: Routes = [
    { path: '', component: DownloadPlaylistComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DownloadPlaylistRoutingModule { }
