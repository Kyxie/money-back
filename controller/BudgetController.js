/*
 * @Date: 2022-03-10 11:22:31
 * @LastEditors: Zihang Zhou
 * @LastEditTime: 2022-03-11 11:56:53
 * @FilePath: \Money_Back\controller\BudgetController.js
 */

const { getJWTPayload } = require("../common/util")
const Budget = require("../model/budget")

// if record does not exist, create one with value 0. Otherwise return the record
findOrCreate = function (id) {
    var myDate = new Date()
    var data = Budget.findOne({
        uid: id,
        year: myDate.getFullYear(),
        month: myDate.getMonth(),
    })
    if (data != {}) {
        console.log("WTF")
        return data
    }
    console.log("hhh")
    var body = {
        uid: id,
        budget: 0,
        year: myDate.getFullYear(),
        month: myDate.getMonth(),
    }
    record = new Budget(body)
    var result = record.save()
    return result
}

exports.findBudget = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const uid = obj.uid
    var result = await findOrCreate(uid)
    return res.send({ code: 200, data: result })
}

exports.changeBudget = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const uid = obj.uid
    let body = { budget: req.query.budget }
    console.log(body)
    var myDate = new Date()
    const year = myDate.getFullYear()
    const month = myDate.getMonth()
    var result = await Budget.findOneAndUpdate(
        {
            uid: uid,
            year: year,
            month: month,
        },
        body,
        { upsert: true, new: true }
    )
    res.send({ code: 200, data: result })
}
