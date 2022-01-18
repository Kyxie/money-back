/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:31:12
 * @FilePath: \backend\routes\index.js
 */

const express = require('express');
const router = express.Router();
const DetailController = require('../controller/DetailController')
const ChartController = require('../controller/ChartController')
// const ChartController = require('../controller/ChartController')
/* GET home page. */
router.get('/detail', DetailController.getDetail);
router.get('/chart', ChartController.getChart);
// router.get('/chart', (req, res) => ChartController(req, res));

module.exports = router;
