/** match closing bracket OR TEST (?<=\d)[)](?=\s)*/
export const bracketRegExp = /(?<=\d)[)](?=\s)/gm; // /[)]/gm;
/** match new lines */
export const newLinesRegExp = /(\r\n|\n|\r)/gm;
/** match whitespace between 2 digits(end of the first song, begin of another) */
export const whiteSpaceBetweenTwoDigitsRegExp = /(?<=\d)\s+(?=\d)/gm; // /(?<=\d) (?=\d)/gm;
/** match whitespace before digit(when song begin is before song name in the tracklist) */
export const whiteSpaceBeforeDigitRegExp = / (?=\d)/gm;
/** match digit followed by a dot. I use this to get the song number in the tracklist */
export const numberFollowedByDotRegExp = /(\d+[.])/gm;
/** 
 * Regular expression for digits and :(2 : and 3 couple of digits) -  \d*[:]*\d*[:]\d*
 * Used to extract playable times from tracklist item - so for example if the tracklist item is
 * Hope & Pray - 00:00
 * We want the time that this song is played in the playlist (00:00)
 * */
export const trackTimeRegExp = /\d*[:]*\d+[:]\d+/;
/** match track name. TODO: this does not include some special characters at the end like ')'. */
/** REG FOR WORDS \s(\w+(?:$|\s+))+ */
export const trackNameRegExp = /[a-zA-Z]+\D+[a-zA-Z]/;
