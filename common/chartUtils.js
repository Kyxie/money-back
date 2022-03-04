/*
 * @Date: 2022-03-02 15:27:34
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-03 19:02:59
 * @FilePath: \Money_Back\common\chartUtils.js
 */

exports.dateToWeek = function (month, day) {
    month = month - 1
    let myDate = new Date()
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
            day: firstOfWeek.getDate(),
        }
    }
    const firstWeekLen = 7 - newYear.getDay()
    const secondWeek = dat.addDays(newYear, firstWeekLen)
    requiredTime = dat.addDays(secondWeek, 7 * (week - 2))
    return { month: requiredTime.getMonth() + 1, day: requiredTime.getDate() }
}

exports.weekDaysNum = function (week, date) {
    let daysPerWeek
    if (week === "1") {
        if (date.month === 12) {
            daysPerWeek = date.day - 25
        } else {
            daysPerWeek = 7
        }
    } else {
        if (date.month === 12 && date.day > 25) {
            daysPerWeek = 32 - date.day
        } else {
            daysPerWeek = 7
        }
    }
    return daysPerWeek
}
