/*
 * @Date: 2022-02-21 13:51:05
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-24 20:29:33
 * @FilePath: \backend\model\record.js
 */

const mongoose = require("../config/DBHelper")
const Schema = mongoose.Schema

var recordSchema = new Schema({
    uid: String,
    category: String,
    amount: Number,
    type: Number,
    icon: String,
    year: Number,
    month: Number,
    day: Number,
    createAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("record", recordSchema)
