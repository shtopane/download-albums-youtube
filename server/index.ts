import { app } from './server';

import { AlbumController } from './controllers/album.controller';
import { DownloadController } from './controllers/download.controller';
import { DownloadPlaylistController } from './controllers/download-playlist.controller';

/** INIT HERE TO CAPTURE THE RIGHT THIS */
const albumController = new AlbumController();
const downloadController = new DownloadController();
const downloadPlaylistController = new DownloadPlaylistController();

/** Pass the correct this to the contorller */
app.post('/api/songs', albumController.handleAlbumSlicing.bind(albumController));
app.get('/api/playlist', albumController.handlePlaylist.bind(albumController));

app.post('/api/download-playlist', downloadPlaylistController.handleDownloadPlaylistFromYoutube.bind(downloadPlaylistController));


app.get('/api/download', downloadController.handleDownloadSong.bind(downloadController));
app.get('/api/downloadZip', downloadController.hanldeDownloadZip.bind(downloadController));
app.get('/api/listen', downloadController.handleListenSong.bind(downloadController));