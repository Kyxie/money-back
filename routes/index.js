/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-26 16:45:13
 * @FilePath: \backend\routes\index.js
 */

const express = require('express');
const router = express.Router();

const MainController = require('../controller/MainController');
const LoginController = require('../controller/LoginController');
const DetailController = require('../controller/DetailController');
/* GET home page. */
router.get('/', MainController.getMain);
router.post('/login', LoginController.Login);
router.get('/detail', DetailController.getDetail);
router.get('/monthly-balance', DetailController.getMonthlyBalance);
router.get('/detail-list', DetailController.getDetailList);

module.exports = router;
