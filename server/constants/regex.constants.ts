/* match closing bracket /(?<=\d)[)](?=\s)/gm. */
export const bracketRegExp = /(?<=\d)[)](?=\s)/gm; // /[)]/gm;
/** match new lines /(\r\n|\n|\r)/gm */
export const newLinesRegExp = /(\r\n|\n|\r)/gm;
/** match whitespace between 2 digits(end of the first song, begin of another) (?<=\d)\s+(?=\d) */
export const whiteSpaceBetweenTwoDigitsRegExp = /(?<=\d)\s+(?=\d)/gm; // /(?<=\d) (?=\d)/gm;
/** match whitespace before digit(when song begin is before song name in the playlist)  (?=\d) */
export const whiteSpaceBeforeDigitRegExp = / (?=\d)/gm;
/** match digit followed by a dot. I use this to get the song number in the playlist (\d+[.]) */
export const numberFollowedByDotRegExp = /(\d+[.])/gm;
/** 
 * Regular expression for digits and :(2 : and 3 couple of digits)
 * Used to extract playable times from playlist item - so for example if the playlist item is
 * Hope & Pray - 00:00
 * We want the time that this song is played in the playlist (00:00)
 * \d*[:]*\d+[:]\d+
 * */
export const trackTimeRegExp = /\d*[:]*\d+[:]\d+/;
/** match track name. TODO: this does not include some special characters at the end like ')'. [a-zA-Z]+\D+[a-zA-Z] */
/** EXPERIMENTAL (?<=\s)\w\D+(?!=>\s)[a-zA-Z] */
/** EXPERIMENTAL 2 /(?<=\s)(\D+\w\W?)(?=\s)/gm */
/** TODO: Test MORE! */
export const trackNameRegExp = /(?<=\s)\w\D+(?!=>\s)[a-zA-Z]/gm; // /(?<=\s)(\D+\w\W?)(?=\s)/gm;
/** match non digit single character /\D/ */
export const nonDigitRegExp = /\D/;
