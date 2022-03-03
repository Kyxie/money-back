/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-02 17:14:20
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const { getJWTPayload } = require("../common/util")

exports.getValidChoices = async function (req, res) {}

exports.getLineChart = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    var response = chartUtils.weekToDate(3)
    res.send(response)
}

exports.getRankList = async function (req, res) {}
