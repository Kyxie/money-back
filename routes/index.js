/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-10 14:43:56
 * @FilePath: \Money_Back\routes\index.js
 */

const express = require("express")
const router = express.Router()

const MainController = require("../controller/MainController")
const LoginController = require("../controller/LoginController")
const DetailController = require("../controller/DetailController")
const RecordController = require("../controller/RecordController")
const ChartController = require("../controller/ChartController")
const BudgetController = require("../controller/BudgetController")
const SummaryController = require("../controller/SummaryController")

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

router.get("/budget", BudgetController.findBudget) //monthly budget
router.patch("/budget", BudgetController.changeBudget)

router.get("/summary", SummaryController.getTotalSummary) //total bill days and total bill record's amount

module.exports = router
