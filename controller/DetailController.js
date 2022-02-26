/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-25 15:47:29
 * @FilePath: \Money_Back\controller\DetailController.js
 */

const qs = require("qs")
const { db } = require("../model/record")
const { getJWTPayload } = require("../common/util")
const Record = require("../model/record")

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

    Record.find(
        {
            uid: obj.uid,
            month: month,
            year: year,
        },
        function (err, data) {
            for (let item of data) {
                if (item.type === 1) {
                    income_amount = income_amount + item.amount
                }
                if (item.type === 0) {
                    outcome_amount = outcome_amount + item.amount
                }
            }
            console.log("outcome", outcome_amount, " income", income_amount)
            const response = {
                year: year,
                month: month,
                income: income_amount,
                expense: outcome_amount,
            }
            res.send(response)
        }
    )
}

exports.getDetailList = function (req, res) {
    const params = qs.parse(req.query)
}
