/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-02-27 14:35:08
 * @FilePath: \Money_Back\controller\DetailController.js
 */

const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")
const detailListUtils = require("../common/detailListUtils")

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
    // const date = new Date()
    // const today = data.getDay() + 1
    // const tomonth = date.getDate()
    var response = []
    Record.find(
        {
            uid: obj.uid,
        },
        function (err, docs) {
            if (err) throw err

            // All date Keys
            var dateKeys = new Set()
            for (var i = 0; i < docs.length; i++) {
                dateKeys.add(
                    detailListUtils.dateToString(
                        docs[i].year,
                        docs[i].month,
                        docs[i].day
                    )
                )
            }
            dateKeys = Array.from(dateKeys).sort().reverse()

            for (var i = 0; i < dateKeys.length; i++) {
                var dateSet = detailListUtils.dateToNumber(dateKeys[i])
                var compResponse = {}
                var list = []

                for (var j = 0; j < docs.length; j++) {
                    var compList = {}
                    if (
                        docs[j].year == dateSet.year &&
                        docs[j].month == dateSet.month &&
                        docs[j].day == dateSet.day
                    ) {
                        compResponse.id = i + 1
                        compResponse.year = docs[j].year
                        compResponse.month = docs[j].month
                        compResponse.day = docs[j].day
                        compList.category = docs[j].category
                        compList.icon = docs[j].icon
                        compList.type = docs[j].type
                        compList.amount = docs[j].amount
                        list.push(compList)
                    }
                    compResponse.list = list
                }
                response.push(compResponse)
            }

            for (var i = 0; i < response.length; i++) {
                response[i].amount = 0
                for (var j = 0; j < response[i].list.length; j++) {
                    if (response[i].list[j].type == 0) {
                        response[i].amount =
                            response[i].amount - response[i].list[j].amount
                    } else {
                        response[i].amount =
                            response[i].amount + response[i].list[j].amount
                    }
                }
            }

            res.send(response)
        }
    )
}
