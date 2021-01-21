import * as express from 'express';
import * as fs from 'fs';
import * as ytpl from 'ytpl';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';

import { PlaylistResponse, PlaylistItem } from '../../shared-models/common';
import utils from '../utils/utils';

type YoutubePlaylistItem = {
    author?: {
        id?: string;
        name?: string;
        user?: string;
        user_url?: string;
        channel_url?: string;
    };
    title?: string;
    url?: string;
    url_simple?: string;
    duration?: string;
    id?: string;
    thumbnail?: string;
}

export class DownloadPlaylistController {
    protected res: express.Response;
    protected req: express.Request;
    protected counter = 0;
    protected playlistTitle: string;
    protected playlistInfo: ytdl.videoInfo;
    protected youtubePlaylistData: ytpl.Item[];
    protected rootDir = 'playlistsOutput';
    protected startTime: number;

    constructor() {
        if (!fs.existsSync(this.rootDir)) {
            fs.mkdirSync(this.rootDir);
        }
    }

    public async handleDownloadPlaylistFromYoutube(req: express.Request, res: express.Response) {
        this.res = res;
        this.req = req;

        const { url } = this.req.body;
        let result: ytpl.Result;

        try {
            result = await ytpl(url);
        } catch (err) {
            res.status(500).send({
                errorMessage: err,
                success: false
            });
            return;
        }

        console.log('RESULT',result);
        this.youtubePlaylistData = result.items;

        if (result.estimatedItemCount > 0) {
            let firstSongSafeTitle = utils.makeStringSafeForFolderCreate(result.items[0].title)// result.items[0].title.replace(/[:$\\$//]/g, '');
            const firstSongTitle = firstSongSafeTitle; //result.items[0].title;
            const firstSongUrl = result.items[0].shortUrl;

            let generateNextSongPath: (s: string) => string;

            if (result.title) {
                const safeTitle = utils.makeStringSafeForFolderCreate(result.title)// result.title.replace(/[:$\\$//]/g, '');
                console.log('SAFE TITLE', safeTitle);
                this.playlistTitle = safeTitle;
                const folder = `${safeTitle}`;

                generateNextSongPath = this.generateSongPath(firstSongTitle, folder);

            } else {
                generateNextSongPath = this.generateSongPath(firstSongTitle);
            }

            this.startTime = Date.now();
            this.download(firstSongUrl, generateNextSongPath(firstSongTitle), generateNextSongPath);

        } else {
            res.status(400).send({ errorMessage: 'There are no videos for this playlist!', success: false });
            return;
        }

    }

    protected download(url: string, songPath: string, funcToGenerateNextSongPath): void {
        console.log('[DOWNLOAD] url', url);
        console.log('[DOWNLOAD] songPath', songPath);
        const stream = ytdl(url);
        console.log(stream);
        const outStream = fs.createWriteStream(songPath);
        ffmpeg(stream)
            .toFormat('mp3')
            .audioBitrate(160)
            .on('end', () => {
                console.log('song downloaded!', songPath);
                this.counter++;
                if (this.youtubePlaylistData[this.counter]) {
                    let nextUrl = this.youtubePlaylistData[this.counter].shortUrl;
                    let nextSongSafeTitle = utils.makeStringSafeForFolderCreate(this.youtubePlaylistData[this.counter].title)
                    let nextSongPath = funcToGenerateNextSongPath(nextSongSafeTitle);

                    this.download(nextUrl, nextSongPath, funcToGenerateNextSongPath);
                } else {
                    console.log(`Finished! It took: ${(Date.now() - this.startTime) / 1000}s`);

                    const playlistArr: PlaylistItem[] = this.youtubePlaylistData.map(item => {
                        return {
                            startTime: item.duration,
                            name: item.title,
                            thumbnail: item.bestThumbnail ? item.bestThumbnail.url : null
                        } as PlaylistItem;
                    });

                    const playlistResponse: PlaylistResponse = {
                        success: true,
                        albumName: this.playlistTitle,
                        playlist: playlistArr
                    };

                    this.res.status(200).send(playlistResponse);
                    return;
                }
            })
            .on('stderr', (line: string) => {
                if (line.indexOf('size=') > -1) {
                    console.log(`command line: ${line}`);
                }
            })
            .on('error', (err) => {
                console.log('ERROR ', err);
            })
            .writeToStream(outStream, { end: true });

    }

    protected generateSongPath(songName: string, folder?: string): (songName: string) => string {
        return (songName) => {
            const folderName = folder;

            if (folderName && !fs.existsSync(`${this.rootDir}/${folderName}`)) {
                fs.mkdirSync(`${this.rootDir}/${folderName}`);
            }

            return folderName ? `${this.rootDir}/${folderName}/${songName}.mp3` : `${this.rootDir}/${songName}.mp3`;
        };

    }
}