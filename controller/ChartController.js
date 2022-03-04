/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-04 17:38:58
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const detailListUtils = require("../common/detailListUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")

exports.getValidChoices = async function (req, res) {
    //let myDate = new Date();
    //yearThis = myDate.getFullYear();
    function getNowSceond() {
        return Math.floor(Date.now() / 1000)
    }

    function getTimeInfo(nTimeStamps) {
        var date = new Date(nTimeStamps * 1000)

        var retData = {
            nYear: date.getFullYear(),
            nMonth: date.getMonth() + 1,
        }
        return retData
    }

    let curTimeStamps = getNowSceond()
    let timeInfo = getTimeInfo(curTimeStamps)
    let thisYear = timeInfo.nYear
    let firstDay = new Date(thisYear, 0, 1)
    let thisDay = new Date()

    length_of_firstWeek = 7 - firstDay.getDay()
    length_of_untilToday = (thisDay - firstDay) / (1000 * 3600 * 24)
    whichWeekToday = Math.floor(
        (length_of_untilToday - length_of_firstWeek) / 7 + 1 + 1
    )

    shuchuYear = timeInfo.nYear
    shuchuMonth = timeInfo.nMonth
    shuchuWeek = whichWeekToday

    let validChoices = {}
    let year = new Array()
    let month = new Array()
    let weeks = new Array()

    for (let zhou = 1; zhou < shuchuWeek + 1; zhou++) {
        weeks.push(zhou)
    }
    validChoices.weeks = weeks

    for (let yue = 1; yue < shuchuMonth + 1; yue++) {
        month.push(yue)
    }
    validChoices.month = month

    for (let nian = 2017; nian < shuchuYear + 1; nian++) {
        year.push(nian)
    }
    validChoices.year = year
    let response = validChoices
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
                date.start = detailListUtils.dateToString(
                    detailListUtils.dateToNumber(date.start).year,
                    1,
                    1
                )
            }

            let dayArray = chartUtils.xAxis(date, daysPerWeek)
            // for (let i = 0; i < daysPerWeek; i++) {
            //     monthNum = date.month
            //     dayNum = date.day + i
            //     dayArray[i] = monthNum.toString() + "-" + dayNum.toString()
            // }
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

                    let values = chartUtils.lineChartFormat(data)
                    let sumAndAve = chartUtils.sumAndAveArray(values)

                    response.values = values
                    response.total = sumAndAve.sum
                    response.average = sumAndAve.ave
                    res.send(response)
                }
            )
        } else if (key === "month") {
            console.log("nnn")
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
                    year: today.getFullYear(),
                    week: params.week,
                },
                function (err, data) {}
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
