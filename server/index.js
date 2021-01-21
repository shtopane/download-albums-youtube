"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var album_controller_1 = require("./controllers/album.controller");
var download_controller_1 = require("./controllers/download.controller");
var download_playlist_controller_1 = require("./controllers/download-playlist.controller");
var song_downloader_controller_1 = require("./controllers/song-downloader.controller");
/** INIT HERE TO CAPTURE THE RIGHT THIS */
var albumController = new album_controller_1.AlbumController();
var downloadController = new download_controller_1.DownloadController();
var downloadPlaylistController = new download_playlist_controller_1.DownloadPlaylistController();
var songDownloadController = new song_downloader_controller_1.SongDownloaderController();
/** Pass the correct this to the controller */
server_1.app.post('/api/songs', albumController.handleAlbumSlicing.bind(albumController));
server_1.app.get('/api/playlist', albumController.handlePlaylist.bind(albumController));
server_1.app.post('/api/download-playlist', downloadPlaylistController.handleDownloadPlaylistFromYoutube.bind(downloadPlaylistController));
server_1.app.get('/api/download', downloadController.handleDownloadSong.bind(downloadController));
server_1.app.get('/api/download-single', downloadController.handleDownloadSingleSong.bind(downloadController));
server_1.app.get('/api/downloadZip', downloadController.handleDownloadZip.bind(downloadController));
server_1.app.get('/api/listen', downloadController.handleListenSong.bind(downloadController));
server_1.app.post('/api/single-song', songDownloadController.handleDownloadSong.bind(songDownloadController));
