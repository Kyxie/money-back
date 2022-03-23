/*
 * @Date: 2022-03-18 16:17:29
 * @LastEditors: Zihang Zhou
 * @LastEditTime: 2022-03-22 19:10:25
 * @FilePath: \Money_Back\test\monthly-balance.js
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

describe("monthly-balance", function () {
    describe("1.authorized 2.unauthorized 3.empty query 4.year=2022, month=2", function () {
        var url = "http://localhost:8080/monthly-balance"
        let token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjEzZjMxZGEyNjRiY2FiYzY5ZDQ0NjkiLCJpYXQiOjE2NDU0Nzc1MTF9.LKWwIjoN9zxpMscZ_Nyw6_4xImZ9XwhOEDlxekWixgQ"

        it("returns status 200, normal", function (done) {
            chai.request("http://localhost:8080")
                .get("/monthly-balance")
                .set({ Authorization: `Bearer ${token}` })
                .then((res) => {
                    //expect(res).to.have.status(200)
                    expect(response.statusCode).to.equal(200)
                    const body = res.body
                    //console.log(body) //- not really needed, but I include them as a comment
                    done()
                })
                .catch((err) => done(err))
        })

        it("returns status 401", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(401) //
                done()
            })
        })
        it("returns status 200, when parameters is empty.", function (done) {
            chai.request("http://localhost:8080")
                .get("/monthly-balance")
                .set({ Authorization: `Bearer ${token}` })
                //supertest("http://localhost:8080/monthly-balance")
                //.post("/monthly-balance")
                //.send({ year: "2022", month: "2" })
                //.get("/")
                //.query({ n: 1 })
                .then((res) => {
                    //expect(res).to.have.status(200)
                    expect(response.statusCode).to.equal(200)
                    const body = res.body
                    expect(body).to.include({
                        income: 0,
                        expense: 0,
                    })
                    //console.log(body) //- not really needed, but I include them as a comment
                    done()
                })
                .catch((err) => done(err))
        })

        it("year = 2022 month =2 ", function (done) {
            // chai.request("http://localhost:8080")
            //     .get("/monthly-balance")
            //     .set({ Authorization: `Bearer ${token}` })
            supertest("http://localhost:8080")
                .get("/monthly-balance")
                .set({ Authorization: `Bearer ${token}` })
                .query({ year: 2022, month: 2 })
                .expect(200, function (err, res) {
                    if (err) {
                        console.log(err)
                        done(err)
                    } else {
                        //console.log(res.body)
                        const body = res.body
                        expect(body).to.include({
                            year: "2022",
                            month: "2",
                            income: 9910,
                            expense: 0,
                        })
                        done()
                    }
                })
        })
    })
})
