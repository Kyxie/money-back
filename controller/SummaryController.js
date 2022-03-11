/*
 * @Date: 2022-03-10 11:32:30
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-11 12:28:19
 * @FilePath: \Money_Back\controller\SummaryController.js
 */

const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")
const detailListUtils = require("../common/detailListUtils")

exports.getTotalSummary = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    let recordAmount = 0
    let billDateAmount = 0
    console.log(billDateAmount)
    Record.find(
        {
            uid: obj.uid,
        },
        function (err, data) {
            if (err) throw err
            recordAmount = data.length
            let dateKeys = new Set()
            for (let item of data) {
                dateKeys.add(
                    detailListUtils.dateToString(
                        item.year,
                        item.month,
                        item.day
                    )
                )
            }
            billDateAmount = dateKeys.size
            console.log(billDateAmount)
            const response = {
                record_amount: recordAmount,
                bill_date_amount: billDateAmount,
            }
            res.send(response)
        }
    )
}
