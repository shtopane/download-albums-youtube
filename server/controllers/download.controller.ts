import * as express from 'express';
import * as fs from 'fs';
import * as archiver from 'archiver';

import { BaseResponse } from '../models/base-response';

export class DownloadController {
    public handleDownloadSong(req: express.Request, res: express.Response) {
        const albumName = req.query.albumName;
        const songName = req.query.songName;
        console.log(albumName);
        console.log(songName);
        console.log(`output/${albumName}/${songName}.mp3`);
        const folder = `output/${albumName}/${songName}.mp3`;
        const file = `${songName}.mp3`;
        // res.attachment(`output/${albumName}/${songName}.mp3`);
        res.header(`Content-Disposition', 'attachment; filename=output/${albumName}/${songName}.mp3`);
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
        const albumName = req.query.albumName;
        console.log(__dirname + '/output/' + albumName + '/');
        const options = {
            root: `output/${albumName}`
        };
        const songName = req.query.songName;
        res.sendFile(`${songName}.mp3`, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', songName);
            }
        });
        // res.sendFile(`output/${albumName}/${songName}`);
    }

    public hanldeDownloadZip(req: express.Request, res: express.Response, next: express.NextFunction) {
        const albumName = req.query.albumName;
        const zipDir = `output/zips`;
        const zip = archiver('zip', {

            zlib: { level: 9 } // Sets the compression level.
        });


        if (!fs.existsSync(zipDir)) {
            fs.mkdirSync(zipDir);
        }
        const output = fs.createWriteStream(`${zipDir}/${albumName}.zip`);

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function () {
            console.log(zip.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');

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

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function () {
            console.log('Data has been drained');
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        zip.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                console.log('error happened with zip: ', err);
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
        zip.pipe(output);
        // append files from a sub-directory and naming it `new-subdir` within the archive
        zip.directory(`output/${albumName}`, `${albumName}`);
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        zip.finalize();
    }
}