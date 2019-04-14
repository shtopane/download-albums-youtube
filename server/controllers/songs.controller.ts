import * as express from 'express';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

import { utils } from '../utils';
import { Playlist } from '../models/playlist';
import { Request, Response } from 'express';
import { resolve } from 'path';
import { BaseResponse } from '../models/base-response';
import { PlaylistResponse } from '../models/playlist-response';

export class SongsController {
    public req: express.Request;
    public res: express.Response;

    public playlist: string;
    public url: string;
    public videoYoutubePath: string;
    public tumbnailUrl: string;
    public duration: number;
    public lengthInSeconds: string;
    public videoLenghtObject: { hours: number; minutes: number; seconds: number; };

    public fileTitle = 'album';
    public playlistArr: Playlist[] = [];

    private counter = 1;

    public async handleDownloadAndSlicing(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;

        this.playlist = this.req.body.playlist;
        this.url = this.req.body.url;
        this.playlistArr = utils.getSongsObjects(this.playlist);
        console.log('playlist', this.playlist);
        console.log('playlistArr', this.playlistArr);

        const videoInfo: ytdl.videoInfo = await ytdl.getInfo(this.url);

        let formats: ytdl.videoFormat[];
        let chosenFormat: ytdl.videoFormat | string;

        if (videoInfo) {
            formats = videoInfo.formats;
            chosenFormat = <ytdl.videoFormat>ytdl.chooseFormat(formats, {});
            this.fileTitle = videoInfo.title;
            /** videoInfo.videoDetails ? videoInfo.videoDetails.thumbnail: videoInfo.thumbnail_url; */
            this.tumbnailUrl = videoInfo.thumbnail_url;
            this.lengthInSeconds = videoInfo.length_seconds;
        }

        this.videoLenghtObject = utils.getHoursFromSeconds(this.lengthInSeconds);
        this.videoYoutubePath = `output/${this.fileTitle}.avi`;

        ytdl(this.url, {
            format: (chosenFormat || 'avi') as ytdl.videoFormat,
        })
            .pipe(fs.createWriteStream(this.videoYoutubePath))
            .on('finish', () => {
                console.log('download completed!', 'color: red;');
                this.duration = utils
                    .getSecondsFromTimeString(
                        this.lengthInSeconds,
                        this.playlistArr[0].songBegin,
                        this.playlistArr[1].songBegin);

                this.storeFile(this.playlistArr[0].songBegin, this.duration, this.playlistArr[0].songName);
            });
    }

    public handlePlaylist(req: express.Request, res: express.Response) {
        for (let track of this.playlistArr) {
            track.tumbnail = this.tumbnailUrl;
        }

        console.log(this.playlistArr);
        console.log(this.fileTitle);
        const response: PlaylistResponse = {
            playlist: this.playlistArr.slice(),
            albumName: this.fileTitle,
            success: true
        };

        res.status(200).json(response);
    }

    private storeFile(seekTime: string, duration: number, outputFileName: string): void {
        const outPutDir = `output/${this.fileTitle}`;

        if (!fs.existsSync(outPutDir)) {
            fs.mkdirSync(outPutDir);
        }

        console.log(`Seektime : ${seekTime}, Duration: ${duration}, File: ${outputFileName}`);
        let audioFileName = `${outPutDir}/${outputFileName}.mp3`;
        let stream: fs.WriteStream = fs.createWriteStream(audioFileName);

        ffmpeg(fs.createReadStream(this.videoYoutubePath))
            /** currentSeekTime */
            .seekInput(seekTime)
            .toFormat('mp3')
            .duration(duration)
            .on('end', () => {
                this.onEnd();
            })
            .on('stderr', (line) => {
                console.log('command line: ', line);
            })
            .on('error', (err) => {
                console.log('error happended: ', err);
            })
            .writeToStream(stream, { end: true })
    }

    private onError(err: string): void {
        console.log('error happended: ', err);
        this.res.status(500).json({ errorMessage: err, success: false });
    }

    private onEnd(): void {
        /** if we reached the end of the tracklist or the tracklist is 2 of length(1 song out of the whole album?
         *  Remove if this is not logical at all.) */
        if (this.counter >= this.playlistArr.length || this.playlistArr.length <= 2) {
            console.log('NO MORE SONGS!');
            this.res.status(200).json({ success: true });
        } else if (this.playlistArr.length === 1) {
            this.res.status(401).json({ errorMessage: 'You cannot send only 1 track in an album!', success: false } as BaseResponse);
        } else {
            let { nextDuration, songBegin } = this.generateNextDuration(this.lengthInSeconds);

            /** call the function again with the next song data */
            this.storeFile(songBegin, nextDuration, this.playlistArr[this.counter].songName);
            this.counter++;
            // console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        }
    }

    private generateNextDuration(lengthInSeconds: string): { nextDuration: number; songBegin: string } {
        /** Put the end song endTime to be end of the file */
        const hoursString = `${this.videoLenghtObject.hours > 0 ? this.videoLenghtObject.hours + ':' : ''}`;
        const endSongTimeStr = `${hoursString}${this.videoLenghtObject.minutes}:${this.videoLenghtObject.seconds}`;

        let songBegin = this.playlistArr[this.counter].songBegin;
        let songEnd = this.playlistArr[this.counter + 1]
            /** current song ends where the next begins */
            ? this.playlistArr[this.counter + 1].songBegin
            /** current song ends at the end of the album */
            : endSongTimeStr;

        /** Calculate next song's duration */
        let nextDuration = utils.getSecondsFromTimeString(lengthInSeconds, songBegin, songEnd);

        return {
            nextDuration,
            songBegin
        };
    }

}
