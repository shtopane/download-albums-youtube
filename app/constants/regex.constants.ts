/** match closing bracket OR TEST (?<=\d)[)](?=\s)*/
export const bracketRegExp = /(?<=\d)[)](?=\s)/gm; // /[)]/gm;
/** match new lines */
export const newLinesRegExp = /(\r\n|\n|\r)/gm;
/** match whitespace between 2 digits(end of the first song, begin of another) */
export const whiteSpaceBetweenTwoDigitsRegExp = /(?<=\d) (?=\d)/gm;
