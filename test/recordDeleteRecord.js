/*
 * @Date: 2022-03-20 20:06:59
 * @LastEditors: Zihang Zhou
 * @LastEditTime: 2022-03-22 16:17:03
 * @FilePath: \Money_Back\test\recordDeleteRecord.js
 */
//uid: "6213f31da264bcabc69d4469"
var expect = require("chai").expect
var request = require("request")
const chai = require("chai")
const app = require("../app")
const { response } = require("../app")
var url = "http://localhost:8080/monthly-balance"
let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjEzZjMxZGEyNjRiY2FiYzY5ZDQ0NjkiLCJpYXQiOjE2NDU0Nzc1MTF9.LKWwIjoN9zxpMscZ_Nyw6_4xImZ9XwhOEDlxekWixgQ"

describe("DeleteController in controller", function () {
    it("delete the first one", function (done) {
        chai.request("http://localhost:8080")
            .get("/detail-list")
            .set({ Authorization: `Bearer ${token}` })
            .end(function (err, res) {
                console.log("res", res.body)
                chai.request("http://localhost:8080")
                    //.get()
                    .set({ Authorization: `Bearer ${token}` })
                    .delete("/reocrd" + res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200)
                        // response.should.be.json
                        // response.body.should.be.a("object")
                        // response.body.should.have.property("REMOVED")
                        // response.body.REMOVED.should.be.a("object")
                        // response.body.REMOVED.should.have.property("name")
                        // response.body.REMOVED.should.have.property("_id")
                        // response.body.REMOVED.name.should.equal("Bat")
                        done()
                    })
            })
    })
})
