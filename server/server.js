"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
exports.app = express();
var port = process.env.PORT || 4000;
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.app.use(cors(corsOptions));
exports.app.use(express.static(path.join(__dirname, 'output')));
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.listen(port, function () {
    console.log('Server on port: ' + port);
});
