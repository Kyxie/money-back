/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-25 15:47:29
 * @FilePath: \Money_Back\controller\DetailController.js
 */

const qs = require("qs")
const { db } = require("../model/record")
const { getJWTPayload } = require("../common/util")

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

exports.getMonthlyBalance = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    const { month, year } = params
    let income_amount = 0
    let outcome_amount = 0

    //db.collection.find({ month: month, year: year }, function (err, item) {})

    const response = {
        year: month,
        month: year,
        income: income_amount,
        expense: outcome_amount,
    }
    res.send(response)
}

exports.getDetailList = function (req, res) {
    const params = qs.parse(req.query)
}
