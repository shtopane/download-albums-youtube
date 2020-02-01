(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["album-album-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album-outlet/album-outlet.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album-outlet/album-outlet.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album/album.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album/album.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<section id=\"playlist\" *ngIf=\"playlist$ | async as playlist\">\r\n  <h2>{{playlist?.albumName}}</h2>\r\n  <app-list-playlist [playlist]=\"playlist\" (listen)=\"onListenClicked($event);\" (download)=\"onDownloadClicked($event);\"\r\n    (downloadZip)=\"onDownloadZipClicked($event);\"></app-list-playlist>\r\n</section>");

/***/ }),

/***/ "./src/app/album/album-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/album/album-routing.module.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var album_component_1 = __webpack_require__(/*! ./containers/album/album.component */ "./src/app/album/containers/album/album.component.ts");
var album_outlet_component_1 = __webpack_require__(/*! ./containers/album-outlet/album-outlet.component */ "./src/app/album/containers/album-outlet/album-outlet.component.ts");
var routes = [
    {
        path: '', component: album_outlet_component_1.AlbumOutletComponent, children: [
            { path: '', component: album_component_1.AlbumComponent }
        ]
    }
];
var AlbumRoutingModule = /** @class */ (function () {
    function AlbumRoutingModule() {
    }
    AlbumRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AlbumRoutingModule);
    return AlbumRoutingModule;
}());
exports.AlbumRoutingModule = AlbumRoutingModule;


/***/ }),

/***/ "./src/app/album/album.module.ts":
/*!***************************************!*\
  !*** ./src/app/album/album.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var album_routing_module_1 = __webpack_require__(/*! ./album-routing.module */ "./src/app/album/album-routing.module.ts");
var album_component_1 = __webpack_require__(/*! ./containers/album/album.component */ "./src/app/album/containers/album/album.component.ts");
var album_outlet_component_1 = __webpack_require__(/*! ./containers/album-outlet/album-outlet.component */ "./src/app/album/containers/album-outlet/album-outlet.component.ts");
var shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var AlbumModule = /** @class */ (function () {
    function AlbumModule() {
    }
    AlbumModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [album_component_1.AlbumComponent, album_outlet_component_1.AlbumOutletComponent],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                album_routing_module_1.AlbumRoutingModule
            ]
        })
    ], AlbumModule);
    return AlbumModule;
}());
exports.AlbumModule = AlbumModule;


/***/ }),

/***/ "./src/app/album/containers/album-outlet/album-outlet.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/album/containers/album-outlet/album-outlet.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FsYnVtL2NvbnRhaW5lcnMvYWxidW0tb3V0bGV0L2FsYnVtLW91dGxldC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/album/containers/album-outlet/album-outlet.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/album/containers/album-outlet/album-outlet.component.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var AlbumOutletComponent = /** @class */ (function () {
    function AlbumOutletComponent() {
    }
    AlbumOutletComponent.prototype.ngOnInit = function () {
    };
    AlbumOutletComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-album-outlet',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./album-outlet.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album-outlet/album-outlet.component.html")).default,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./album-outlet.component.scss */ "./src/app/album/containers/album-outlet/album-outlet.component.scss")).default]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AlbumOutletComponent);
    return AlbumOutletComponent;
}());
exports.AlbumOutletComponent = AlbumOutletComponent;


/***/ }),

/***/ "./src/app/album/containers/album/album.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/album/containers/album/album.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FsYnVtL2NvbnRhaW5lcnMvYWxidW0vYWxidW0uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/album/containers/album/album.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/album/containers/album/album.component.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var environment_1 = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var playlist_service_1 = __webpack_require__(/*! src/app/shared/services/playlist/playlist.service */ "./src/app/shared/services/playlist/playlist.service.ts");
var AlbumComponent = /** @class */ (function () {
    function AlbumComponent(sliceDownloadAlbumService) {
        this.sliceDownloadAlbumService = sliceDownloadAlbumService;
        this.destroySubs = new rxjs_1.Subject();
    }
    AlbumComponent.prototype.ngOnInit = function () {
        var _this = this;
        rxjs_1.fromEvent(window, 'resize').pipe(operators_1.tap(function () { return _this.determineIsMobile(); }), operators_1.takeUntil(this.destroySubs)).subscribe();
        this.playlist$ = this.sliceDownloadAlbumService.getLocalPlaylist();
    };
    AlbumComponent.prototype.ngAfterViewInit = function () {
        this.determineIsMobile();
    };
    AlbumComponent.prototype.ngOnDestroy = function () {
        this.destroySubs.next(true);
        this.destroySubs.complete();
    };
    AlbumComponent.prototype.onDownloadClicked = function (songInfo) {
        console.log(songInfo);
        encodeURIComponent;
        var url = environment_1.environment.serverUrl + "/download?isPlaylist=false&albumName=" + encodeURIComponent(songInfo.title) + "&songName=" + encodeURIComponent(songInfo.playlistItemName);
        window.open(url, '_blank');
    };
    AlbumComponent.prototype.onListenClicked = function (songInfo) {
        console.log('listen', songInfo.title, songInfo.playlistItemName);
        var url = environment_1.environment.serverUrl + "/listen?isPlaylist=false&albumName=" + encodeURIComponent(songInfo.title) + "&songName=" + encodeURIComponent(songInfo.playlistItemName);
        window.open(url, '_blank');
    };
    AlbumComponent.prototype.onDownloadZipClicked = function (albumName) {
        var url = environment_1.environment.serverUrl + "/downloadZip?isPlaylist=false&albumName=" + encodeURIComponent(albumName);
        window.open(url, '_blank');
    };
    AlbumComponent.prototype.determineIsMobile = function () {
        this.isMobile = window.document.body.clientWidth <= 640 ? true : false;
    };
    AlbumComponent.ctorParameters = function () { return [
        { type: playlist_service_1.PlaylistService }
    ]; };
    AlbumComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-album',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./album.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/album/containers/album/album.component.html")).default,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./album.component.scss */ "./src/app/album/containers/album/album.component.scss")).default]
        }),
        tslib_1.__metadata("design:paramtypes", [playlist_service_1.PlaylistService])
    ], AlbumComponent);
    return AlbumComponent;
}());
exports.AlbumComponent = AlbumComponent;


/***/ })

}]);
//# sourceMappingURL=album-album-module.js.map