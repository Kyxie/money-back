/*
 * @Date: 2022-03-10 11:22:31
 * @LastEditors: Zihang Zhou
 * @LastEditTime: 2022-03-11 14:12:27
 * @FilePath: \Money_Back\controller\BudgetController.js
 */

const { getJWTPayload } = require("../common/util")
const Budget = require("../model/budget")

// proudly provided by Xiang Fang and Zihang Zhou

// // if record does not exist, create one with value 0. Otherwise return the record
// findOrCreate = function (id) {
//     var myDate = new Date()
//     var data = Budget.findOne(
//         {
//             uid: id,
//             year: myDate.getFullYear(),
//             month: myDate.getMonth(),
//         }
//         // function (err, data) {
//         //     if (err) throw err
//         //     else {
//         //         console.log("fuc me")
//         //         console.log(data)
//         //         if (data != null) return data
//         //     }
//         // }
//     )
//     if (data != null) return data
//     console.log("fuc me again")
//     var body = {
//         uid: id,
//         budget: 0,
//         year: myDate.getFullYear(),
//         month: myDate.getMonth(),
//     }
//     console.log(body)
//     record = new Budget(body)
//     var result = record.save()
//     return result
// }

exports.findBudget = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    Budget.findOne(
        {
            uid: obj.uid,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        },
        async function (err, data) {
            if (err) throw err
            if (data === null) {
                const body = {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    budget: 0,
                    uid: obj.uid,
                }
                const newRecord = new Budget(body)
                const result = await newRecord.save()
                res.send({ code: 200, budget: result.budget })
            } else {
                res.send({ code: 200, budget: data.budget })
            }
        }
    )
}

exports.changeBudget = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const request = req.body
    const newBudget = request.budget
    Budget.findOneAndUpdate(
        {
            uid: obj.uid,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        },
        {
            budget: newBudget,
        },
        null,
        async function (err, data) {
            if (err) throw err
            if (data === null) {
                const body = {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    budget: newBudget,
                    uid: obj.uid,
                }
                const newRecord = new Budget(body)
                const result = await newRecord.save()
                res.send({ code: 200, budget: result.budget })
            } else {
                res.send({ code: 200, budget: newBudget })
            }
        }
    )
}
