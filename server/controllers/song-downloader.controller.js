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
var counter = 1;
var SongDownloaderController = /** @class */ (function () {
    function SongDownloaderController() {
        this.songsRootFolter = 'singleSongs';
    }
    SongDownloaderController.prototype.handleDownloadSong = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, videoInfo, fileTitle, thumbnail, thumbnailUrl, newName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.req = req;
                        this.res = res;
                        url = this.req.body.url;
                        this.res = res;
                        console.log('url', url);
                        if (!ytdl.validateURL(url)) {
                            this.res.status(400).send({
                                errorMessage: "The url you provided seems invalid. You gave " + url,
                                success: false
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, ytdl.getInfo(url)];
                    case 1:
                        videoInfo = _a.sent();
                        fileTitle = videoInfo.videoDetails.title || videoInfo.player_response.videoDetails.title;
                        thumbnail = videoInfo.player_response.videoDetails.thumbnail && videoInfo.player_response.videoDetails.thumbnail.thumbnails.length ?
                            videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url : undefined;
                        thumbnailUrl = videoInfo.thumbnail_url || thumbnail;
                        if (!fs.existsSync(this.songsRootFolter)) {
                            fs.mkdirSync(this.songsRootFolter);
                        }
                        newName = "song" + ++counter;
                        ytdl(url, { filter: 'audioonly' })
                            .pipe(fs.createWriteStream(this.songsRootFolter + "/" + newName + ".mp4")).on('finish', function () {
                            console.log('finished');
                            var response = {
                                songName: newName,
                                success: true,
                                thumbnail: thumbnail,
                                thumbnail_url: thumbnailUrl
                            };
                            res.status(200).json(response);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return SongDownloaderController;
}());
exports.SongDownloaderController = SongDownloaderController;
