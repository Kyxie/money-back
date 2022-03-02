/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-02 15:51:19
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")

exports.getValidChoices = async function (req, res) {}

exports.getLineChart = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
}

exports.getRankList = async function (req, res) {}
