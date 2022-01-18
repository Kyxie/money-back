/*
 * @Date: 2022-01-18 16:32:01
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:11:36
 * @FilePath: \backend\config\DBHelper.js
 */
const mongoose = require('mongoose')

const config = require('./index')

const db = mongoose.connect(config.DB_URL)

mongoose.connection.on('success', () => {
    console.log('Connect Success')
})

