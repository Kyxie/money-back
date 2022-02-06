/*
 * @Date: 2022-01-18 16:44:11
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-05 23:51:37
 * @FilePath: \backend\model\users.js
 */
const mongoose = require('../config/DBHelper');
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

module.exports = mongoose.model('money', userSchema);