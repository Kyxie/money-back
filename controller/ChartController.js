/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-03 17:29:21
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

            daysPerWeek = 7
            if (params.week === 1) {
                if (date.month === 12) {
                    daysPerWeek = date.day - 25
                }
            } else {
                if (date.month === 12 && date.day > 25) {
                    daysPerWeek = 32 - date.day
                }
            }

            let dateArray = []
            for (let i = 0; i < daysPerWeek; i++) {
                monthNum = date.month
                dayNum = date.day + i
                dateArray[i] = monthNum.toString() + "-" + dayNum.toString()
            }
            response["x-axis"] = dateArray
            res.send(response)
        } else if (key === "month") {
        } else {
        }
    }
}

exports.getRankList = async function (req, res) {}
