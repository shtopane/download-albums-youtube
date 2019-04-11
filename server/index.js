const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');
const utils = require('./utils');

const app = express();
const port = 4000;


app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server on port: ' + port);
});

/** Object with string - playlist: string */
let playlist = {};
let url = '';
let videoLenghtObject = {};
let videoYoutubePath;
let playlistArr = [];
app.post('/songs', async (req, res) => {
    playlist = req.body.playlist;
    url = req.body.url;
    playlistArr = utils.getSongsObjects(playlist);
    console.log('playlist', playlist);
    console.log('playlistArr', playlistArr);

    const videoInfo = await ytdl.getInfo(url);
    let fileTitle;
    let formats;
    // const isFull = videoInfo.full;
    let lengthInSeconds;


    let chosenFormat;
    // const isPrivate = videoInfo.player_response.videoDetails.isPrivate;
    if (videoInfo) {

        fileTitle = videoInfo.title;
        formats = videoInfo.formats;
        // const isFull = videoInfo.full;
        lengthInSeconds = videoInfo.length_seconds;
        // const tumbnail = videoInfo.thumbnail_url;
        // const shortDescription = videoInfo.player_response.videoDetails.shortDescription;

        chosenFormat = ytdl.chooseFormat(formats, {});
    }
    videoLenghtObject = utils.getHoursFromSeconds(lengthInSeconds);

    videoYoutubePath = `output/${fileTitle || 'album'}.avi`;
    ytdl(url, {
        format: chosenFormat || 'avi',
    })
        .pipe(fs.createWriteStream(videoYoutubePath))
        .on('finish', () => {
            console.log('download completed!', 'color: red;');
            // res.header('Content-Disposition', `attachment; filename="${fileTitle || 'song'}.mp3"`);

            duration = utils.getSecondsFromTimeString(lengthInSeconds, playlistArr[0].songBegin, playlistArr[1].songBegin);

            storeFile(playlistArr[0].songBegin, duration, playlistArr[0].songName)
        });
    let counter = 1;
    function storeFile(seekTime, duration, outputFileName) {
        console.log(`Seektime : ${seekTime}, Duration: ${duration}, File: ${outputFileName}`);
        let audioFileName = `output/${outputFileName}.mp3`;
        let stream = fs.createWriteStream(audioFileName);
        let start = Date.now();
        /** downloading the album every time? */
        // ytdl(url, {
        //     format: chosenFormat || 'avi',
        // })
        ffmpeg(fs.createReadStream(videoYoutubePath))
            /** currentSeekTime */
            .seekInput(seekTime)
            .toFormat('mp3')
            .duration(duration)
            .on('end', () => {
                console.log('counter', counter);
                if (counter >= playlistArr.length) {
                    console.log('NO MORE SONGS!');

                    res.sendStatus(200);
                } else {
                    /** Put the end song endTime to be end of the file */
                    let songBegin = playlistArr[counter].songBegin;
                    let songEnd = playlistArr[counter + 1]
                        ? playlistArr[counter + 1].songBegin
                        : `${videoLenghtObject.minutes}:${videoLenghtObject.seconds}`;

                    /** Calculate next song's duration */
                    let nextDuration = utils.getSecondsFromTimeString(lengthInSeconds, songBegin, songEnd);
                    console.log('in on end: ', songBegin, nextDuration, playlistArr[counter].songName)
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

    // videoLenghtObject = utils.getHoursFromSeconds(lengthInSeconds);

    // videoYoutubePath = `output/${fileTitle || 'album'}.avi`;
    // ytdl(url, {
    //     format: chosenFormat || 'avi',
    // })
    //     .pipe(fs.createWriteStream(videoYoutubePath))
    //     .on('finish', () => {
    //         console.log('download completed!', 'color: red;');
    //         res.header('Content-Disposition', `attachment; filename="${fileTitle || 'song'}.mp3"`);

    //         duration = utils.getSecondsFromTimeString(lengthInSeconds, playlistArr[0].songBegin, playlistArr[1].songBegin);

    //         storeFile(playlistArr[0].songBegin, duration, playlistArr[0].songName)
    //     });

    // res.status(200).send('OK');
});

app.get('/playlist', (req, res) => {
    const playlist = {
        playlistArr: playlistArr.slice()
    }

    res.status(200).json(playlist);
})