/*
 * @Date: 2022-01-26 16:33:18
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-09 14:58:35
 * @FilePath: \backend\controller\LoginController.js
 */


var User = require('../model/users')
exports.Login = function (req, res) {
    console.log(req);
    var postData = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({
        username: postData.username,
        password: postData.password
    }, function (err, data) {
        if (err) throw err;
        if (data) {
            res.send({ "user": { "token": 244 }, "msg": 'Login successful', ...data });
        } else {
            res.send('Incorrect account name or password.');
        }
    })
};
