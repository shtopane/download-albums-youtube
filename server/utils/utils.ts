import * as regexConstants from '../constants/regex.constants';
import { Playlist } from '../models/playlist';
import chalk from 'chalk';


/*
 *  Check how many times a char is in string -> .split( new RegExp( ":", "gi" ) ).length-1 
 *  https://stackoverflow.com/a/2903576
 */
class Utils {
    private unknownSongCounter = 0;

    public getSongsObjects(playlist: string): Playlist[] {
        if (!playlist || playlist === null) {
            throw new Error('No playlist!');
        }
        const minimumAcceptedSongsComputed = 3;
        let numberOfSongsInPlaylist = this.getLengthOfTracklist(playlist);
        let computedPlaylist: string[];
        let songObjects: Playlist[] = [];

        /** replace closing bracket with empty string(if any) */
        // playlist = playlist.replace(regexConstants.bracketRegExp, '');

        /** TODO: Wrong logic! We spit it one way and if it is not efficient, we try the others. */
        computedPlaylist = playlist.split(regexConstants.whiteSpaceBetweenTwoDigitsRegExp);
        console.log('computed first time', computedPlaylist);
        if (computedPlaylist.length < (numberOfSongsInPlaylist || minimumAcceptedSongsComputed)) {
            computedPlaylist = playlist.split(regexConstants.newLinesRegExp);
            console.log('newLinesRegExp matched second time', computedPlaylist);
            if (computedPlaylist.length < (numberOfSongsInPlaylist || minimumAcceptedSongsComputed)) {

                computedPlaylist = playlist.split(regexConstants.whiteSpaceBeforeDigitRegExp);
                console.log('whiteSpaceBeforeDigitRegExp matched 3 time', computedPlaylist);
            }
        }

        let songObject: Playlist;
        let fullSongName: string;

        for (let replacedString of computedPlaylist) {
            if (replacedString.trim()) {
                console.log(chalk.bold('replaced string not trimmed', replacedString));
                fullSongName = replacedString.trim();
                songObject = this.cutStringToTimeOnly(fullSongName);

                if (songObject && Object.keys(songObject).length > 0) {
                    songObjects.push(songObject)
                }
            }
        }

        return songObjects.slice();
    }

    /** Get the last number of the tracklist. With this we are getting the length of the tracklist. */
    public getLengthOfTracklist(playlistStr: string): number {
        let result: number;
        let songNumbers = playlistStr.match(regexConstants.numberFollowedByDotRegExp);

        if (songNumbers === null) {
            return result;
        }

        let lastSongNumber = songNumbers[songNumbers.length - 1];

        lastSongNumber = lastSongNumber.replace(regexConstants.nonDigitRegExp, '')
        result = !isNaN(+lastSongNumber) ? +lastSongNumber : undefined;

        return result;
    }

    /** Get seconds from tracklist item time - the format is Min:Sec -> so 01:16 */
    public getSecondsFromTimeString(videoTotalSeconds: string, timeFirstSong: string, timeSecondSong: string): number {
        videoTotalSeconds = videoTotalSeconds || '0';

        const totalVideoLength = this.getHoursFromSeconds(videoTotalSeconds);
        const hours = totalVideoLength.hours;
        console.log('hours:', hours)

        const columnRegExp = new RegExp(":", "gi");
        const columnsFirstSong = timeFirstSong.split(columnRegExp).length - 1;
        const columnsSecondSong = timeSecondSong.split(columnRegExp).length - 1;

        /** TODO: Test this. It should prefix the hour if there is none in the tracklist. */
        if (columnsFirstSong < 2 && hours > 0) {
            timeFirstSong = '00:' + timeFirstSong;
            console.log('timesFirstSong', timeFirstSong);
        }
        if (columnsSecondSong < 2 && hours > 0) {
            timeSecondSong = '00:' + timeSecondSong;
        }

        const firstSongTimesArr = timeFirstSong.split(':');
        const secondSongTimesArr = timeSecondSong.split(':');

        /** If the user passed the play time in the format 03:25 but the file is longer than and hour,
         *  then we will have the times arrays have length less than 3. So just the minutes and seconds set.
         *  We need the hours, minutes and seconds set in this case.
         *  TODO: If this is the case prefix the hour automatically.
         */
        if (hours > 0 && (firstSongTimesArr.length < 3 || secondSongTimesArr.length < 3)) {
            /** Invalid playlist case */

            return null;
        }

        const firstSongDate = new Date();
        const secondSongDate = new Date();

        if (hours === 0) {
            firstSongDate.setMinutes(+firstSongTimesArr[0], +firstSongTimesArr[1])
            secondSongDate.setMinutes(+secondSongTimesArr[0], +secondSongTimesArr[1])
        } else if (hours > 0) {
            firstSongDate.setHours(+firstSongTimesArr[0]);
            secondSongDate.setHours(+secondSongTimesArr[0]);
            firstSongDate.setMinutes(+firstSongTimesArr[1], +firstSongTimesArr[2])
            secondSongDate.setMinutes(+secondSongTimesArr[1], +secondSongTimesArr[2])
        }

        const diff = secondSongDate.getTime() - firstSongDate.getTime();
        const durationOfSong = Math.floor((diff / 1000));

        return durationOfSong;
    }

    public getHoursFromSeconds(lengthInSeconds: string): { hours: number; minutes: number; seconds: number } {
        const duration = Number(lengthInSeconds);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration % 3600 / 60);
        const seconds = Math.floor(duration % 3600 % 60);

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
            songBegin: undefined,
            songName: undefined
        };

        let matchedTime = str.match(regexConstants.trackTimeRegExp);

        if (matchedTime === null) {
            return;
        } else {
            result.songBegin = matchedTime[0];
        }

        let matchedSongName = str.match(regexConstants.trackNameRegExp);
        console.log(chalk.bgBlack('original string', str));

        if (matchedSongName === null) {
            result.songName = `UnknownSong${++this.unknownSongCounter}`;
            return result;
        } else {
            result.songName = matchedSongName[0];
            result.songName = result.songName.trim();
            console.log(chalk.bgGreen('matched song name', result.songName));
        }

        return result;
    }
}


export const utils = new Utils();