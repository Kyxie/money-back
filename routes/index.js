/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-28 23:24:11
 * @FilePath: \Money_Back\routes\index.js
 */

const express = require("express")
const router = express.Router()

const MainController = require("../controller/MainController")
const LoginController = require("../controller/LoginController")
const DetailController = require("../controller/DetailController")
const RecordController = require("../controller/RecordController")
const ChartController = require("../controller/ChartController")

router.get("/", MainController.getMain) // Keep
router.post("/login", LoginController.Login)

router.get("/detail", DetailController.getDetail) // Keep
router.get("/monthly-balance", DetailController.getMonthlyBalance)
router.get("/detail-list", DetailController.getDetailList)

router.post("/record", RecordController.addRecord)
router.delete("/record", RecordController.deleteRecord)
router.patch("/record", RecordController.changeRecord)

router.get("/valid-choices", ChartController.getValidChoices)
router.get("/line-chart", ChartController.getLineChart)
router.get("/rank-list", ChartController.getRankList)

module.exports = router
