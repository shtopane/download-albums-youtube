import * as express from 'express';
import * as fs from 'fs';
import * as archiver from 'archiver';

import { BaseResponse } from '../../shared-models/common';

export class DownloadController {
    public handleDownloadSong(req: express.Request, res: express.Response) {
        const albumName: string = req.query.albumName;
        const songName: string = req.query.songName;
        const isDownloadingPlaylist: string = req.query.isPlaylist;

        const rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';
        const folder = `${rootFolder}/${albumName}/${songName}.mp3`;
        const file = `${songName}.mp3`;

        // res.attachment(`output/${albumName}/${songName}.mp3`);
        res.header(`Content-Disposition', 'attachment; filename=${rootFolder}/${albumName}/${songName}.mp3`);
        res.download(folder, file, (err) => {
            if (!err) {
                console.log('competed!');
                res.status(200);
            } else {
                console.log('error happened: ', err);
                res.status(500).json({ errorMessage: err.message, success: false } as BaseResponse)
            }
        });
    }

    public handleListenSong(req: express.Request, res: express.Response, next: express.NextFunction) {
        const albumName: string = req.query.albumName;
        const songName: string = req.query.songName;
        const isDownloadingPlaylist: string = req.query.isPlaylist;
        const rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';

        const options = {
            root: `${rootFolder}/${albumName}`
        };

        res.sendFile(`${songName}.mp3`, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', songName);
            }
        });
    }

    public handleDownloadZip(req: express.Request, res: express.Response, next: express.NextFunction) {
        const albumName: string = req.query.albumName;
        const isDownloadingPlaylist: string = req.query.isPlaylist;
        const rootFolder = isDownloadingPlaylist === 'true' ? 'playlistsOutput' : 'output';
        const zipDir = `${rootFolder}/zips`;

        const zip = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        if (!fs.existsSync(zipDir)) {
            fs.mkdirSync(zipDir);
        }

        const albumZipped = fs.createWriteStream(`${zipDir}/${albumName}.zip`);

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        albumZipped.on('close', function () {
            console.log(zip.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            /** If I remove this, the download zip always has the same name */
            res.attachment(`${zipDir}/${albumName}.zip`);
            const options = {
                root: `${zipDir}`
            };

            res.sendFile(`${albumName}.zip`, options, function (err) {
                if (err) {
                    next(err);
                } else {
                    console.log('Sent:', albumName);
                }
            });
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        zip.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                console.log('warning happened with zip: ', err);
            } else {
                // throw error
                throw err;
            }
        });

        // good practice to catch this error explicitly
        zip.on('error', function (err) {
            throw err;
        });

        // pipe archive data to the file
        zip.pipe(albumZipped);
        // append files from a sub-directory and naming it with the album name within the archive
        zip.directory(`${rootFolder}/${albumName}`, `${albumName}`);
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        zip.finalize();
    }
}