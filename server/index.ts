import * as express from 'express';
import * as cors from 'cors';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import * as bodyParser from 'body-parser';

import { utils } from './utils';
import { Playlist } from './models/playlist';
import { PlaylistResponse } from './models/playlist-response';

const app: express.Application = express();
const port = 4000;

app.use(express.static(__dirname + '/output'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server on port: ' + port);
});

let playlist: string;
let url: string;
let videoYoutubePath: string;
let tumbnailUrl: string;
let duration: number;
let videoLenghtObject: { hours: number; minutes: number; seconds: number; };

let fileTitle = 'album';
let playlistArr: Playlist[] = [];

app.post('/songs', async (req, res) => {
    playlist = req.body.playlist;
    url = req.body.url;
    playlistArr = utils.getSongsObjects(playlist);
    console.log('playlist', playlist);
    console.log('playlistArr', playlistArr);

    const videoInfo: ytdl.videoInfo = await ytdl.getInfo(url);
    let formats: ytdl.videoFormat[];
    let chosenFormat: ytdl.videoFormat | string;
    let lengthInSeconds: string;

    if (videoInfo) {
        fileTitle = videoInfo.title;
        formats = videoInfo.formats;
        /** videoInfo.videoDetails ? videoInfo.videoDetails.thumbnail: videoInfo.thumbnail_url; */
        tumbnailUrl = videoInfo.thumbnail_url;
        lengthInSeconds = videoInfo.length_seconds;
        chosenFormat = <ytdl.videoFormat>ytdl.chooseFormat(formats, {});
    }

    videoLenghtObject = utils.getHoursFromSeconds(lengthInSeconds);
    videoYoutubePath = `output/${fileTitle}.avi`;
    console.log('tumbnails', tumbnailUrl);

    ytdl(url, {
        format: (chosenFormat || 'avi') as ytdl.videoFormat,
    })
        .pipe(fs.createWriteStream(videoYoutubePath))
        .on('finish', () => {
            console.log('download completed!', 'color: red;');
            duration = utils.getSecondsFromTimeString(lengthInSeconds, playlistArr[0].songBegin, playlistArr[1].songBegin);
            storeFile(playlistArr[0].songBegin, duration, playlistArr[0].songName)
        });

    let counter = 1;

    function storeFile(seekTime: string, duration: number, outputFileName: string): void {
        const outPutDir = `output/${fileTitle}`;

        if (!fs.existsSync(outPutDir)) {
            fs.mkdirSync(outPutDir);
        }

        console.log(`Seektime : ${seekTime}, Duration: ${duration}, File: ${outputFileName}`);
        let audioFileName = `${outPutDir}/${outputFileName}.mp3`;
        let stream: fs.WriteStream = fs.createWriteStream(audioFileName);
        let start = Date.now();

        ffmpeg(fs.createReadStream(videoYoutubePath))
            /** currentSeekTime */
            .seekInput(seekTime)
            .toFormat('mp3')
            .duration(duration)
            .on('end', () => {
                console.log('counter', counter);
                /** if we reached the end of the tracklist or the tracklist is 2 of length(1 song out of the whole album?
                 *  Remove if this is not logical at all.) */
                if (counter >= playlistArr.length || playlistArr.length <= 2) {
                    console.log('NO MORE SONGS!');
                    res.sendStatus(200);
                } else {
                    /** Put the end song endTime to be end of the file */
                    const hoursString = `${videoLenghtObject.hours > 0 ? videoLenghtObject.hours + ':' : ''}`;
                    const endSongTimeStr = `${hoursString}${videoLenghtObject.minutes}:${videoLenghtObject.seconds}`;
                    let songBegin = playlistArr[counter].songBegin;
                    let songEnd = playlistArr[counter + 1]
                        ? playlistArr[counter + 1].songBegin
                        : endSongTimeStr;

                    /** Calculate next song's duration */
                    let nextDuration = utils.getSecondsFromTimeString(lengthInSeconds, songBegin, songEnd);
                    /** call the function again with the next song data */
                    storeFile(songBegin, nextDuration, playlistArr[counter].songName);
                    counter++;
                    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
                }

            })
            .on('stderr', (line) => {
                console.log('command line: ', line);
            })
            .on('error', (err) => {
                console.log('error happended: ', err);
            })
            .writeToStream(stream, { end: true })
    }
});

app.get('/playlist', (req, res) => {
    for (let track of playlistArr) {
        track.tumbnail = tumbnailUrl;
    }

    console.log(playlistArr);
    console.log(fileTitle);
    const response: PlaylistResponse = {
        playlist: playlistArr.slice(),
        albumName: fileTitle
    };

    res.status(200).json(response);
})

app.get('/download', (req, res) => {
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
        } else {
            console.log('error happened: ', err);
        }
    });
});