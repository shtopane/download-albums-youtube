import { app } from './server';

import { SongsController } from './controllers/songs.controller';
import { DownloadController } from './controllers/download.controller';


/** INIT HERE TO CAPTURE THE RIGHT THIS */
const songsController = new SongsController();
const downloadController = new DownloadController();

/** Pass the correct this to the contorller */
app.post('/songs', songsController.handleDownloadAndSlicing.bind(songsController));
app.get('/playlist', songsController.handlePlaylist.bind(songsController));

app.get('/download', downloadController.handleDownload.bind(downloadController));