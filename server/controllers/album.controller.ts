import * as express from 'express';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import chalk from 'chalk';

import { utils } from '../utils/utils';
import { Playlist } from '../models/playlist';
import { BaseResponse } from '../models/base-response';
import { PlaylistResponse } from '../models/playlist-response';

export class AlbumController {
    public req: express.Request;
    public res: express.Response;

    public playlist: string;
    public url: string;
    public videoYoutubePath: string;
    public thumbnailUrl: string;
    public duration: number;
    public lengthInSeconds: string;
    public videoLenghtObject: { hours: number; minutes: number; seconds: number; };

    public fileTitle = 'album';
    public playlistArr: Playlist[] = [];

    private counter = 1;

    public async handleAlbumSlicing(req: express.Request, res: express.Response): Promise<void> {
        this.req = req;
        this.res = res;
        console.log(this.req.body);
        this.playlist = this.req.body.playlist;
        this.url = this.req.body.url;

        this.playlistArr = utils.getSongsObjects(this.playlist);

        if (!ytdl.validateURL(this.url)) {
            this.res.status(400).send({
                errorMessage: `The url you provided seems invalid. You gave ${this.url}`,
                success: false
            });
            return;
        } else if (this.playlistArr.length < 2) {
            this.res.status(400).send({
                errorMessage: `The minimum required songs in the playlist is 2. You gave ${this.playlistArr.length}`,
                success: false
            });
            return;
        }

        console.log('playlist ready!', this.playlistArr);



        let formats: ytdl.videoFormat[];
        let chosenFormat: ytdl.videoFormat | string;

        const videoInfo: ytdl.videoInfo = await ytdl.getInfo(this.url);

        if (videoInfo) {
            formats = videoInfo.formats;
            chosenFormat = <ytdl.videoFormat>ytdl.chooseFormat(formats, {});
            /** TODO: Make checks for undefined! */
            this.fileTitle = videoInfo.title || videoInfo.player_response.videoDetails.title;
            /** videoInfo.videoDetails ? videoInfo.videoDetails.thumbnail: videoInfo.thumbnail_url; */
            /** TODO: Make checks for undefined! */
            const thumbnail = videoInfo.player_response.videoDetails.thumbnail && videoInfo.player_response.videoDetails.thumbnail.thumbnails.length ?
                videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url : undefined;

            this.thumbnailUrl = videoInfo.thumbnail_url || thumbnail;
            /** TODO: Make checks for undefined! */
            this.lengthInSeconds = videoInfo.length_seconds || videoInfo.player_response.videoDetails.lengthSeconds + '';
        } else {
            this.noVideoInfoErrorHandle();
        }
        console.log(chalk.yellow('length of video', this.lengthInSeconds))
        this.videoLenghtObject = utils.getHoursFromSeconds(this.lengthInSeconds);

        const rootOutDir = 'output';
        if (!fs.existsSync(rootOutDir)) {
            fs.mkdirSync(rootOutDir);
        }

        this.videoYoutubePath = `${rootOutDir}/${this.fileTitle}.avi`;

        /** Calculate duration for the first song. Calculate here so that if the tracklist in invalid
        *   the user will get to know quickly?
        */
        this.duration = utils
            .getSecondsFromTimeString(
                this.lengthInSeconds,
                this.playlistArr[0].songBegin,
                this.playlistArr[1].songBegin);

        if (this.duration === null) {
            console.log(chalk.red('ERROR!'));
            this.invalidPlaylistErrorHandle();
        }

        try {
            ytdl(this.url, {
                format: (chosenFormat || 'avi') as ytdl.videoFormat,
            })
                .pipe(fs.createWriteStream(this.videoYoutubePath))
                .on('finish', () => {
                    console.log(chalk.yellow('album downloaded!'));
                    this.storeFile(this.playlistArr[0].songBegin, this.duration, this.playlistArr[0].songName);
                });
        } catch (error) {
            res.status(500).send({ errorMessage: error, success: false });
            res.end();
        }

    }

    public handlePlaylist(req: express.Request, res: express.Response): void {
        for (let track of this.playlistArr) {
            track.thumbnail = this.thumbnailUrl;
        }

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

        let audioFileName = `${outPutDir}/${outputFileName}.mp3`;
        let stream: fs.WriteStream = fs.createWriteStream(audioFileName);

        console.log(
            chalk.yellowBright(`
            Seektime : ${seekTime}, 
            Duration: ${duration}, 
            File: ${outputFileName}, 
            Destination: ${audioFileName}, 
            Source: ${this.videoYoutubePath}`));

        ffmpeg(fs.createReadStream(this.videoYoutubePath))
            /** currentSeekTime */
            .seekInput(seekTime)
            .toFormat('mp3')
            .duration(duration)
            .on('end', () => {
                this.onEnd();
            })
            .on('stderr', (line: string) => {
                if (line.indexOf('size=') > -1) {
                    console.log(`command line: ${line}`);
                }
            })
            .on('error', (err) => {
                this.onError(err);
            })
            .writeToStream(stream, { end: true })
    }

    private onError(err: any): void {
        console.log(chalk.redBright('error happended: ', err));
        this.res.status(500).json({ errorMessage: err.message, success: false });
    }

    private onEnd(): void {
        /** if we reached the end of the tracklist or the tracklist is 2 of length(1 song out of the whole album?
         *  Remove if this is not logical at all.) 
         */
        if (this.counter >= this.playlistArr.length || this.playlistArr.length <= 2) {
            this.counter = 0;
            this.res.status(200).json({ success: true });
        } else if (this.playlistArr.length === 1) {
            this.invalidPlaylistLengthErrorHandle();
        } else {
            let { nextDuration, songBegin } = this.generateNextDuration(this.lengthInSeconds);

            if (nextDuration === null) {
                this.invalidPlaylistErrorHandle();
            }

            /** call the function again with the next song data */
            this.storeFile(songBegin, nextDuration, this.playlistArr[this.counter].songName);
            this.counter++;
        }
    }

    private noVideoInfoErrorHandle(): void {
        this.res.status(500).json({
            erroMessage: 'No video info for this file. Please, select another one',
            success: false
        } as BaseResponse);
    }

    private invalidPlaylistLengthErrorHandle(): void {
        this.res
            .status(500)
            .json({ errorMessage: 'You cannot send only 1 track in an album!', success: false } as BaseResponse);
    }

    private invalidPlaylistErrorHandle(): void {
        this.res.status(500).json(
            {
                errorMessage: 'Invalid tracklist! For videos longer than an hour the format should be either hh:mm:ss or h:mm:ss.',
                success: false
            } as BaseResponse);
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
