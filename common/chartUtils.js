/*
 * @Date: 2022-03-02 15:27:34
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-04 12:44:25
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

exports.resCategoryRecord = function (data) {
    let temp = []
    let sum = 0
    for (let dataItem of data) {
        let sign = 0
        for (let tempItem of temp) {
            if (tempItem.category === dataItem.category) {
                sign = 1
                break
            }
        }
        if (sign === 1) {
            for (let tempItem of temp) {
                if (tempItem.category === dataItem.category) {
                    tempItem.amount = tempItem.amount + dataItem.amount
                    sum = sum + dataItem.amount
                    break
                }
            }
        } else {
            let component = {}
            component.category = dataItem.category
            component.icon = dataItem.icon
            component.type = 0
            component.amount = dataItem.amount

            sum = sum + dataItem.amount

            temp.push(component)
        }
    }
    for (let tempItem of temp) {
        tempItem.percentage = Math.round((tempItem.amount / sum) * 100)
    }

    return temp
}

ascendingSort = function (property) {
    return function (obj1, obj2) {
        let value1 = obj1[property]
        let value2 = obj2[property]
        return value1 - value2
    }
}
