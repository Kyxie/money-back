/*
 * @Date: 2022-01-18 16:29:15
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:23:16
 * @FilePath: \backend\routes\users.js
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
