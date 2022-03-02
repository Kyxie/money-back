/*
 * @Date: 2022-03-02 15:27:34
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-02 17:10:42
 * @FilePath: \Money_Back\common\chartUtils.js
 */

exports.dateToWeek = function (month, day) {
    month = month - 1
    var myDate = new Date()
    const year = myDate.getFullYear()
    const newYear = new Date(year, 0, 1)
    const today = new Date(year, month, day)
    firstWeekLen = 7 - newYear.getDay()
    lenUntilToday = (today - newYear) / (1000 * 3600 * 24)
    week = Math.floor((lenUntilToday - firstWeekLen) / 7 + 1 + 1)
    return week
}

exports.weekToDate = function (week) {}
