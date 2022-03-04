/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-04 11:37:29
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")

exports.getValidChoices = async function (req, res) {}

exports.getLineChart = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let response = {}

    for (let key in params) {
        if (key === "week") {
            let date = chartUtils.weekToDate(params.week)
            let daysPerWeek = chartUtils.weekDaysNum(params.week, date)
            if (daysPerWeek < 7 && params.week === "1") {
                date.month = 1
                date.day = 1
            }

            let dayArray = []
            for (let i = 0; i < daysPerWeek; i++) {
                monthNum = date.month
                dayNum = date.day + i
                dayArray[i] = monthNum.toString() + "-" + dayNum.toString()
            }
            response["x-axis"] = dayArray
            res.send(response)
        } else if (key === "month") {
        } else {
            let monthArray = []
            for (let i = 0; i < 12; i++) {
                monthArray[i] = (i + 1).toString()
            }
            response["x-axis"] = monthArray
            res.send(response)
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
                        response.list = chartUtils.resCatagoryRecord(data)
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
                        response.list = chartUtils.resCatagoryRecord(data)
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
                        response.list = chartUtils.resCatagoryRecord(data)
                        res.send(response)
                    }
                }
            )
        }
    }
}
