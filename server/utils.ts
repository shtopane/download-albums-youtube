import { Playlist } from "./models/playlist";

class Utils {
    private unknownSongCounter = 0;

    public getSongsObjects(playlist: string): Playlist[] {
        if (!playlist || playlist === null) {
            throw new Error('No playlist!');
        }

        let str = playlist;
        let strReplaced: string[];
        let songObjects: Playlist[] = [];

        /** 
         * trim whitespace .replace(/\s/g, "") 
         * trim new lines /(\r\n|\n|\r)/gm
         * */
        strReplaced = str.split(/(\r\n|\n|\r)/gm);

        let songObject: Playlist;
        let fullSongName: string;

        for (let replacedString of strReplaced) {
            if (replacedString.trim()) {
                fullSongName = replacedString.trim();

                songObject = this.cutStringToTimeOnly(fullSongName);
                songObjects.push(songObject)
            }
        }

        return songObjects.slice();
    }

    /** Get seconds from tracklist item time - the format is Min:Sec -> so 01:16 */
    public getSecondsFromTimeString(videoTotalSeconds: string, timeFirstSong: string, timeSecondSong: string): number {
        videoTotalSeconds = videoTotalSeconds || '0';
        let totalVideoLength = this.getHoursFromSeconds(videoTotalSeconds);
        let hours = totalVideoLength.hours;

        let firstSongTimesArr = timeFirstSong.split(':');
        let secondSongTimesArr = timeSecondSong.split(':');

        if (hours > 0 && (firstSongTimesArr.length < 3 || secondSongTimesArr.length < 3)) {
            /** Invalid playlist case */
            return null;
        }

        let firstSongDate = new Date();
        let secondSongDate = new Date();

        if (hours === 0) {
            firstSongDate.setMinutes(+firstSongTimesArr[0], +firstSongTimesArr[1])
            secondSongDate.setMinutes(+secondSongTimesArr[0], +secondSongTimesArr[1])
        } else if (hours > 0) {
            firstSongDate.setHours(+firstSongTimesArr[0]);
            secondSongDate.setHours(+secondSongTimesArr[0]);
            firstSongDate.setMinutes(+firstSongTimesArr[1], +firstSongTimesArr[2])
            secondSongDate.setMinutes(+secondSongTimesArr[1], +secondSongTimesArr[2])
        }

        let diff = secondSongDate.getTime() - firstSongDate.getTime();
        let seconds = Math.floor((diff / 1000));
        console.log('getSecondsFromTimeString|firstDate', firstSongDate)
        console.log('getSecondsFromTimeString|secondSongDate', secondSongDate)
        console.log('getSecondsFromTimeString|diff', diff)
        console.log('getSecondsFromTimeString|seconds', seconds)
        return seconds;
    }

    public getHoursFromSeconds(lengthInSeconds: string): { hours: number; minutes: number; seconds: number } {
        const duration = Number(lengthInSeconds);
        console.log('getHoursFromSeconds|duration', duration);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration % 3600 / 60);
        const seconds = Math.floor(duration % 3600 % 60);

        console.log(`Hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`);

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    public cutStringToTimeOnly(str: string): Playlist {
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
}


export const utils = new Utils();