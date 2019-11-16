import { app } from './server';

import { AlbumController } from './controllers/album.controller';
import { DownloadController } from './controllers/download.controller';
import { DownloadPlaylistController } from './controllers/download-playlist.controller';

/** INIT HERE TO CAPTURE THE RIGHT THIS */
const albumController = new AlbumController();
const downloadController = new DownloadController();
const downloadPlaylistController = new DownloadPlaylistController();

/** Pass the correct this to the contorller */
app.post('/songs', albumController.handleAlbumSlicing.bind(albumController));
app.get('/playlist', albumController.handlePlaylist.bind(albumController));

app.post('/download-playlist', downloadPlaylistController.handleDownloadPlaylistFromYoutube.bind(downloadPlaylistController));


app.get('/download', downloadController.handleDownloadSong.bind(downloadController));
app.get('/downloadZip', downloadController.hanldeDownloadZip.bind(downloadController));
app.get('/listen', downloadController.handleListenSong.bind(downloadController));