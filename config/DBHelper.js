/*
 * @Date: 2022-01-18 16:32:01
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-05 23:59:32
 * @FilePath: \backend\config\DBHelper.js
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/money');

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('connected', function () {
    console.log('MongoDB Connection Successed');
});

db.on('error', function () {
    console.log('MongoDB Connection Failed');
});

module.exports = mongoose