/*
 * @Date: 2022-01-26 16:33:18
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-26 16:43:10
 * @FilePath: \backend\controller\LoginController.js
 */

const qs = require('qs')

exports.Login = function (req, res) {
    console.log(req);
    response = {
        user: {
            token: 123,
            username: '123'
        }
    };
    return res.send(response);
}