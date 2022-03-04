/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-03 19:11:36
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")

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
    date = chartUtils.weekToDate(1)
    console.log(date)
}
