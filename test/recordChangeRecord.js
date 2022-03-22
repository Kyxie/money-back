/*
 * @Date: 2022-03-19 18:35:47
 * @LastEditors: Xiang Fang
 * @LastEditTime: 2022-03-20 19:54:01
 * @FilePath: \Money_Back\test\recordAddRecord.js
 */

var expect = require("chai").expect
var request = require("request")
const chai = require("chai")
const app = require("../app")
const supertest = require("supertest")
const { response } = require("../app")
var url = "http://localhost:8080/monthly-balance"
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

describe("ChangeController in controller", function () {
    it("change the first one", function (done) {
        chai.request("http://localhost:8080")
            .get("/detail-list")
            .set({ Authorization: `Bearer ${token}` })
            .end(function (err, res) {
                console.log("res", res.body[0].list[0])
                supertest("http://localhost:8080")
                    // chai.request("http://localhost:8080")
                    .patch("/record")
                    .set({ Authorization: `Bearer ${token}` })
                    .send(requestBody)
                    .expect(200, function (err, res) {
                        const body = res.body
                        expect(body["data"]).to.include({
                            year: 2022,
                            month: 3,
                            day: 19,
                            category: "Work",
                            amount: 1200,
                            type: 1,
                            page: 1,
                            icon: "work-o",
                        })
                        done()
                    })
            })
    })
})
