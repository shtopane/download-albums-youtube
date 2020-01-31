"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var album_controller_1 = require("./controllers/album.controller");
var download_controller_1 = require("./controllers/download.controller");
var download_playlist_controller_1 = require("./controllers/download-playlist.controller");
/** INIT HERE TO CAPTURE THE RIGHT THIS */
var albumController = new album_controller_1.AlbumController();
var downloadController = new download_controller_1.DownloadController();
var downloadPlaylistController = new download_playlist_controller_1.DownloadPlaylistController();
/** Pass the correct this to the contorller */
server_1.app.post('/songs', albumController.handleAlbumSlicing.bind(albumController));
server_1.app.get('/playlist', albumController.handlePlaylist.bind(albumController));
server_1.app.post('/download-playlist', downloadPlaylistController.handleDownloadPlaylistFromYoutube.bind(downloadPlaylistController));
server_1.app.get('/download', downloadController.handleDownloadSong.bind(downloadController));
server_1.app.get('/downloadZip', downloadController.hanldeDownloadZip.bind(downloadController));
server_1.app.get('/listen', downloadController.handleListenSong.bind(downloadController));