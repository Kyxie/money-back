/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-05 13:36:44
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const detailListUtils = require("../common/detailListUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")

exports.getValidChoices = function (req, res) {
    // // Proudly provided by Zihang Zhou

    // function getNowSceond() {
    //     return Math.floor(Date.now() / 1000)
    // }

    // function getTimeInfo(nTimeStamps) {
    //     var date = new Date(nTimeStamps * 1000)

    //     var retData = {
    //         nYear: date.getFullYear(),
    //         nMonth: date.getMonth() + 1,
    //     }
    //     return retData
    // }

    // let curTimeStamps = getNowSceond()
    // let timeInfo = getTimeInfo(curTimeStamps)
    // let thisYear = timeInfo.nYear
    // let firstDay = new Date(thisYear, 0, 1)
    // let thisDay = new Date()

    // length_of_firstWeek = 7 - firstDay.getDay()
    // length_of_untilToday = (thisDay - firstDay) / (1000 * 3600 * 24)
    // whichWeekToday = Math.floor(
    //     (length_of_untilToday - length_of_firstWeek) / 7 + 1 + 1
    // )

    // shuchuYear = timeInfo.nYear
    // shuchuMonth = timeInfo.nMonth
    // shuchuWeek = whichWeekToday

    // let validChoices = {}
    // let year = new Array()
    // let month = new Array()
    // let weeks = new Array()

    // for (let zhou = 1; zhou < shuchuWeek + 1; zhou++) {
    //     weeks.push(zhou)
    // }
    // validChoices.weeks = weeks

    // for (let yue = 1; yue < shuchuMonth + 1; yue++) {
    //     month.push(yue)
    // }
    // validChoices.month = month

    // for (let nian = 2017; nian < shuchuYear + 1; nian++) {
    //     year.push(nian)
    // }
    // validChoices.year = year
    // let response = validChoices

    let response = new Map()
    let date = new Date()

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let week = chartUtils.dateToWeek(month, day)

    let yearArray = new Array()
    let monthArray = new Array()
    let weekArray = new Array()

    for (let i = 2020; i <= year; i++) {
        yearArray.push(i)
    }
    for (let i = 1; i <= month; i++) {
        monthArray.push(i)
    }
    for (let i = 1; i <= week; i++) {
        weekArray.push(i)
    }

    response.weeks = weekArray
    response.month = monthArray
    response.year = yearArray

    res.send(response)
}

exports.getLineChart = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let today = new Date()
    let response = {}

    for (let key in params) {
        if (key === "week") {
            let date = chartUtils.weekToDate(params.week)

            let daysPerWeek = chartUtils.weekDaysNum(params.week, date)
            if (daysPerWeek < 7 && params.week === "1") {
                date.list[0] = detailListUtils.dateToString(
                    detailListUtils.dateToNumber(date.list[0]).year,
                    1,
                    1
                )
            }

            let dayArray = chartUtils.xAxis(date, daysPerWeek)
            response["x-axis"] = dayArray

            Record.find(
                {
                    uid: obj.uid,
                    type: 0,
                    year: today.getFullYear(),
                    week: params.week,
                },
                function (err, data) {
                    if (err) throw err

                    let values = chartUtils.lineChartFormatWeek(
                        data,
                        date,
                        daysPerWeek
                    )
                    let sumAndAve = chartUtils.sumAndAveArray(values)

                    response.values = values
                    response.total = sumAndAve.sum
                    response.average = sumAndAve.ave
                    res.send(response)
                }
            )
        } else if (key === "month") {
            let dayArray = []
            for (let i = 0; i < 30; i++) {
                dayArray[i] = (i + 1).toString()
            }
            response["x-axis"] = dayArray

            Record.find(
                {
                    uid: obj.uid,
                    type: 0,
                    year: today.getFullYear(),
                    month: params.month,
                },
                function (err, data) {
                    if (err) throw err

                    let daysPerMonth = chartUtils.monthDaysNum(
                        today.getFullYear(),
                        parseInt(params.month)
                    )

                    let values = chartUtils.lineChartFormatMonth(
                        data,
                        daysPerMonth
                    )
                    let sumAndAve = chartUtils.sumAndAveArray(values)

                    response.values = values
                    response.total = sumAndAve.sum
                    response.average = sumAndAve.ave
                    res.send(response)

                    console.log(daysPerMonth)
                }
            )
        } else if (key === "year") {
            let monthArray = []
            for (let i = 0; i < 12; i++) {
                monthArray[i] = (i + 1).toString()
            }
            response["x-axis"] = monthArray

            Record.find(
                {
                    uid: obj.uid,
                    type: 0,
                    year: params.year,
                },
                function (err, data) {
                    if (err) throw err

                    let values = chartUtils.lineChartFormatYear(data)
                    let sumAndAve = chartUtils.sumAndAveArray(values)

                    response.values = values
                    response.total = sumAndAve.sum
                    response.average = sumAndAve.ave
                    res.send(response)
                }
            )
        } else {
            console.log("Wrong key")
        }
    }
}

exports.getRankList = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let response = {}
    for (let key in params) {
        if (key === "week") {
            response.list = []
            const { week } = params
            const curYear = new Date().getFullYear()
            Record.find(
                {
                    uid: obj.uid,
                    year: curYear,
                    week: week,
                    type: "0",
                },
                function (err, data) {
                    if (err) throw err
                    else {
                        response.list = chartUtils.resCategoryRecord(data)
                        res.send(response)
                    }
                }
            )
        }
        if (key === "month") {
            response.list = []
            const { month } = params
            const curYear = new Date().getFullYear()
            Record.find(
                {
                    uid: obj.uid,
                    year: curYear,
                    month: month,
                    type: "0",
                },
                function (err, data) {
                    if (err) throw err
                    else {
                        response.list = chartUtils.resCategoryRecord(data)
                        res.send(response)
                    }
                }
            )
        }
        if (key === "year") {
            response.list = []
            const { year } = params
            Record.find(
                {
                    uid: obj.uid,
                    year: year,
                    type: "0",
                },
                function (err, data) {
                    if (err) throw err
                    else {
                        response.list = chartUtils.resCategoryRecord(data)
                        res.send(response)
                    }
                }
            )
        }
    }
}
