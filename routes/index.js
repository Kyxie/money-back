/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-19 19:08:17
 * @FilePath: \backend\routes\index.js
 */

const express = require('express');
const router = express.Router();

const MainController = require('../controller/MainController')
const DetailController = require('../controller/DetailController')
/* GET home page. */
router.get('/', MainController.getMain)
router.get('/detail', DetailController.getDetail);

module.exports = router;
