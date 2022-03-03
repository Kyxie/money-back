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

exports.weekToDate = function (week) {
    const dat = require("date-and-time")
    var myDate = new Date()
    const year = myDate.getFullYear()
    const newYear = new Date(year, 0, 1)
    if (week == 1) {
        const firstOfWeek = dat.addDays(newYear, -newYear.getDay())
        return {
            month: firstOfWeek.getMonth() + 1,
            date: firstOfWeek.getDate(),
        }
    }
    const firstWeekLen = 7 - newYear.getDay()
    const secondWeek = dat.addDays(newYear, firstWeekLen)
    requiredTime = dat.addDays(secondWeek, 7 * (week - 2))
    return { month: requiredTime.getMonth() + 1, date: requiredTime.getDate() }
}
