/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-03 16:57:55
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
            console.log(date.month)
            console.log(date.day)
            let dateArray = []
            for (let i = 0; i < 7; i++) {
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
