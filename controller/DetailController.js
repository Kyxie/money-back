/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-26 14:52:41
 * @FilePath: \Money_Back\controller\DetailController.js
 */

const { getJWTPayload } = require("../common/util")
const qs = require("qs")
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
            if (err) throw err
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

exports.getDetailList = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const date = new Date()
    // const today = data.getDay() + 1
    // const tomonth = date.getDate()
    const response = {}
    Record.find(
        {
            uid: obj.uid,
        },
        function (err, docs) {
            if (err) throw err
            res.send(docs)
        }
    )
}
