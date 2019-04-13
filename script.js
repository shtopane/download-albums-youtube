(function () {
    const convertBtn = document.querySelector('.convert-button');
    const inputEl = document.querySelector('.URL-input');
    const textareaEl = document.querySelector('#description');
    const loader = document.getElementById('loader');
    const container = document.getElementById('container');

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
            fetch('http://localhost:4000/playlist').then(res => res.json()).then(data => console.log('data playlist', data));
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

    const playlist = [
        {
          "songBegin": "00:30",
          "songName": "First song",
          "tumbnail": "https://i.ytimg.com/vi/pQCfnMeEv3w/default.jpg"
        },
        {
          "songBegin": "02:50",
          "songName": "Second song",
          "tumbnail": "https://i.ytimg.com/vi/pQCfnMeEv3w/default.jpg"
        }
      ];
})();