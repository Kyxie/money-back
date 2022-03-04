/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-03 19:16:12
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")

exports.getValidChoices = async function (req, res) {}

exports.getLineChart = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let response = {}

    for (let key in params) {
        if (key === "week") {
            let date = chartUtils.weekToDate(params.week)
            let daysPerWeek = chartUtils.weekDaysNum(params.week, date)
            if (daysPerWeek < 7 && params.week === "1") {
                date.month = 1
                date.day = 1
            }

            let dayArray = []
            for (let i = 0; i < daysPerWeek; i++) {
                monthNum = date.month
                dayNum = date.day + i
                dayArray[i] = monthNum.toString() + "-" + dayNum.toString()
            }
            response["x-axis"] = dayArray
            res.send(response)
        } else if (key === "month") {
        } else {
            let monthArray = []
            for (let i = 0; i < 12; i++) {
                monthArray[i] = (i + 1).toString()
            }
            response["x-axis"] = monthArray
            res.send(response)
        }
    }
}

exports.getRankList = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let response = {}
    for (let key in params) {
        if (key === "week") {
            response.list = {}
            const { week } = params
            let { curmonth, first_day } = chartUtils.weekToDate(week)
            let curYear = new Date().getFullYear()
            Record.find(
                {
                    uid: obj.uid,
                    year: curYear,
                    month: curmonth,
                    day: { $gte: first_day, $lte: first_day + 7 },
                },
                function (err, data) {
                    const temp = {}
                    let sum = 0
                    if (err) throw error
                    for (let dataitem of data) {
                        for (let tempitem of temp) {
                            if (tempitem.catagory === dataitem.catagory) {
                                tempitem.amount =
                                    tempitem.amount + dataitem.amount

                                sum = sum + dataitem.amount
                            } else {
                                let component = {}
                                component.catagory.push(dataitem.catagory)
                                component.icon.push(dataitem.icon)
                                component.type.push(0)
                                component.amount.push(dataitem.amount)

                                sum = sum + dataitem.amount

                                temp.push(component)
                            }
                        }
                    }
                    for (let tempitem of temp) {
                        tempitem.percentage.push(tempitem.amount / sum)
                    }
                    response.list.push(temp)
                    res.send(response)
                }
            )
        }
        if (key === "month") {
            response.list = {}
            const { month } = params
            let curYear = new Date().getFullYear()
            Record.find(
                {
                    uid: obj.uid,
                    year: curYear,
                    month: month,
                },
                function (err, data) {
                    const temp = {}
                    let sum = 0
                    if (err) throw error
                    for (let dataitem of data) {
                        for (let tempitem of temp) {
                            if (tempitem.catagory === dataitem.catagory) {
                                tempitem.amount =
                                    tempitem.amount + dataitem.amount

                                sum = sum + dataitem.amount
                            } else {
                                let component = {}
                                component.catagory.push(dataitem.catagory)
                                component.icon.push(dataitem.icon)
                                component.type.push(0)
                                component.amount.push(dataitem.amount)

                                sum = sum + dataitem.amount

                                temp.push(component)
                            }
                        }
                    }
                    for (let tempitem of temp) {
                        tempitem.percentage.push(tempitem.amount / sum)
                    }
                    response.list.push(temp)
                    res.send(response)
                }
            )
        }
        if (key === "year") {
            response.list = {}
            const { year } = params
            Record.find(
                {
                    uid: obj.uid,
                    year: year,
                },
                function (err, data) {
                    const temp = {}
                    let sum = 0
                    if (err) throw error
                    for (let dataitem of data) {
                        for (let tempitem of temp) {
                            if (tempitem.catagory === dataitem.catagory) {
                                tempitem.amount =
                                    tempitem.amount + dataitem.amount

                                sum = sum + dataitem.amount
                            } else {
                                let component = {}
                                component.catagory.push(dataitem.catagory)
                                component.icon.push(dataitem.icon)
                                component.type.push(0)
                                component.amount.push(dataitem.amount)

                                sum = sum + dataitem.amount

                                temp.push(component)
                            }
                        }
                    }
                    for (let tempitem of temp) {
                        tempitem.percentage.push(tempitem.amount / sum)
                    }
                    response.list.push(temp)
                    res.send(response)
                }
            )
        }
    }
}
