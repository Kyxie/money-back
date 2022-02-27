/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-25 12:53:39
 * @FilePath: \Money_Back\routes\index.js
 */

const express = require("express")
const router = express.Router()

const MainController = require("../controller/MainController")
const LoginController = require("../controller/LoginController")
const DetailController = require("../controller/DetailController")
const RecordController = require("../controller/RecordController")

/* GET home page. */
router.get("/", MainController.getMain) // Keep
router.post("/login", LoginController.Login)
router.get("/detail", DetailController.getDetail) // Keep
router.get("/monthly-balance", DetailController.getMonthlyBalance)
router.get("/detail-list", DetailController.getDetailList)
router.post("/record", RecordController.addRecord)

router.delete("/record", RecordController.deleteRecord) //user id, list id
router.patch("/record", RecordController.changeRecord) //user id, list id, catagory, catagory new amount

module.exports = router
