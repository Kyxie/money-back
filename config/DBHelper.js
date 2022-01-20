/*
 * @Date: 2022-01-18 16:32:01
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-19 20:12:25
 * @FilePath: \backend\config\DBHelper.js
 */
const mongoose = require('mongoose');

const config = require('./index');

const db = mongoose.connect(config.DB_URL);

mongoose.Promise = global.Promise;

mongoose.connection.on('success', () => {
    console.log('Connect Success');
})

mongoose.connection.on('error',
    console.error.bind(console, 'Connect Fail')
);