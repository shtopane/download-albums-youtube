"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ytdl = require("ytdl-core");
var fs = require("fs");
var ffmpeg = require("fluent-ffmpeg");
var utils_1 = require("../utils/utils");
var AlbumController = /** @class */ (function () {
    function AlbumController() {
        this.fileTitle = 'album';
        this.playlistArr = [];
        this.counter = 1;
    }
    AlbumController.prototype.handleAlbumSlicing = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var formats, chosenFormat, videoInfo, thumbnail, rootOutDir;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.req = req;
                        this.res = res;
                        console.log(this.req.body);
                        this.playlist = this.req.body.playlist;
                        this.url = this.req.body.url;
                        this.playlistArr = utils_1["default"].getSongsObjects(this.playlist);
                        if (!ytdl.validateURL(this.url)) {
                            this.res.status(400).send({
                                errorMessage: "The url you provided seems invalid. You gave " + this.url,
                                success: false
                            });
                            return [2 /*return*/];
                        }
                        else if (this.playlistArr.length < 2) {
                            this.res.status(400).send({
                                errorMessage: "The minimum required songs in the playlist is 2. You gave " + this.playlistArr.length,
                                success: false
                            });
                            return [2 /*return*/];
                        }
                        console.log('playlist ready!', this.playlistArr);
                        return [4 /*yield*/, ytdl.getInfo(this.url)];
                    case 1:
                        videoInfo = _a.sent();
                        if (videoInfo) {
                            formats = videoInfo.formats;
                            chosenFormat = ytdl.chooseFormat(formats, {});
                            /** TODO: Make checks for undefined! */
                            this.fileTitle = videoInfo.title || videoInfo.player_response.videoDetails.title;
                            thumbnail = videoInfo.player_response.videoDetails.thumbnail && videoInfo.player_response.videoDetails.thumbnail.thumbnails.length ?
                                videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url : undefined;
                            this.thumbnailUrl = videoInfo.thumbnail_url || thumbnail;
                            /** TODO: Make checks for undefined! */
                            this.lengthInSeconds = videoInfo.length_seconds || videoInfo.player_response.videoDetails.lengthSeconds + '';
                        }
                        else {
                            this.noVideoInfoErrorHandle();
                        }
                        console.log('length of video', this.lengthInSeconds);
                        this.videoLenghtObject = utils_1["default"].getHoursFromSeconds(this.lengthInSeconds);
                        rootOutDir = 'output';
                        if (!fs.existsSync(rootOutDir)) {
                            fs.mkdirSync(rootOutDir);
                        }
                        this.videoYoutubePath = rootOutDir + "/" + this.fileTitle + ".avi";
                        /** Calculate duration for the first song. Calculate here so that if the playlist in invalid
                        *   the user will get to know quickly?
                        */
                        this.duration = utils_1["default"]
                            .getSecondsFromTimeString(this.lengthInSeconds, this.playlistArr[0].startTime, this.playlistArr[1].startTime);
                        if (this.duration === null) {
                            console.log('ERROR!');
                            this.invalidPlaylistErrorHandle();
                        }
                        try {
                            ytdl(this.url, {
                                format: (chosenFormat || 'avi')
                            })
                                .pipe(fs.createWriteStream(this.videoYoutubePath))
                                .on('finish', function () {
                                console.log('album downloaded!');
                                _this.storeFile(_this.playlistArr[0].startTime, _this.duration, _this.playlistArr[0].name);
                            });
                        }
                        catch (error) {
                            res.status(500).send({ errorMessage: error, success: false });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AlbumController.prototype.handlePlaylist = function (req, res) {
        for (var _i = 0, _a = this.playlistArr; _i < _a.length; _i++) {
            var track = _a[_i];
            track.thumbnail = this.thumbnailUrl;
        }
        var response = {
            playlist: this.playlistArr.slice(),
            albumName: this.fileTitle,
            success: true
        };
        res.status(200).json(response);
        return;
    };
    AlbumController.prototype.storeFile = function (seekTime, duration, outputFileName) {
        var _this = this;
        var outPutDir = "output/" + this.fileTitle;
        if (!fs.existsSync(outPutDir)) {
            fs.mkdirSync(outPutDir);
        }
        var audioFileName = outPutDir + "/" + outputFileName + ".mp3";
        var stream = fs.createWriteStream(audioFileName);
        console.log("\n            Seektime : " + seekTime + ", \n            Duration: " + duration + ", \n            File: " + outputFileName + ", \n            Destination: " + audioFileName + ", \n            Source: " + this.videoYoutubePath);
        ffmpeg(fs.createReadStream(this.videoYoutubePath))
            /** currentSeekTime */
            .seekInput(seekTime)
            .toFormat('mp3')
            .audioBitrate(160)
            .duration(duration)
            .on('end', function () {
            _this.onEnd();
        })
            .on('stderr', function (line) {
            if (line.indexOf('size=') > -1) {
                console.log("command line: " + line);
            }
        })
            .on('error', function (err) {
            _this.onError(err);
        })
            .writeToStream(stream, { end: true });
    };
    AlbumController.prototype.onError = function (err) {
        console.log('error happended: ', err);
        this.res.status(500).json({ errorMessage: err.message, success: false });
    };
    AlbumController.prototype.onEnd = function () {
        /** if we reached the end of the playlist or the playlist is 2 of length(1 song out of the whole album?
         *  Remove if this is not logical at all.)
         */
        if (this.counter >= this.playlistArr.length || this.playlistArr.length <= 2) {
            this.counter = 0;
            this.res.status(200).json({ success: true });
        }
        else if (this.playlistArr.length === 1) {
            this.invalidPlaylistLengthErrorHandle();
        }
        else {
            var _a = this.generateNextDuration(this.lengthInSeconds), nextDuration = _a.nextDuration, startTime = _a.startTime;
            if (nextDuration === null) {
                this.invalidPlaylistErrorHandle();
            }
            /** call the function again with the next song data */
            this.storeFile(startTime, nextDuration, this.playlistArr[this.counter].name);
            this.counter++;
        }
    };
    AlbumController.prototype.noVideoInfoErrorHandle = function () {
        this.res.status(500).json({
            erroMessage: 'No video info for this file. Please, select another one',
            success: false
        });
    };
    AlbumController.prototype.invalidPlaylistLengthErrorHandle = function () {
        this.res
            .status(500)
            .json({ errorMessage: 'You cannot send only 1 track in an album!', success: false });
    };
    AlbumController.prototype.invalidPlaylistErrorHandle = function () {
        this.res.status(500).json({
            errorMessage: 'Invalid playlist! For videos longer than an hour the format should be either hh:mm:ss or h:mm:ss.',
            success: false
        });
    };
    AlbumController.prototype.generateNextDuration = function (lengthInSeconds) {
        /** Put the end song endTime to be end of the file */
        var hoursString = "" + (this.videoLenghtObject.hours > 0 ? this.videoLenghtObject.hours + ':' : '');
        var endSongTimeStr = "" + hoursString + this.videoLenghtObject.minutes + ":" + this.videoLenghtObject.seconds;
        var startTime = this.playlistArr[this.counter].startTime;
        var endTime = this.playlistArr[this.counter + 1]
            /** current song ends where the next begins */
            ? this.playlistArr[this.counter + 1].startTime
            /** current song ends at the end of the album */
            : endSongTimeStr;
        /** Calculate next song's duration */
        var nextDuration = utils_1["default"].getSecondsFromTimeString(lengthInSeconds, startTime, endTime);
        return {
            nextDuration: nextDuration,
            startTime: startTime
        };
    };
    return AlbumController;
}());
exports.AlbumController = AlbumController;
