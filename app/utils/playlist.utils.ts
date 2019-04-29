import { Playlist } from "../models/playlist";

export const generatePlaylist = (playlistArr: Playlist[], albumName: string, playlistEl: HTMLElement): void => {
    const tracklistEl = document.querySelector('.tracklist');
    let albumTitle = <Element>playlistEl.querySelector('h2').cloneNode();
    let tracklistCopy: HTMLDivElement;
    let currentTrack: Playlist;
    let downloadBtn: HTMLButtonElement;
    let listenBtn: HTMLButtonElement;
    let tumbnailEl: HTMLImageElement;
    let songEl: HTMLSpanElement;

    albumTitle.textContent = albumName;
    albumTitle.classList.remove('hidden');

    for (let i = 0; i < playlistArr.length; i++) {
        currentTrack = playlistArr[i];
        tracklistCopy = <HTMLDivElement>tracklistEl.cloneNode(true);

        tumbnailEl = tracklistCopy.querySelector('img');
        songEl = tracklistCopy.querySelector('.song-info');
        downloadBtn = tracklistCopy.querySelector('.download-btn');
        listenBtn = tracklistCopy.querySelector('.listen-btn');

        tracklistCopy.classList.remove('hidden');
        downloadBtn.setAttribute('data-download', currentTrack.songName);
        listenBtn.setAttribute('data-listen', currentTrack.songName);
        songEl.textContent = `${currentTrack.songName} - ${currentTrack.songBegin}`;
        tumbnailEl.src = currentTrack.tumbnail;

        playlistEl.classList.remove('hidden');
        playlistEl.appendChild(tracklistCopy);
    }
};
