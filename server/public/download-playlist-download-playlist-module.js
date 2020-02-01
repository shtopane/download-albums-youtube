(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["download-playlist-download-playlist-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-playlist/containers/download-playlist/download-playlist.component.html":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/download-playlist/containers/download-playlist/download-playlist.component.html ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form [formGroup]=\"downloadPlaylistForm\">\r\n  <app-url-input controlName=\"url\" [parent]=\"downloadPlaylistForm\" placeholder=\"Put a Youtube playlist or channel url\"\r\n    (send)=\"onSubmit();\"></app-url-input>\r\n</form>\r\n<app-list-playlist [playlist]=\"playlist\" (listen)=\"onListenClicked($event);\" (download)=\"onDownloadClicked($event);\"\r\n  (downloadZip)=\"onDownloadZipClicked($event);\">\r\n</app-list-playlist>");

/***/ }),

/***/ "./src/app/download-playlist/containers/download-playlist/download-playlist.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/download-playlist/containers/download-playlist/download-playlist.component.scss ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rvd25sb2FkLXBsYXlsaXN0L2NvbnRhaW5lcnMvZG93bmxvYWQtcGxheWxpc3QvZG93bmxvYWQtcGxheWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/download-playlist/containers/download-playlist/download-playlist.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/download-playlist/containers/download-playlist/download-playlist.component.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var playlist_service_1 = __webpack_require__(/*! src/app/shared/services/playlist/playlist.service */ "./src/app/shared/services/playlist/playlist.service.ts");
var loader_service_1 = __webpack_require__(/*! src/app/shared/services/loader/loader.service */ "./src/app/shared/services/loader/loader.service.ts");
var environment_1 = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var DownloadPlaylistComponent = /** @class */ (function () {
    function DownloadPlaylistComponent(fb, playlistService, loaderService) {
        this.fb = fb;
        this.playlistService = playlistService;
        this.loaderService = loaderService;
    }
    Object.defineProperty(DownloadPlaylistComponent.prototype, "url", {
        get: function () {
            return this.downloadPlaylistForm ? this.downloadPlaylistForm.get('url') : undefined;
        },
        enumerable: true,
        configurable: true
    });
    DownloadPlaylistComponent.prototype.ngOnInit = function () {
        this.downloadPlaylistForm = this.fb.group({
            url: ['', forms_1.Validators.required]
        });
        // this.playlist = {
        //   albumName: 'Test Playlists',
        //   playlist: [
        //     {
        //       startTime: '1:30',
        //       name: 'The Underground Youth - Alice (Official Video)'
        //     },
        //     {
        //       startTime: '1:30',
        //       name: 'Test Song'
        //     },
        //   ]
        // }
    };
    DownloadPlaylistComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.downloadPlaylistForm.valid) {
            this.loaderService.showLoader();
            this.playlistService.downloadYotubePlaylist(this.url.value).subscribe(function (res) {
                _this.loaderService.hideLoader();
                if (res.success) {
                    _this.playlist = res;
                }
                console.log('Playlist data', _this.playlist);
            }, function (error) {
                _this.loaderService.hideLoader();
                console.log('download playlist submit error', error);
            });
        }
    };
    DownloadPlaylistComponent.prototype.onDownloadClicked = function (songInfo) {
        var url = environment_1.environment.serverUrl + "/download?isPlaylist=true&albumName=" + encodeURIComponent(songInfo.title) + "&songName=" + encodeURIComponent(songInfo.playlistItemName);
        window.open(url, '_blank');
    };
    DownloadPlaylistComponent.prototype.onListenClicked = function (songInfo) {
        console.log('listen', songInfo.title, songInfo.playlistItemName);
        var url = environment_1.environment.serverUrl + "/listen?isPlaylist=true&albumName=" + encodeURIComponent(songInfo.title) + "&songName=" + encodeURIComponent(songInfo.playlistItemName);
        window.open(url, '_blank');
    };
    DownloadPlaylistComponent.prototype.onDownloadZipClicked = function (albumName) {
        var url = environment_1.environment.serverUrl + "/downloadZip?isPlaylist=true&albumName=" + encodeURIComponent(albumName);
        window.open(url, '_blank');
    };
    DownloadPlaylistComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder },
        { type: playlist_service_1.PlaylistService },
        { type: loader_service_1.LoaderService }
    ]; };
    DownloadPlaylistComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-download-playlist',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./download-playlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-playlist/containers/download-playlist/download-playlist.component.html")).default,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./download-playlist.component.scss */ "./src/app/download-playlist/containers/download-playlist/download-playlist.component.scss")).default]
        }),
        tslib_1.__metadata("design:paramtypes", [forms_1.FormBuilder,
            playlist_service_1.PlaylistService,
            loader_service_1.LoaderService])
    ], DownloadPlaylistComponent);
    return DownloadPlaylistComponent;
}());
exports.DownloadPlaylistComponent = DownloadPlaylistComponent;


/***/ }),

/***/ "./src/app/download-playlist/download-playlist-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/download-playlist/download-playlist-routing.module.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var download_playlist_component_1 = __webpack_require__(/*! ./containers/download-playlist/download-playlist.component */ "./src/app/download-playlist/containers/download-playlist/download-playlist.component.ts");
var routes = [
    { path: '', component: download_playlist_component_1.DownloadPlaylistComponent }
];
var DownloadPlaylistRoutingModule = /** @class */ (function () {
    function DownloadPlaylistRoutingModule() {
    }
    DownloadPlaylistRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DownloadPlaylistRoutingModule);
    return DownloadPlaylistRoutingModule;
}());
exports.DownloadPlaylistRoutingModule = DownloadPlaylistRoutingModule;


/***/ }),

/***/ "./src/app/download-playlist/download-playlist.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/download-playlist/download-playlist.module.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var download_playlist_routing_module_1 = __webpack_require__(/*! ./download-playlist-routing.module */ "./src/app/download-playlist/download-playlist-routing.module.ts");
var download_playlist_component_1 = __webpack_require__(/*! ./containers/download-playlist/download-playlist.component */ "./src/app/download-playlist/containers/download-playlist/download-playlist.component.ts");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var DownloadPlaylistModule = /** @class */ (function () {
    function DownloadPlaylistModule() {
    }
    DownloadPlaylistModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [download_playlist_component_1.DownloadPlaylistComponent],
            imports: [
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                common_1.CommonModule,
                download_playlist_routing_module_1.DownloadPlaylistRoutingModule
            ]
        })
    ], DownloadPlaylistModule);
    return DownloadPlaylistModule;
}());
exports.DownloadPlaylistModule = DownloadPlaylistModule;


/***/ })

}]);
//# sourceMappingURL=download-playlist-download-playlist-module.js.map