/*
 * @Date: 2022-03-10 11:44:47
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-10 11:44:48
 * @FilePath: \Money_Back\model\budget.js
 */

const mongoose = require("../config/DBHelper")
const Schema = mongoose.Schema

var budgetSchema = new Schema({
    uid: String,
    budget: Number,
    year: Number,
    month: Number,
    createAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("budget", budgetSchema)
