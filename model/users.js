/*
 * @Date: 2022-01-18 16:44:11
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-26 22:40:28
 * @FilePath: \backend\model\users.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    age: Number,
    address: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', userSchema);