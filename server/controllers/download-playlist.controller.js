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
var fs = require("fs");
var ytpl = require("ytpl");
var ytdl = require("ytdl-core");
var ffmpeg = require("fluent-ffmpeg");
var utils_1 = require("../utils/utils");
var DownloadPlaylistController = /** @class */ (function () {
    function DownloadPlaylistController() {
        this.counter = 0;
        this.rootDir = 'playlistsOutput';
        if (!fs.existsSync(this.rootDir)) {
            fs.mkdirSync(this.rootDir);
        }
    }
    DownloadPlaylistController.prototype.handleDownloadPlaylistFromYoutube = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, err_1, firstSongSafeTitle, firstSongTitle, firstSongUrl, generateNextSongPath, safeTitle, folder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.res = res;
                        this.req = req;
                        url = this.req.body.url;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ytpl(url)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).send({
                            errorMessage: err_1,
                            success: false
                        });
                        return [2 /*return*/];
                    case 4:
                        console.log('RESULT', result);
                        this.youtubePlaylistData = result.items;
                        if (result.estimatedItemCount > 0) {
                            firstSongSafeTitle = utils_1["default"].makeStringSafeForFolderCreate(result.items[0].title) // result.items[0].title.replace(/[:$\\$//]/g, '');
                            ;
                            firstSongTitle = firstSongSafeTitle;
                            firstSongUrl = result.items[0].shortUrl;
                            generateNextSongPath = void 0;
                            if (result.title) {
                                safeTitle = utils_1["default"].makeStringSafeForFolderCreate(result.title) // result.title.replace(/[:$\\$//]/g, '');
                                ;
                                console.log('SAFE TITLE', safeTitle);
                                this.playlistTitle = safeTitle;
                                folder = "" + safeTitle;
                                generateNextSongPath = this.generateSongPath(firstSongTitle, folder);
                            }
                            else {
                                generateNextSongPath = this.generateSongPath(firstSongTitle);
                            }
                            this.startTime = Date.now();
                            this.download(firstSongUrl, generateNextSongPath(firstSongTitle), generateNextSongPath);
                        }
                        else {
                            res.status(400).send({ errorMessage: 'There are no videos for this playlist!', success: false });
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DownloadPlaylistController.prototype.download = function (url, songPath, funcToGenerateNextSongPath) {
        var _this = this;
        console.log('[DOWNLOAD] url', url);
        console.log('[DOWNLOAD] songPath', songPath);
        var stream = ytdl(url);
        console.log(stream);
        var outStream = fs.createWriteStream(songPath);
        ffmpeg(stream)
            .toFormat('mp3')
            .audioBitrate(160)
            .on('end', function () {
            console.log('song downloaded!', songPath);
            _this.counter++;
            if (_this.youtubePlaylistData[_this.counter]) {
                var nextUrl = _this.youtubePlaylistData[_this.counter].shortUrl;
                var nextSongSafeTitle = utils_1["default"].makeStringSafeForFolderCreate(_this.youtubePlaylistData[_this.counter].title);
                var nextSongPath = funcToGenerateNextSongPath(nextSongSafeTitle);
                _this.download(nextUrl, nextSongPath, funcToGenerateNextSongPath);
            }
            else {
                console.log("Finished! It took: " + (Date.now() - _this.startTime) / 1000 + "s");
                var playlistArr = _this.youtubePlaylistData.map(function (item) {
                    return {
                        startTime: item.duration,
                        name: item.title,
                        thumbnail: item.bestThumbnail ? item.bestThumbnail.url : null
                    };
                });
                var playlistResponse = {
                    success: true,
                    albumName: _this.playlistTitle,
                    playlist: playlistArr
                };
                _this.res.status(200).send(playlistResponse);
                return;
            }
        })
            .on('stderr', function (line) {
            if (line.indexOf('size=') > -1) {
                console.log("command line: " + line);
            }
        })
            .on('error', function (err) {
            console.log('ERROR ', err);
        })
            .writeToStream(outStream, { end: true });
    };
    DownloadPlaylistController.prototype.generateSongPath = function (songName, folder) {
        var _this = this;
        return function (songName) {
            var folderName = folder;
            if (folderName && !fs.existsSync(_this.rootDir + "/" + folderName)) {
                fs.mkdirSync(_this.rootDir + "/" + folderName);
            }
            return folderName ? _this.rootDir + "/" + folderName + "/" + songName + ".mp3" : _this.rootDir + "/" + songName + ".mp3";
        };
    };
    return DownloadPlaylistController;
}());
exports.DownloadPlaylistController = DownloadPlaylistController;
