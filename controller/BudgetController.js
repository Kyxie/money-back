/*
 * @Date: 2022-03-10 11:22:31
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-10 15:08:44
 * @FilePath: \Money_Back\controller\BudgetController.js
 */

const { getJWTPayload } = require("../common/util")
const Budget = require("../model/budget")

exports.findBudget = async function (req, res) {}

exports.addBudget = async function (req, res) {
    const body = req.body
    const obj = await getJWTPayload(req.get("Authorization"))
    const newRecord = new Budget(body)
    newRecord.uid = obj.uid
    console.log(newRecord)
    // Save
    const result = await newRecord.save()
    // Response
    res.send({ code: 200, data: result })
}

exports.deleteBudget = async function (req, res) {
    /*const body = req.body
    const { _id } = body
    const obj = await getJWTPayload(req.get("Authorization"))
    Budget.deleteOne(
        {
            uid: obj.uid,
            _id: _id,
        },
        function (err) {
            if (err) throw err
            else {
                res.send({ code: 200 })
            }
        }
    )*/
}

exports.changeBudget = async function (req, res) {}
