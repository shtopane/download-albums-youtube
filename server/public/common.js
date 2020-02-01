(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/services/playlist/playlist.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/services/playlist/playlist.service.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var environment_1 = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var PlaylistService = /** @class */ (function () {
    function PlaylistService(http) {
        this.http = http;
    }
    PlaylistService.prototype.downloadYotubePlaylist = function (url) {
        return this.http.post(environment_1.environment.serverUrl + "/download-playlist", { url: url });
    };
    PlaylistService.prototype.sendPlaylist = function (url, playlist) {
        return this.http.post(environment_1.environment.serverUrl + "/songs", { playlist: playlist, url: url });
    };
    PlaylistService.prototype.getPlaylist = function () {
        return this.http.get(environment_1.environment.serverUrl + "/playlist");
    };
    PlaylistService.prototype.setLocalPlaylist = function (playlist) {
        if (playlist.albumName && playlist.playlist) {
            this.playlist = playlist;
        }
    };
    PlaylistService.prototype.getLocalPlaylist = function () {
        var localPlaylist = JSON.parse(localStorage.getItem('playlist'));
        if (!this.playlist) {
            this.playlist = localPlaylist;
        }
        return rxjs_1.of(tslib_1.__assign({}, this.playlist));
    };
    PlaylistService.ctorParameters = function () { return [
        { type: http_1.HttpClient }
    ]; };
    PlaylistService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;


/***/ })

}]);
//# sourceMappingURL=common.js.map