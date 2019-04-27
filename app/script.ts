import { Playlist } from "./models/playlist";
import { TracklistInfo } from "./models/tracklist-info";
import { BaseResponse } from "./models/base-response";
import * as regexConstants from './constants/regex.constants';

const serverUrl = 'http://localhost:4000';

const convertBtn: HTMLButtonElement = document.querySelector('.convert-button');
const inputEl: HTMLInputElement = document.querySelector('.URL-input');
const textareaEl: HTMLTextAreaElement = document.querySelector('#description');
const loader = document.getElementById('loader');
const container = document.getElementById('container');
const playlistEl = document.getElementById('playlist');

/** TEST DATA */
const playlist: TracklistInfo = {
    "playlist": [
        {
            "songBegin": "00:00",
            "songName": "Muddy waters",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "03:45",
            "songName": "No witness",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "07:08",
            "songName": "Lost on you",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "11:30",
            "songName": "Up against me",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "14:27",
            "songName": "Tightrope",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "17:55",
            "songName": "Other people",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "21:51",
            "songName": "Into the wild",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "25:26",
            "songName": "Strange",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "29:12",
            "songName": "Death Valley",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        },
        {
            "songBegin": "31:55",
            "songName": "You want it all",
            "tumbnail": "https://i.ytimg.com/vi/hsUimLUG7U4/default.jpg"
        }
    ],
    "albumName": "LP - Lost On You (Album NoStop Mix)"
};

convertBtn.addEventListener('click', () => {
    let start = Date.now();
    const url = inputEl.value;
    const tracklistInfo = textareaEl.value;

    if (!url) {
        showError('You should place an url!');
        return;
    } else if (!tracklistInfo) {
        showError('You should provide a tracklist!');
        return;
    }

    const body = JSON.stringify({ playlist: tracklistInfo, url: url });
    const playlist = getSongsObjects(tracklistInfo);
    console.log('playlistArr', playlist);

    return;
    showLoader(true);

    fetch(`${serverUrl}/songs`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then((json: BaseResponse) => {
            showLoader(false);
            console.log('response', json);

            if (json.success) {
                console.log(`done in - ${(Date.now() - start) / 1000}s`);
                fetch(`${serverUrl}/playlist`)
                    .then(res => res.json())
                    .then((albumInfo: TracklistInfo) => {
                        console.log('playlist from server');
                        generatePlaylist(albumInfo.playlist, albumInfo.albumName);
                        addDownloadLinks(albumInfo.albumName);
                        addListenLinks(albumInfo.albumName);
                    });
            } else {
                showError(json.errorMessage);
            }
        });
});

const getSongsObjects = (playlist: string): Playlist[] => {
    if (!playlist || playlist === null) {
        throw new Error('No playlist!');
    }
    console.log('playlist str', playlist);
    let str = playlist;
    let strReplaced: string[];
    let songObjects: Playlist[] = [];

    /** 
     * trim whitespace .replace(/\s/g, "") 
     * trim new lines /(\r\n|\n|\r)/gm
     * regex to split by whitespace between 2 digits(end of the first song, begin of another) (?<=\d) (?=\d)
     * */
    // const bracketRegExp = /[)]/gm;
    // const newLinesRegExp = /(\r\n|\n|\r)/gm;
    // const whiteSpaceBetweenTwoDigitsRegExp = /(?<=\d) (?=\d)/gm;

    /** replace closing bracket with empty string(if any) */
    str = str.replace(regexConstants.bracketRegExp, '');
    strReplaced = str.split(regexConstants.whiteSpaceBetweenTwoDigitsRegExp);

    if (strReplaced.length < 2) {
        strReplaced = str.split(regexConstants.newLinesRegExp);
    }

    console.log('replaced string', strReplaced);

    let songObject: Playlist;
    let fullSongName: string;

    for (let replacedString of strReplaced) {
        if (replacedString.trim()) {
            fullSongName = replacedString.trim();

            songObject = cutStringToTimeOnly(fullSongName);
            songObjects.push(songObject)
        }
    }

    return songObjects.slice();
}

const cutStringToTimeOnly = (str: string): Playlist => {
    if (!str || str === null) {
        throw new Error('No input string provided!');
    }

    let result: Playlist = {
        songBegin: '',
        songName: ''
    };

    /** 
     * Regular expression for digits and :(2 : and 3 couple of digits) -  \d*[:]*\d*[:]\d*
     * Used to extract playable times from tracklist item - so for example if the tracklist item is
     * Hope & Pray - 00:00
     * We want the time that this song is played in the playlist (00:00)
     * */
    let matchedTime = str.match(/\d*[:]*\d+[:]\d+/);

    if (matchedTime === null) {
        result.songBegin = '0:00'
        return result;
    } else {
        result.songBegin = matchedTime[0];
    }

    /** New Regex -  [a-zA-Z]+\D+[a-zA-Z]  OLD REGEX - \s(\w+(?:$|\s+))+ */
    let matchedSongName = str.match(/[a-zA-Z]+\D+[a-zA-Z]/);

    if (matchedSongName === null) {
        result.songName = `UnknownSong${++this.unknownSongCounter}`;
        return result;
    } else {

        /** REG FOR WORDS \s(\w+(?:$|\s+))+ */
        result.songName = matchedSongName[0];
        result.songName = result.songName.trim();
    }

    return result;
}

const showError = (error: string): void => {
    const alert = document.querySelector('.alert');
    const alertText = document.querySelector('.alert-text');

    alert.classList.remove('hidden');
    alertText.textContent = error;

    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
};


const showLoader = (showLoader: boolean): void => {
    if (showLoader) {
        loader.classList.remove('hidden');
        container.classList.add('blur');
    } else {
        loader.classList.add('hidden');
        container.classList.remove('blur');
    }
}

const addDownloadLinks = (albumName: string): void => {
    /** Strange but typescript NodeList<Element> is not iteratable. I am looking into this
     *  TODO: Check this and fix it.
     */
    const downloadBtnCollection = document.querySelectorAll('.download-btn') as unknown as Array<Element>;

    for (let downloadBtn of downloadBtnCollection) {
        downloadBtn.addEventListener('click', (event) => {
            const target: HTMLButtonElement = <HTMLButtonElement>event.target;
            window.location.href = `${serverUrl}/download?albumName=${albumName}&songName=${target.id}`;
        });
    }
}

const addListenLinks = (albumName: string): void => {
    const listenBtnCollection = document.querySelectorAll('.listen-btn') as unknown as Array<Element>;

    for (let listenBtn of listenBtnCollection) {
        listenBtn.addEventListener('click', (event) => {
            const target: HTMLButtonElement = <HTMLButtonElement>event.target;
            const dataListen = target.getAttribute('data-listen');
            window.location.href = `${serverUrl}/listen?albumName=${albumName}&songName=${dataListen}`;
        });
    }
}

const generatePlaylist = (playlistArr: Playlist[], albumName: string): void => {
    const tracklistEl = document.querySelector('.tracklist');
    let albumTitle = <Element>playlistEl.querySelector('h2').cloneNode();
    albumTitle.textContent = albumName;
    albumTitle.classList.remove('hidden');
    let tracklistCopy: HTMLDivElement;
    let currentTrack: Playlist;
    let downloadBtn: HTMLButtonElement;
    let listenBtn: HTMLButtonElement;
    let tumbnailEl: HTMLImageElement;
    let songEl: HTMLSpanElement;

    for (let i = 0; i < playlistArr.length; i++) {
        currentTrack = playlistArr[i];
        tracklistCopy = <HTMLDivElement>tracklistEl.cloneNode(true);
        tumbnailEl = tracklistCopy.querySelector('img');
        songEl = tracklistCopy.querySelector('.song-info');
        downloadBtn = tracklistCopy.querySelector('.download-btn');
        listenBtn = tracklistCopy.querySelector('.listen-btn');

        tracklistCopy.classList.remove('hidden');
        downloadBtn.id = currentTrack.songName;
        listenBtn.setAttribute('data-listen', currentTrack.songName);
        console.log(listenBtn);
        songEl.textContent = `${currentTrack.songName} - ${currentTrack.songBegin}`;
        tumbnailEl.src = currentTrack.tumbnail;

        console.log(tracklistCopy);
        playlistEl.classList.remove('hidden');
        playlistEl.appendChild(tracklistCopy);
    }
}

// generatePlaylist(playlist.playlist, playlist.albumName);