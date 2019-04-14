import * as express from 'express';

import { BaseResponse } from '../models/base-response';

export class DownloadController {
    public handleDownload(req: express.Request, res: express.Response) {
        const albumName = req.query.albumName;
        const songName = req.query.songName;
        console.log(albumName);
        console.log(songName);
        console.log(`output/${albumName}/${songName}.mp3`);
        const folder = `output/${albumName}/${songName}.mp3`;
        const file = `${songName}.mp3`;
        // res.attachment(`output/${albumName}/${songName}.mp3`);
        // res.header(`Content-Disposition', 'attachment; filename=output/${albumName}/${songName}.mp3`);
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
}