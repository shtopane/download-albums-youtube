(function () {
    const convertBtn = document.querySelector('.convert-button');
    const inputEl = document.querySelector('.URL-input');
    
    const textareaEl = document.querySelector('#description');
    const loader = document.getElementById('loader');
    const container = document.getElementById('container');
    const playlistEl = document.getElementById('playlist');

    convertBtn.addEventListener('click', function () {
        let start = Date.now();
        const url = inputEl.value;
        const body = JSON.stringify({ playlist: textareaEl.value, url: url });
        loader.classList.remove('hidden');
        container.classList.add('blur');
        fetch(`http://localhost:4000/songs`, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(json => {
            loader.classList.add('hidden');
            container.classList.remove('blur');
            console.log(`done in - ${(Date.now() - start) / 1000}s`);

            console.log('response from server', json);
            fetch('http://localhost:4000/playlist').then(res => res.json()).then(albumInfo => {
                console.log('playlist from server');
                generatePlaylist(albumInfo.playlist, albumInfo.albumName);

                const downloadBtnCollection = document.querySelectorAll('.download-btn');
                for(let downloadBtn of downloadBtnCollection){
                    downloadBtn.addEventListener('click', function(event){
                        window.location.href = `http://localhost:4000/download?albumName=${playlist.albumName}&songName=${event.target.id}`;
                    });
                }
            });
            // window.location.href = `http://localhost:4000/download?URL=${url}`;

        })
        // sendUrl(url);
    });

    function sendUrl(url) {
        if (url !== '' && url !== null) {
            // fetch(`http://localhost:4000/download?URL=${url}`, {
            //     method: 'GET'
            // }).then(res => res.json()
            //     .then(json => console.log('response from server', json)))
            window.location.href = `http://localhost:4000/download?URL=${url}`;
        }
    }

    const playlist = {
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
      }

      function generatePlaylist(playlistArr, albumName){
          const tracklistEl = document.querySelector('.tracklist');
          let albumTitle = playlistEl.querySelector('h2');
          albumTitle.textContent = albumName;

          let tracklistCopy;
          let currentTrack;
          let downloadBtn;
          let tumbnailEl;
          let songEl;

          for(let i =0; i<playlistArr.length; i++){
              currentTrack = playlistArr[i];
              tracklistCopy = tracklistEl.cloneNode(true);
              tracklistCopy.classList.remove('hidden');
              tumbnailEl = tracklistCopy.querySelector('img');
              songEl = tracklistCopy.querySelector('.song-info');
              downloadBtn = tracklistCopy.querySelector('.download-btn');
              downloadBtn.id = currentTrack.songName;
              songEl.textContent = `${currentTrack.songName} - ${currentTrack.songBegin}`;
              tumbnailEl.src = currentTrack.tumbnail;
              
              console.log(tracklistCopy);
              playlistEl.appendChild(tracklistCopy);
          }
      }

    // generatePlaylist(playlist.playlist, playlist.albumName);
     
})();