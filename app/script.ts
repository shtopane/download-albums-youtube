import { Playlist } from "./models/playlist";
import { TracklistInfo } from "./models/tracklist-info";

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
    const body = JSON.stringify({ playlist: textareaEl.value, url: url });

    showLoader(true);

    fetch(`${serverUrl}/songs`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        showLoader(false);
        console.log(`done in - ${(Date.now() - start) / 1000}s`);

        fetch(`${serverUrl}/playlist`).then(res => res.json()).then((albumInfo: TracklistInfo) => {
            console.log('playlist from server');
            generatePlaylist(albumInfo.playlist, albumInfo.albumName);
            addDownloadLinks(albumInfo.albumName);
        });
    });
});

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
    const downloadBtnCollection = document.querySelectorAll('.download-btn');

    for (let downloadBtn of downloadBtnCollection) {
        downloadBtn.addEventListener('click', (event) => {
            const target: HTMLButtonElement = <HTMLButtonElement>event.target;
            window.location.href = `${serverUrl}/download?albumName=${albumName}&songName=${target.id}`;
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
    let tumbnailEl: HTMLImageElement;
    let songEl: HTMLSpanElement;

    for (let i = 0; i < playlistArr.length; i++) {
        currentTrack = playlistArr[i];
        tracklistCopy = <HTMLDivElement>tracklistEl.cloneNode(true);
        tumbnailEl = tracklistCopy.querySelector('img');
        songEl = tracklistCopy.querySelector('.song-info');
        downloadBtn = tracklistCopy.querySelector('.download-btn');

        tracklistCopy.classList.remove('hidden');
        downloadBtn.id = currentTrack.songName;
        songEl.textContent = `${currentTrack.songName} - ${currentTrack.songBegin}`;
        tumbnailEl.src = currentTrack.tumbnail;

        console.log(tracklistCopy);
        playlistEl.classList.remove('hidden');
        playlistEl.appendChild(tracklistCopy);
    }
}

// generatePlaylist(playlist.playlist, playlist.albumName);