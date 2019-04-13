const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');
const utils = require('./utils');

const app = express();
const port = 4000;

const albumController = require('./controllers/album.controller');

app.use(express.static(__dirname + '/output'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server on port: ' + port);
});

/** Object with string - playlist: string */
let playlist = {};
let url = '';
let videoLenghtObject = {};
let videoYoutubePath;
let fileTitle = 'album';
let playlistArr = [];
let tumbnail;

app.post('/songs', async (req, res) => {
    playlist = req.body.playlist;
    url = req.body.url;
    playlistArr = utils.getSongsObjects(playlist);
    console.log('playlist', playlist);
    console.log('playlistArr', playlistArr);

    const videoInfo = await ytdl.getInfo(url);
    let formats;

    // const isFull = videoInfo.full;
    let lengthInSeconds;


    let chosenFormat;
    // const isPrivate = videoInfo.player_response.videoDetails.isPrivate;
    if (videoInfo) {

        fileTitle = videoInfo.title;
        formats = videoInfo.formats;

        /** videoInfo.videoDetails ? videoInfo.videoDetails.thumbnail: videoInfo.thumbnail_url; */
        tumbnail = videoInfo.thumbnail_url;
        // const isFull = videoInfo.full;
        lengthInSeconds = videoInfo.length_seconds;
        // const tumbnail = videoInfo.thumbnail_url;
        // const shortDescription = videoInfo.player_response.videoDetails.shortDescription;

        chosenFormat = ytdl.chooseFormat(formats, {});
    }
    videoLenghtObject = utils.getHoursFromSeconds(lengthInSeconds);
    videoYoutubePath = `output/${fileTitle}.avi`;
    console.log('tumbnails', tumbnail);
    ytdl(url, {
        format: chosenFormat || 'avi',
    })
        .pipe(fs.createWriteStream(videoYoutubePath))
        .on('finish', () => {
            console.log('download completed!', 'color: red;');

            duration = utils.getSecondsFromTimeString(lengthInSeconds, playlistArr[0].songBegin, playlistArr[1].songBegin);

            storeFile(playlistArr[0].songBegin, duration, playlistArr[0].songName)
        });

    let counter = 1;
    function storeFile(seekTime, duration, outputFileName) {
        const outPutDir = `output/${fileTitle}`;
        if (!fs.existsSync(outPutDir)){
            fs.mkdirSync(outPutDir);
        }
        console.log(`Seektime : ${seekTime}, Duration: ${duration}, File: ${outputFileName}`);
        let audioFileName = `${outPutDir}/${outputFileName}.mp3`;
        let stream = fs.createWriteStream(audioFileName);
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
                    const endSongTimeStr = `${videoLenghtObject.hours > 0 ? videoLenghtObject.hours + ':': ''}${videoLenghtObject.minutes}:${videoLenghtObject.seconds}`;
                    let songBegin = playlistArr[counter].songBegin;
                    let songEnd = playlistArr[counter + 1]
                        ? playlistArr[counter + 1].songBegin
                        : endSongTimeStr;

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
    // res.status(200).send('OK');
});

app.get('/playlist', (req, res) => {
    for(let track of playlistArr){
        track.tumbnail = tumbnail;
    }
    console.log(playlistArr);
    console.log(fileTitle);
    res.status(200).json({playlist: playlistArr.slice(), albumName: fileTitle});
})

app.get('/download', (req, res)=>{
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
       if(!err) {
           console.log('competed!');
       } else{
           console.log('error happened: ', err);
       }
    });
})