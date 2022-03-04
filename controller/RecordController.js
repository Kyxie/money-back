/*
 * @Date: 2022-02-21 13:26:33
<<<<<<< HEAD
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-04 11:16:16
=======
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-04 10:51:26
>>>>>>> b689e89fc1726fd246df2e4c6d9a9c041f9837ce
 * @FilePath: \Money_Back\controller\RecordController.js
 */

const { rethrow } = require("jade/lib/runtime")
const { getJWTPayload } = require("../common/util")
const Record = require("../model/record")
const chartUtils = require("../common/chartUtils")

exports.addRecord = async function (req, res) {
    const body = req.body
    // request.header.Authorization
    const obj = await getJWTPayload(req.get("Authorization"))
    const newRecord = new Record(body)
    newRecord.uid = obj.uid
    newRecord.week = chartUtils.dateToWeek(newRecord.month, newRecord.day)
    console.log(newRecord)
    // Save
    const result = await newRecord.save()
    // Response
    res.send({ code: 200, data: result })
}

exports.deleteRecord = async function (req, res) {
    const body = req.body
    const { _id } = body
    const obj = await getJWTPayload(req.get("Authorization"))
    Record.deleteOne(
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
    )
}

exports.changeRecord = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const updateRecord = new Record(req.body)
    updateRecord.uid = obj.uid
    Record.findByIdAndUpdate(
        updateRecord._id,
        updateRecord,
        {},
        function (err, data) {
            if (err) throw err
            else {
                res.send({ code: 200 })
            }
        }
    )
}
