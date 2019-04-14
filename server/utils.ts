export const utils = {
    unknownSongCounter: 0,
    getSongsObjects: function (playlist) {
        if (!playlist || playlist === null) {
            throw new Error('No playlist!');
        }

        let str = playlist;
        let songObjects = []

        /** 
         * trim whitespace .replace(/\s/g, "") 
         * trim new lines /(\r\n|\n|\r)/gm
         * */
        str = str.split(/(\r\n|\n|\r)/gm);

        let songObject = {};
        let fullSongName = '';

        for (let i = 0; i < str.length; i++) {
            if (str[i].trim()) {
                fullSongName = str[i].trim();

                songObject = this.cutStringToTimeOnly(fullSongName);
                songObjects.push(songObject)
            }
        }

        return songObjects.slice();
    },
    /** Get seconds from tracklist item time - the format is Min:Sec -> so 01:16 */
    getSecondsFromTimeString: function (videoTotalSeconds, timeFirstSong, timeSecondSong) {
        videoTotalSeconds = videoTotalSeconds || 0;
        let totalVideoLength = utils.getHoursFromSeconds(videoTotalSeconds);
        let hours = totalVideoLength.hours;
        let firstSongTimesArr = timeFirstSong.split(':');
        let secondSongTimesArr = timeSecondSong.split(':');
        let firstSongDate = new Date();
        let secondSongDate = new Date();

        if (hours === 0) {
            firstSongDate.setMinutes(firstSongTimesArr[0], firstSongTimesArr[1])
            secondSongDate.setMinutes(secondSongTimesArr[0], secondSongTimesArr[1])
        } else if (hours > 0) {
            firstSongDate.setHours(firstSongTimesArr[0]);
            secondSongDate.setHours(secondSongTimesArr[0]);
            firstSongDate.setMinutes(firstSongTimesArr[1], firstSongTimesArr[2])
            secondSongDate.setMinutes(secondSongTimesArr[1], secondSongTimesArr[2])
        }

        let diff = secondSongDate.getTime() - firstSongDate.getTime();
        let seconds = Math.floor((diff / 1000))

        return seconds;
    },
    getHoursFromSeconds: function (lenghtS) {
        const d = Number(lenghtS);
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        console.log(`Hours: ${h}, minutes: ${m}, seconds: ${s}`);

        return {
            hours: h,
            minutes: m,
            seconds: s
        };
    },
    cutStringToTimeOnly: function (str) {
        if (!str || str === null) {
            throw new Error('No input string provided!');
        }
        let result = {
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
};
