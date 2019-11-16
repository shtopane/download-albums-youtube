import * as express from 'express';
import * as fs from 'fs';
import * as ytpl from 'ytpl';
import * as ytdl from 'ytdl-core';
import { AlbumController } from './album.controller';
import chalk from 'chalk';

export class DownloadPlaylistController {
    protected counter = 0;

    public async handleDownloadPlaylistFromYoutube(req: express.Request, res: express.Response) {
        const result: ytpl.result = await ytpl('https://www.youtube.com/playlist?list=OLAK5uy_l9DKK1vNaReJBc4tDpJdYZvUTyy29zk2E');

        console.log('HANDLE')
        console.log(result);
        const urls = result.items.map(item => item.url);
        const ids = result.items.map(item => {
            return `https://www.youtube.com/watch?v=${item.id}`;
        });

        const rootOutDir = 'playlistsOutput';
        if (!fs.existsSync(rootOutDir)) {
            fs.mkdirSync(rootOutDir);
        }

        const videoYoutubePath = `${rootOutDir}/song.mp3`;
        console.log('URLS', urls)
        if (result.items.length > 0) {


            this.download(urls[this.counter]);

        }

    }

    protected download(url) {
        // ytdl(url)
        //     .pipe(fs.createWriteStream(videoYoutubePath))
        //     .on('finish', () => {
        //         console.log(chalk.yellow('album downloaded!'));
        //         this.counter++;
        //         if (ids[this.counter]) {
        //             download(ids[this.counter]);
        //         }
        //         // this.storeFile(this.playlistArr[0].songBegin, this.duration, this.playlistArr[0].songName);
        //     });
    }
}