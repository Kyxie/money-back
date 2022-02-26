/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-25 16:51:38
 * @FilePath: \Money_Back\controller\DetailController.js
 */

const { getJWTPayload } = require("../common/util")
const qs = require("qs")

exports.getDetail = function (req, res) {
    console.log(req)
    const params = qs.parse(req.query)
    const response = {
        data: {
            username: "123",
            param: params,
        },
        code: 200,
    }
    res.send(response)
}

exports.getMonthlyBalance = function (req, res) {
    const params = qs.parse(req.query)
    const { month, year } = params
    const response = {
        year: month,
        month: year,
        income: 201,
        expense: 192.97,
    }
    res.send(response)
}

exports.getDetailList = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const response = {}
}
