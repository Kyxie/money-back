/*
 * @Date: 2022-01-26 16:33:18
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-21 15:24:57
 * @FilePath: \backend\controller\LoginController.js
 */
const { generateToken } = require('../common/util.js')

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
            const uid = data._id
            const token = generateToken({ uid })
            console.log("User -> Token ->", uid, "=>", token)
            res.send({ "user": { "token": token }, "msg": 'Login successful', ...data });
        } else {
            res.send('Incorrect account name or password.');
        }
    })
};
