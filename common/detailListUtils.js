/*
 * @Date: 2022-02-26 21:23:38
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-26 23:52:40
 * @FilePath: \Money_Back\common\detailListUtils.js
 */

exports.dateToString = function (year, month, day) {
    // Change the date from number to string and add 0
    var yearString
    var monthString
    var dayString

    yearString = year.toString()

    if (month < 10) {
        monthString = "0" + month.toString()
    } else {
        monthString = month.toString()
    }

    if (day < 10) {
        dayString = "0" + day.toString()
    } else {
        dayString = day.toString()
    }

    return yearString + monthString + dayString
}

exports.dateToNumber = function (dateString) {
    var dateSet = {}

    dateSet.year = Number(dateString.slice(0, 4))
    dateSet.month = Number(dateString.slice(4, 6))
    dateSet.day = Number(dateString.slice(6, 8))

    return dateSet
}
