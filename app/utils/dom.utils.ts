export const showError = (error: string): void => {
    const alert = document.querySelector('.alert');
    const alertText = document.querySelector('.alert-text');

    alert.classList.remove('hidden');
    alertText.textContent = error;

    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
};

export const showLoader = (showLoader: boolean, loaderEl: HTMLElement, containerEl: HTMLElement): void => {
    if (showLoader) {
        loaderEl.classList.remove('hidden');
        containerEl.classList.add('blur');
    } else {
        loaderEl.classList.add('hidden');
        containerEl.classList.remove('blur');
    }
};

export const addDownloadLinks = (albumName: string, serverUrl: string): void => {
    const downloadBtnCollection = document.querySelectorAll('.download-btn');

    for (let downloadBtn of downloadBtnCollection) {
        downloadBtn.addEventListener('click', (event) => {
            const target: HTMLButtonElement = <HTMLButtonElement>event.target;
            const dataDownload = target.getAttribute('data-download');

            window.location.href = `${serverUrl}/download?albumName=${albumName}&songName=${dataDownload}`;
        });
    }
};

export const addListenLinks = (albumName: string, serverUrl: string): void => {
    const listenBtnCollection = document.querySelectorAll('.listen-btn');

    for (let listenBtn of listenBtnCollection) {
        listenBtn.addEventListener('click', (event) => {
            const target: HTMLButtonElement = <HTMLButtonElement>event.target;
            const dataListen = target.getAttribute('data-listen');
            window.location.href = `${serverUrl}/listen?albumName=${albumName}&songName=${dataListen}`;
        });
    }
};
