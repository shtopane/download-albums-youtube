(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["download-slice-albums-download-slice-albums-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/how-to-use/how-to-use.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/how-to-use/how-to-use.component.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"uk-section uk-section-secondary\">\r\n  <div class=\"uk-container\">\r\n    <h3>How to use</h3>\r\n    <div class=\"uk-flex uk-flex-column\">\r\n      <div>\r\n        <p>Paste a playlist of the album.</p>\r\n      </div>\r\n      <div>\r\n        <p>\r\n          The <strong>required information is track name when the track starts.</strong>\r\n          <strong>Look up in the description or the comment section of the video.\r\n            Usually the playlist is\r\n            there.</strong>\r\n        </p>\r\n      </div>\r\n      <div>\r\n        <p>For videos longer than an hour the format should be either hh:mm:ss or h:mm:ss so 0:03:25\r\n          or 00:03:25</p>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.html ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container [formGroup]=\"parent\">\r\n  <textarea [formControlName]=\"controlName\" class=\"uk-textarea\" name=\"description\" id=\"description\"\r\n    placeholder=\"Paste the playlist of the album. Format is hh:mm:ss\"></textarea>\r\n</ng-container>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.html":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.html ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form class=\"uk-height-1-1\" [formGroup]=\"downloadAlbumForm\">\r\n  <app-url-input controlName=\"url\" [parent]=\"downloadAlbumForm\"\r\n    placeholder=\"Video URL e.g. https://www.youtube.com/watch?v=MtN1YnoL46Q\" [disabled]=\"disabled\" (send)=\"onSubmit()\">\r\n  </app-url-input>\r\n  <app-how-to-use class=\"display-on-desktop\"></app-how-to-use>\r\n  <app-playlist-textarea class=\"uk-display-block uk-height-1-1\" controlName=\"playlist\" [parent]=\"downloadAlbumForm\">\r\n  </app-playlist-textarea>\r\n</form>");

/***/ }),

/***/ "./src/app/download-slice-albums/components/how-to-use/how-to-use.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/download-slice-albums/components/how-to-use/how-to-use.component.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy9jb21wb25lbnRzL2hvdy10by11c2UvaG93LXRvLXVzZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/download-slice-albums/components/how-to-use/how-to-use.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/download-slice-albums/components/how-to-use/how-to-use.component.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var HowToUseComponent = /** @class */ (function () {
    function HowToUseComponent() {
    }
    HowToUseComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-how-to-use',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./how-to-use.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/how-to-use/how-to-use.component.html")).default,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./how-to-use.component.scss */ "./src/app/download-slice-albums/components/how-to-use/how-to-use.component.scss")).default]
        })
    ], HowToUseComponent);
    return HowToUseComponent;
}());
exports.HowToUseComponent = HowToUseComponent;


/***/ }),

/***/ "./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.scss":
/*!*****************************************************************************************************!*\
  !*** ./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.scss ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("textarea {\n  font-family: inherit;\n  padding: 0.5rem;\n  width: 100%;\n  height: 100%;\n}\n\ntextarea:focus {\n  outline: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG93bmxvYWQtc2xpY2UtYWxidW1zL2NvbXBvbmVudHMvcGxheWxpc3QtdGV4dGFyZWEvQzpcXFBST0pFQ1RTXFxkb3dubG9hZC1hbGJ1bXMteW91dHViZS9zcmNcXGFwcFxcZG93bmxvYWQtc2xpY2UtYWxidW1zXFxjb21wb25lbnRzXFxwbGF5bGlzdC10ZXh0YXJlYVxccGxheWxpc3QtdGV4dGFyZWEuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy9jb21wb25lbnRzL3BsYXlsaXN0LXRleHRhcmVhL3BsYXlsaXN0LXRleHRhcmVhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNDSjs7QURJQTtFQUNJLGFBQUE7QUNESiIsImZpbGUiOiJzcmMvYXBwL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy9jb21wb25lbnRzL3BsYXlsaXN0LXRleHRhcmVhL3BsYXlsaXN0LXRleHRhcmVhLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGV4dGFyZWEge1xyXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XHJcbiAgICBwYWRkaW5nOiAuNXJlbTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgLy8gbWFyZ2luLXJpZ2h0OiAuNXJlbTtcclxuICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICMyODI4Mjg7XHJcbn1cclxuXHJcbnRleHRhcmVhOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbn0iLCJ0ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbnRleHRhcmVhOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.ts ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var PlaylistTextareaComponent = /** @class */ (function () {
    function PlaylistTextareaComponent() {
    }
    PlaylistTextareaComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], PlaylistTextareaComponent.prototype, "controlName", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", forms_1.FormGroup)
    ], PlaylistTextareaComponent.prototype, "parent", void 0);
    PlaylistTextareaComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-playlist-textarea',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./playlist-textarea.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.html")).default,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./playlist-textarea.component.scss */ "./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.scss")).default]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PlaylistTextareaComponent);
    return PlaylistTextareaComponent;
}());
exports.PlaylistTextareaComponent = PlaylistTextareaComponent;


/***/ }),

/***/ "./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.scss":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.scss ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n\n#loader {\n  z-index: 5;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n#loader > div {\n  z-index: 5;\n  left: 48%;\n  top: 50%;\n  bottom: 0;\n  right: 0;\n  position: absolute;\n}\n\n.display-on-desktop {\n  display: block;\n}\n\n#input-wrap {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\ninput,\ntextarea {\n  font-family: inherit;\n  padding: 0.5rem;\n  width: 100%;\n}\n\ninput:focus,\ntextarea:focus {\n  outline: none;\n}\n\n.media {\n  overflow: hidden;\n  position: relative;\n  width: 50%;\n  height: 100px;\n}\n\n.media > img {\n  max-width: none;\n  position: absolute;\n  left: 50%;\n  vertical-align: middle;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n@media only screen and (min-width: 320px) and (max-width: 768px) and (orientation: portrait) {\n  .display-on-desktop {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG93bmxvYWQtc2xpY2UtYWxidW1zL2NvbnRhaW5lcnMvZG93bmxvYWQtc2xpY2UtYWxidW1zLWZvcm0vQzpcXFBST0pFQ1RTXFxkb3dubG9hZC1hbGJ1bXMteW91dHViZS9zcmNcXGFwcFxcZG93bmxvYWQtc2xpY2UtYWxidW1zXFxjb250YWluZXJzXFxkb3dubG9hZC1zbGljZS1hbGJ1bXMtZm9ybVxcZG93bmxvYWQtc2xpY2UtYWxidW1zLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy9jb250YWluZXJzL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy1mb3JtL2Rvd25sb2FkLXNsaWNlLWFsYnVtcy1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtBQ0NKOztBREVBO0VBQ0ksVUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtBQ0NKOztBREVBOztFQUVJLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUNDSjs7QURJQTs7RUFFSSxhQUFBO0FDREo7O0FESUE7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7QUNESjs7QURJQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0FDREo7O0FESUE7RUFDSTtJQUNJLGFBQUE7RUNETjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZG93bmxvYWQtc2xpY2UtYWxidW1zL2NvbnRhaW5lcnMvZG93bmxvYWQtc2xpY2UtYWxidW1zLWZvcm0vZG93bmxvYWQtc2xpY2UtYWxidW1zLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbiNsb2FkZXIge1xyXG4gICAgei1pbmRleDogNTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNyk7XHJcbn1cclxuXHJcbiNsb2FkZXI+ZGl2IHtcclxuICAgIHotaW5kZXg6IDU7XHJcbiAgICBsZWZ0OiA0OCU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG59XHJcblxyXG4uZGlzcGxheS1vbi1kZXNrdG9wIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4jaW5wdXQtd3JhcCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbmlucHV0LFxyXG50ZXh0YXJlYSB7XHJcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICAgIHBhZGRpbmc6IC41cmVtO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAvLyBtYXJnaW4tcmlnaHQ6IC41cmVtO1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgIzI4MjgyODtcclxufVxyXG5cclxuaW5wdXQ6Zm9jdXMsXHJcbnRleHRhcmVhOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbn1cclxuXHJcbi5tZWRpYSB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbn1cclxuXHJcbi5tZWRpYT5pbWcge1xyXG4gICAgbWF4LXdpZHRoOiBub25lO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDozMjBweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSBhbmQgKG9yaWVudGF0aW9uOnBvcnRyYWl0KSB7XHJcbiAgICAuZGlzcGxheS1vbi1kZXNrdG9wIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59IiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4jbG9hZGVyIHtcbiAgei1pbmRleDogNTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG59XG5cbiNsb2FkZXIgPiBkaXYge1xuICB6LWluZGV4OiA1O1xuICBsZWZ0OiA0OCU7XG4gIHRvcDogNTAlO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5kaXNwbGF5LW9uLWRlc2t0b3Age1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuI2lucHV0LXdyYXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuaW5wdXQsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5pbnB1dDpmb2N1cyxcbnRleHRhcmVhOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLm1lZGlhIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNTAlO1xuICBoZWlnaHQ6IDEwMHB4O1xufVxuXG4ubWVkaWEgPiBpbWcge1xuICBtYXgtd2lkdGg6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjhweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgLmRpc3BsYXktb24tZGVza3RvcCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ "./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.ts ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var playlist_service_1 = __webpack_require__(/*! src/app/shared/services/playlist/playlist.service */ "./src/app/shared/services/playlist/playlist.service.ts");
var alert_service_1 = __webpack_require__(/*! src/app/shared/services/alert/alert.service */ "./src/app/shared/services/alert/alert.service.ts");
var loader_service_1 = __webpack_require__(/*! src/app/shared/services/loader/loader.service */ "./src/app/shared/services/loader/loader.service.ts");
var DownloadSliceAlbumsFormComponent = /** @class */ (function () {
    function DownloadSliceAlbumsFormComponent(fb, playlistService, router, loaderService, alertService) {
        this.fb = fb;
        this.playlistService = playlistService;
        this.router = router;
        this.loaderService = loaderService;
        this.alertService = alertService;
    }
    Object.defineProperty(DownloadSliceAlbumsFormComponent.prototype, "url", {
        get: function () {
            return this.downloadAlbumForm.get('url').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadSliceAlbumsFormComponent.prototype, "playlist", {
        get: function () {
            return this.downloadAlbumForm.get('playlist').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadSliceAlbumsFormComponent.prototype, "disabled", {
        get: function () {
            return this.downloadAlbumForm.invalid;
        },
        enumerable: true,
        configurable: true
    });
    DownloadSliceAlbumsFormComponent.prototype.ngOnInit = function () {
        this.downloadAlbumForm = this.fb.group({
            url: ['', forms_1.Validators.required],
            playlist: ["", forms_1.Validators.required]
        });
    };
    DownloadSliceAlbumsFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.downloadAlbumForm.valid) {
            this.loaderService.showLoader();
            /** Do something */
            this.playlistService.sendPlaylist(this.url, this.playlist)
                .subscribe(function (res) {
                _this.loaderService.hideLoader();
                if (res.success) {
                    _this.playlistService.getPlaylist()
                        .subscribe(function (res) {
                        _this.playlistService.setLocalPlaylist({ albumName: res.albumName, playlist: res.playlist });
                        _this.router.navigate(['/album']);
                    });
                }
            }, function (error) {
                console.log('in error clause of observable', error);
                _this.alertService.setMessage(error.error.errorMessage);
                _this.loaderService.hideLoader();
            });
        }
    };
    DownloadSliceAlbumsFormComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder },
        { type: playlist_service_1.PlaylistService },
        { type: router_1.Router },
        { type: loader_service_1.LoaderService },
        { type: alert_service_1.AlertService }
    ]; };
    DownloadSliceAlbumsFormComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-download-slice-albums-form',
            template: tslib_1.__importDefault(__webpack_require__(/*! raw-loader!./download-slice-albums-form.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.html")).default,
            styles: [tslib_1.__importDefault(__webpack_require__(/*! ./download-slice-albums-form.component.scss */ "./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.scss")).default]
        }),
        tslib_1.__metadata("design:paramtypes", [forms_1.FormBuilder,
            playlist_service_1.PlaylistService,
            router_1.Router,
            loader_service_1.LoaderService,
            alert_service_1.AlertService])
    ], DownloadSliceAlbumsFormComponent);
    return DownloadSliceAlbumsFormComponent;
}());
exports.DownloadSliceAlbumsFormComponent = DownloadSliceAlbumsFormComponent;


/***/ }),

/***/ "./src/app/download-slice-albums/download-slice-albums-routing.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/download-slice-albums/download-slice-albums-routing.module.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var download_slice_albums_form_component_1 = __webpack_require__(/*! ./containers/download-slice-albums-form/download-slice-albums-form.component */ "./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.ts");
var routes = [
    { path: '', component: download_slice_albums_form_component_1.DownloadSliceAlbumsFormComponent }
];
var DownloadSliceAlbumsRoutingModule = /** @class */ (function () {
    function DownloadSliceAlbumsRoutingModule() {
    }
    DownloadSliceAlbumsRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DownloadSliceAlbumsRoutingModule);
    return DownloadSliceAlbumsRoutingModule;
}());
exports.DownloadSliceAlbumsRoutingModule = DownloadSliceAlbumsRoutingModule;


/***/ }),

/***/ "./src/app/download-slice-albums/download-slice-albums.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/download-slice-albums/download-slice-albums.module.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var download_slice_albums_routing_module_1 = __webpack_require__(/*! ./download-slice-albums-routing.module */ "./src/app/download-slice-albums/download-slice-albums-routing.module.ts");
var download_slice_albums_form_component_1 = __webpack_require__(/*! ./containers/download-slice-albums-form/download-slice-albums-form.component */ "./src/app/download-slice-albums/containers/download-slice-albums-form/download-slice-albums-form.component.ts");
var how_to_use_component_1 = __webpack_require__(/*! ./components/how-to-use/how-to-use.component */ "./src/app/download-slice-albums/components/how-to-use/how-to-use.component.ts");
var playlist_textarea_component_1 = __webpack_require__(/*! ./components/playlist-textarea/playlist-textarea.component */ "./src/app/download-slice-albums/components/playlist-textarea/playlist-textarea.component.ts");
var shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var DownloadSliceAlbumsModule = /** @class */ (function () {
    function DownloadSliceAlbumsModule() {
    }
    DownloadSliceAlbumsModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [download_slice_albums_form_component_1.DownloadSliceAlbumsFormComponent, how_to_use_component_1.HowToUseComponent, playlist_textarea_component_1.PlaylistTextareaComponent],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                download_slice_albums_routing_module_1.DownloadSliceAlbumsRoutingModule
            ]
        })
    ], DownloadSliceAlbumsModule);
    return DownloadSliceAlbumsModule;
}());
exports.DownloadSliceAlbumsModule = DownloadSliceAlbumsModule;


/***/ })

}]);
//# sourceMappingURL=download-slice-albums-download-slice-albums-module.js.map