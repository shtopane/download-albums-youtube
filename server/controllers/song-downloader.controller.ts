import * as express from 'express';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

let counter = 1;

export class SongDownloaderController {
    protected req: express.Request;
    protected res: express.Response;

    protected songsRootFolter = 'singleSongs';

    public async handleDownloadSong(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;

        const { url } = this.req.body;
        this.res = res;
        console.log('url', url);

        if (!ytdl.validateURL(url)) {
            this.res.status(400).send({
                errorMessage: `The url you provided seems invalid. You gave ${url}`,
                success: false
            });
            return;
        }

        // Example of filtering the formats to audio only.
        let videoInfo = await ytdl.getInfo(url);
        /** TODO: Make checks for undefined! */
        const fileTitle = videoInfo.videoDetails.title || videoInfo.player_response.videoDetails.title;
        /** videoInfo.videoDetails ? videoInfo.videoDetails.thumbnail: videoInfo.thumbnail_url; */
        /** TODO: Make checks for undefined! */
        const thumbnail = videoInfo.player_response.videoDetails.thumbnail && videoInfo.player_response.videoDetails.thumbnail.thumbnails.length ?
            videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url : undefined;

        const thumbnailUrl = videoInfo.thumbnail_url || thumbnail;

        if (!fs.existsSync(this.songsRootFolter)) {
            fs.mkdirSync(this.songsRootFolter);
        }

        const newName = `song${++counter}`;

        ytdl(url, { filter: 'audioonly' })
            .pipe(fs.createWriteStream(`${this.songsRootFolter}/${newName}.mp4`)).on('finish', () => {
                console.log('finished');
                const response = {
                    songName: newName,
                    success: true,
                    thumbnail: thumbnail,
                    thumbnail_url: thumbnailUrl
                }
                res.status(200).json(response);
            });

    }
}