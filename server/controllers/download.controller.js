"use strict";
exports.__esModule = true;
var fs = require("fs");
var archiver = require("archiver");
var DownloadController = /** @class */ (function () {
    function DownloadController() {
    }
    DownloadController.prototype.handleDownloadSong = function (req, res) {
        var albumName = req.query.albumName;
        var songName = req.query.songName;
        var isDownloadingPlaylist = req.query.isPlaylist;
        var rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';
        var folder = rootFolder + "/" + albumName + "/" + songName + ".mp3";
        var file = songName + ".mp3";
        // res.attachment(`output/${albumName}/${songName}.mp3`);
        res.header("Content-Disposition', 'attachment; filename=" + rootFolder + "/" + albumName + "/" + songName + ".mp3");
        res.download(folder, file, function (err) {
            if (!err) {
                console.log('competed!');
                res.status(200);
            }
            else {
                console.log('error happened: ', err);
                res.status(500).json({ errorMessage: err.message, success: false });
            }
        });
    };
    DownloadController.prototype.handleListenSong = function (req, res, next) {
        var albumName = req.query.albumName;
        var songName = req.query.songName;
        var isDownloadingPlaylist = req.query.isPlaylist;
        var rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';
        var options = {
            root: rootFolder + "/" + albumName
        };
        res.sendFile(songName + ".mp3", options, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent:', songName);
            }
        });
    };
    DownloadController.prototype.hanldeDownloadZip = function (req, res, next) {
        var albumName = req.query.albumName;
        var isDownloadingPlaylist = req.query.isPlaylist;
        var rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';
        var zipDir = rootFolder + "/zips";
        var zip = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        if (!fs.existsSync(zipDir)) {
            fs.mkdirSync(zipDir);
        }
        var albumZiped = fs.createWriteStream(zipDir + "/" + albumName + ".zip");
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        albumZiped.on('close', function () {
            console.log(zip.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            /** If I remove this, the download zip always has the same name */
            res.attachment(zipDir + "/" + albumName + ".zip");
            var options = {
                root: "" + zipDir
            };
            res.sendFile(albumName + ".zip", options, function (err) {
                if (err) {
                    next(err);
                }
                else {
                    console.log('Sent:', albumName);
                }
            });
        });
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        zip.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                console.log('warning happened with zip: ', err);
            }
            else {
                // throw error
                throw err;
            }
        });
        // good practice to catch this error explicitly
        zip.on('error', function (err) {
            throw err;
        });
        // pipe archive data to the file
        zip.pipe(albumZiped);
        // append files from a sub-directory and naming it with the album name within the archive
        zip.directory(rootFolder + "/" + albumName, "" + albumName);
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        zip.finalize();
    };
    return DownloadController;
}());
exports.DownloadController = DownloadController;
