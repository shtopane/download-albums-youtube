"use strict";
exports.__esModule = true;
/* match closing bracket /(?<=\d)[)](?=\s)/gm. */
exports.bracketRegExp = /(?<=\d)[)](?=\s)/gm; // /[)]/gm;
/** match new lines /(\r\n|\n|\r)/gm */
exports.newLinesRegExp = /(\r\n|\n|\r)/gm;
/** match whitespace between 2 digits(end of the first song, begin of another) (?<=\d)\s+(?=\d) */
exports.whiteSpaceBetweenTwoDigitsRegExp = /(?<=\d)\s+(?=\d)/gm; // /(?<=\d) (?=\d)/gm;
/** match whitespace before digit(when song begin is before song name in the playlist)  (?=\d) */
exports.whiteSpaceBeforeDigitRegExp = / (?=\d)/gm;
/** match digit followed by a dot. I use this to get the song number in the playlist (\d+[.]) */
exports.numberFollowedByDotRegExp = /(\d+[.])/gm;
/**
 * Regular expression for digits and :(2 : and 3 couple of digits)
 * Used to extract playable times from playlist item - so for example if the playlist item is
 * Hope & Pray - 00:00
 * We want the time that this song is played in the playlist (00:00)
 * \d*[:]*\d+[:]\d+
 * */
exports.trackTimeRegExp = /\d*[:]*\d+[:]\d+/;
/** match track name. TODO: this does not include some special characters at the end like ')'. [a-zA-Z]+\D+[a-zA-Z] */
/** EXPERIMENTAL (?<=\s)\w\D+(?!=>\s)[a-zA-Z] */
/** EXPERIMENTAL 2 /(?<=\s)(\D+\w\W?)(?=\s)/gm */
/** TODO: Test MORE! */
exports.trackNameRegExp = /(?<=\s)\w\D+(?!=>\s)[a-zA-Z]/gm; // /(?<=\s)(\D+\w\W?)(?=\s)/gm;
/** match non digit single character /\D/ */
exports.nonDigitRegExp = /\D/;
