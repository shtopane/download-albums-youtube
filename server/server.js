"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
exports.app = express();
var port = process.env.PORT;
if (port == null || port === '') {
    port = '4000';
}
exports.app.use(express.static(path.join(__dirname, 'output')));
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use(cors());
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.listen(port, function () {
    console.log('Server on port: ' + port);
});
