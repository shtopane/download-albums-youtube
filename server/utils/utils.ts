import chalk from 'chalk';

import { PlaylistItem } from 'sharedModels/common';

import * as regexConstants from '../constants/regex.constants';


/*
 *  Check how many times a char is in string -> .split( new RegExp( ":", "gi" ) ).length-1 
 *  https://stackoverflow.com/a/2903576
 */
class Utils {
    private unknownSongCounter = 0;

    public getSongsObjects(playlist: string): PlaylistItem[] {
        // let copy = `[00:00:00] 01. Theme From The Iron Horse
        // [00:04:32] 02. Angels
        // [00:09:35] 03. Johnny Law
        // [00:12:01] 04. Poppin' Wheelies
        // [00:14:01] 05. War
        // [00:18:27] 06. Oh My
        // [00:19:51] 07. You're Mine
        // [00:21:25] 08. Take Out
        // [00:26:10] 09. Dreaming About Dreams
        // [00:27:25] 10. Da Da Da
        // [00:29:16] 11. The Fuzz
        // [00:33:12] 12. Jean Jacket John
        // [00:34:24] 13. Ain't Right
        // [00:37:52] 14. Plan B
        // [00:39:44] 15. Peace`;
        if (!playlist || playlist === null) {
            throw new Error('No playlist!');
        }

        const minimumAcceptedSongsComputed = 3;
        let numberOfSongsInPlaylist = this.getLengthOfPlaylist(playlist);
        let computedPlaylist: string[] = [];
        let songObjects: PlaylistItem[] = [];

        /** replace closing bracket with empty string(if any) */
        // playlist = playlist.replace(regexConstants.bracketRegExp, '');

        // /** TODO: Wrong logic! We spit it one way and if it is not efficient, we try the others. */
        // computedPlaylist = playlist.split(regexConstants.whiteSpaceBetweenTwoDigitsRegExp);
        console.log('computed first time', computedPlaylist);
        if (computedPlaylist.length < (numberOfSongsInPlaylist || minimumAcceptedSongsComputed)) {
            computedPlaylist = playlist.split(regexConstants.newLinesRegExp);
            console.log('newLinesRegExp matched second time', computedPlaylist);
            if (computedPlaylist.length < (numberOfSongsInPlaylist || minimumAcceptedSongsComputed)) {

                computedPlaylist = playlist.split(regexConstants.whiteSpaceBeforeDigitRegExp);
                console.log('whiteSpaceBeforeDigitRegExp matched 3 time', computedPlaylist);
            }
        }

        let songObject: PlaylistItem;
        let fullSongName: string;

        for (let replacedString of computedPlaylist) {
            if (replacedString.trim()) {
                fullSongName = replacedString.trim();
                songObject = this.cutStringToTimeOnly(fullSongName);
                console.log(songObject);
                if (songObject && Object.keys(songObject).length > 0) {
                    songObjects.push(songObject)
                }
            }
        }

        return songObjects.slice();
    }

    /** Get the last number of the playlist. With this we are getting the length of the playlist. */
    public getLengthOfPlaylist(playlistStr: string): number {
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

    /** Get seconds from playlist item time - the format is Min:Sec -> so 01:16 */
    public getSecondsFromTimeString(videoTotalSeconds: string, timeFirstSong: string, timeSecondSong: string): number {
        videoTotalSeconds = videoTotalSeconds || '0';

        const totalVideoLength = this.getHoursFromSeconds(videoTotalSeconds);
        const hours = totalVideoLength.hours;
        console.log('hours:', hours)

        const columnRegExp = new RegExp(":", "gi");
        const columnsFirstSong = timeFirstSong.split(columnRegExp).length - 1;
        const columnsSecondSong = timeSecondSong.split(columnRegExp).length - 1;

        /** TODO: Test this. It should prefix the hour if there is none in the playlist. */
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

    public cutStringToTimeOnly(str: string): PlaylistItem {
        if (!str || str === null) {
            throw new Error('No input string provided!');
        }

        str = str.trim();
        let result: PlaylistItem = {
            startTime: undefined,
            name: undefined
        };

        let matchedTime = str.match(regexConstants.trackTimeRegExp);

        if (matchedTime === null) {
            return;
        } else {
            result.startTime = matchedTime[0];
        }

        let matchedSongName = str.match(regexConstants.trackNameRegExp);
        if (matchedSongName === null) {
            console.log('str', str)
            result.name = `UnknownSong${++this.unknownSongCounter}`;
            return result;
        } else {
            result.name = matchedSongName[0];
            result.name = result.name.trim();
            console.log(chalk.bgGreen('matched song name', result.name));
        }

        return result;
    }
}


const utils = new Utils();
export default utils;