"use strict";
exports.__esModule = true;
var regexConstants = require("../constants/regex.constants");
/*
 *  Check how many times a char is in string -> .split( new RegExp( ":", "gi" ) ).length-1
 *  https://stackoverflow.com/a/2903576
 */
var Utils = /** @class */ (function () {
    function Utils() {
        this.unknownSongCounter = 0;
    }
    Utils.prototype.getSongsObjects = function (playlist) {
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
        var minimumAcceptedSongsComputed = 3;
        var numberOfSongsInPlaylist = this.getLengthOfPlaylist(playlist);
        var computedPlaylist = [];
        var songObjects = [];
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
        var songObject;
        var fullSongName;
        for (var _i = 0, computedPlaylist_1 = computedPlaylist; _i < computedPlaylist_1.length; _i++) {
            var replacedString = computedPlaylist_1[_i];
            if (replacedString.trim()) {
                fullSongName = replacedString.trim();
                songObject = this.cutStringToTimeOnly(fullSongName);
                console.log(songObject);
                if (songObject && Object.keys(songObject).length > 0) {
                    songObjects.push(songObject);
                }
            }
        }
        return songObjects.slice();
    };
    /** Get the last number of the playlist. With this we are getting the length of the playlist. */
    Utils.prototype.getLengthOfPlaylist = function (playlistStr) {
        var result;
        var songNumbers = playlistStr.match(regexConstants.numberFollowedByDotRegExp);
        if (songNumbers === null) {
            return result;
        }
        var lastSongNumber = songNumbers[songNumbers.length - 1];
        lastSongNumber = lastSongNumber.replace(regexConstants.nonDigitRegExp, '');
        result = !isNaN(+lastSongNumber) ? +lastSongNumber : undefined;
        return result;
    };
    /** Get seconds from playlist item time - the format is Min:Sec -> so 01:16 */
    Utils.prototype.getSecondsFromTimeString = function (videoTotalSeconds, timeFirstSong, timeSecondSong) {
        videoTotalSeconds = videoTotalSeconds || '0';
        var totalVideoLength = this.getHoursFromSeconds(videoTotalSeconds);
        var hours = totalVideoLength.hours;
        console.log('hours:', hours);
        var columnRegExp = new RegExp(":", "gi");
        var columnsFirstSong = timeFirstSong.split(columnRegExp).length - 1;
        var columnsSecondSong = timeSecondSong.split(columnRegExp).length - 1;
        /** TODO: Test this. It should prefix the hour if there is none in the playlist. */
        if (columnsFirstSong < 2 && hours > 0) {
            timeFirstSong = '00:' + timeFirstSong;
            console.log('timesFirstSong', timeFirstSong);
        }
        if (columnsSecondSong < 2 && hours > 0) {
            timeSecondSong = '00:' + timeSecondSong;
        }
        var firstSongTimesArr = timeFirstSong.split(':');
        var secondSongTimesArr = timeSecondSong.split(':');
        /** If the user passed the play time in the format 03:25 but the file is longer than and hour,
         *  then we will have the times arrays have length less than 3. So just the minutes and seconds set.
         *  We need the hours, minutes and seconds set in this case.
         *  TODO: If this is the case prefix the hour automatically.
         */
        if (hours > 0 && (firstSongTimesArr.length < 3 || secondSongTimesArr.length < 3)) {
            /** Invalid playlist case */
            return null;
        }
        var firstSongDate = new Date();
        var secondSongDate = new Date();
        if (hours === 0) {
            firstSongDate.setMinutes(+firstSongTimesArr[0], +firstSongTimesArr[1]);
            secondSongDate.setMinutes(+secondSongTimesArr[0], +secondSongTimesArr[1]);
        }
        else if (hours > 0) {
            firstSongDate.setHours(+firstSongTimesArr[0]);
            secondSongDate.setHours(+secondSongTimesArr[0]);
            firstSongDate.setMinutes(+firstSongTimesArr[1], +firstSongTimesArr[2]);
            secondSongDate.setMinutes(+secondSongTimesArr[1], +secondSongTimesArr[2]);
        }
        var diff = secondSongDate.getTime() - firstSongDate.getTime();
        var durationOfSong = Math.floor((diff / 1000));
        return durationOfSong;
    };
    Utils.prototype.getHoursFromSeconds = function (lengthInSeconds) {
        var duration = Number(lengthInSeconds);
        var hours = Math.floor(duration / 3600);
        var minutes = Math.floor(duration % 3600 / 60);
        var seconds = Math.floor(duration % 3600 % 60);
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    };
    Utils.prototype.cutStringToTimeOnly = function (str) {
        if (!str || str === null) {
            throw new Error('No input string provided!');
        }
        str = str.trim();
        var result = {
            startTime: undefined,
            name: undefined
        };
        var matchedTime = str.match(regexConstants.trackTimeRegExp);
        if (matchedTime === null) {
            return;
        }
        else {
            result.startTime = matchedTime[0];
        }
        var matchedSongName = str.match(regexConstants.trackNameRegExp);
        if (matchedSongName === null) {
            console.log('str', str);
            result.name = "UnknownSong" + ++this.unknownSongCounter;
            return result;
        }
        else {
            result.name = matchedSongName[0];
            result.name = result.name.trim();
            console.log('matched song name', result.name);
        }
        return result;
    };
    Utils.prototype.makeStringSafeForFolderCreate = function (str) {
        return str.replace(/[:$\\$//\s]/g, '');
    };
    return Utils;
}());
var utils = new Utils();
exports["default"] = utils;
