/*
 * @Date: 2022-01-18 16:44:11
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:12:02
 * @FilePath: \backend\model\index.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userScheMa = new Schema({
    name: String,
    password: String
})