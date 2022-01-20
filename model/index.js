/*
 * @Date: 2022-01-18 16:44:11
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-19 20:08:41
 * @FilePath: \backend\model\index.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String
})