import { TracklistInfo } from "./models/tracklist-info";
import { BaseResponse } from "./models/base-response";
import * as domUtils from './utils/dom.utils';
import { generatePlaylist } from './utils/playlist.utils';

const serverUrl = 'http://localhost:4000';

const convertBtn: HTMLButtonElement = document.querySelector('.convert-button');
const inputEl: HTMLInputElement = document.querySelector('.URL-input');
const textareaEl: HTMLTextAreaElement = document.querySelector('#description');
const downloadZipBtn: HTMLButtonElement = document.querySelector('.download-zip-btn');
const loader = document.getElementById('loader');
const container = document.getElementById('container');
const playlistEl = document.getElementById('playlist');

let start: number;

convertBtn.addEventListener('click', () => {
    start = Date.now();
    const url = inputEl.value;
    const tracklistInfo = textareaEl.value;

    if (!url) {
        domUtils.showError('You should place an url!');
        return;
    } else if (!tracklistInfo) {
        domUtils.showError('You should provide a tracklist!');
        return;
    }

    const body = JSON.stringify({ playlist: tracklistInfo, url: url });

    domUtils.showLoader(true, loader, container);

    fetch(`${serverUrl}/songs`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then((json: BaseResponse) => {
            domUtils.showLoader(false, loader, container);
            console.log('response', json);

            if (json.success) {
                fetchPlaylist();
            } else {
                domUtils.showError(json.errorMessage);
            }
        });
});

/** RAGE AGAINST THE MACHINE  (Full Album 1992) */
downloadZipBtn.addEventListener('click', (event) => {
    const target: HTMLButtonElement = <HTMLButtonElement>event.target;
    const dataDownloadZip = target.getAttribute('data-download-zip');

    const body = {
        albumName: dataDownloadZip
    };
    window.open(`${serverUrl}/downloadZip?albumName=${dataDownloadZip}`, '_blank');
    // fetch(`${serverUrl}/downloadZip`, {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json()).then(zip => console.log('downloadZip', zip))
});

const fetchPlaylist = (): void => {
    console.log(`done in - ${(Date.now() - start) / 1000}s`);
    fetch(`${serverUrl}/playlist`)
        .then(res => res.json())
        .then((albumInfo: TracklistInfo) => {
            console.log('playlist from server');
            generatePlaylist(albumInfo.playlist, albumInfo.albumName, playlistEl);
            domUtils.addDownloadLinks(albumInfo.albumName, serverUrl);
            domUtils.addListenLinks(albumInfo.albumName, serverUrl);
        });
}
