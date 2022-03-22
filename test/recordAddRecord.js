/*
 * @Date: 2022-03-19 18:35:47
 * @LastEditors: Zihang Zhou
 * @LastEditTime: 2022-03-20 19:54:01
 * @FilePath: \Money_Back\test\recordAddRecord.js
 */
var expect = require("chai").expect
var request = require("request")
const chai = require("chai")
const app = require("../app")
const { response } = require("../app")

const chaiHttp = require("chai-http")
const supertest = require("supertest")
chai.should()
chai.use(chaiHttp)

describe("RecordController in controller", function () {
    var url = "http://localhost:8080/record"
    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjEzZjMxZGEyNjRiY2FiYzY5ZDQ0NjkiLCJpYXQiOjE2NDU0Nzc1MTF9.LKWwIjoN9zxpMscZ_Nyw6_4xImZ9XwhOEDlxekWixgQ"
    let requestBody = {
        year: 2022,
        month: 3,
        day: 19,
        category: "Work",
        amount: 1200,
        type: 1,
        page: 1,
        icon: "work-o",
    }
    it("addRecord function", function (done) {
        supertest("http://localhost:8080")
            .post("/record")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
                year: 2022,
                month: 3,
                day: 20,
                category: "Work",
                amount: 1200,
                type: 1,
                page: 1,
                icon: "work-o",
            })
            .expect(200, function (err, res) {
                //console.log(res.body)
                const body = res.body
                expect(body).to.include.keys({
                    data: {
                        week: 12,
                        uid: "6213f31da264bcabc69d4469",
                    },
                })
                //console.log(Object.values(body["data"]))
                //console.log(body["data"])
                expect(body["data"]).to.include({
                    week: 12,
                    uid: "6213f31da264bcabc69d4469",
                })

                // ({
                //     // data: {
                //     //     week: 12,
                //     //     uid: "6213f31da264bcabc69d4469",
                //     // },
                //     data: {
                //         category: "Work",
                //         amount: 1200,
                //         type: 1,
                //         icon: "work-o",
                //         year: 2022,
                //         month: 3,
                //         day: 20,
                //         createAt: "2022-03-19T22:24:36.855Z",
                //         //_id: "62367218b162dcf77bec741a",
                //         uid: "6213f31da264bcabc69d4469",
                //         week: 12,
                //         __v: 0,
                //     },
                // })
                done()
            })
    })
})
