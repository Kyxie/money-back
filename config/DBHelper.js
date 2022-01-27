/*
 * @Date: 2022-01-18 16:32:01
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-26 22:19:04
 * @FilePath: \backend\config\DBHelper.js
 */
const mongoose = require('mongoose');
const config = require('./index');
mongoose.connect(config.DB_URL);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('success', function () {
    console.log('MongoDB Connection Successed');
});

db.on('fail', function () {
    console.log('MongoDB Connection Failed');
});