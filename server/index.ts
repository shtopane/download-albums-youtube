import { app } from './server';

import { AlbumController } from './controllers/album.controller';
import { DownloadController } from './controllers/download.controller';


/** INIT HERE TO CAPTURE THE RIGHT THIS */
const albumController = new AlbumController();
const downloadController = new DownloadController();

/** Pass the correct this to the contorller */
app.post('/songs', albumController.handleAlbumSlicing.bind(albumController));
app.get('/playlist', albumController.handlePlaylist.bind(albumController));

app.get('/download', downloadController.handleDownloadSong.bind(downloadController));
app.get('/downloadZip', downloadController.hanldeDownloadZip.bind(downloadController));
app.get('/listen', downloadController.handleListenSong.bind(downloadController));