/*
 * @Date: 2022-01-26 23:22:55
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-03 16:32:56
 * @FilePath: \Money_Back\controller\RegisterController.js
 */

exports.postRegister = function (req, res) {
    let postData = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address,
    }

    User.findOne({ username: postData.username }, function (err, data) {
        if (data) {
            res.send("User ID has been taken")
        } else {
            User.create(postData, function (err, data) {
                if (err) throw err
                console.log("Sign up successful")
                res.redirect("/userList")
            })
        }
    })
}

exports.getRegister = function (req, res) {
    var userList = User.find({}, function (err, data) {
        if (err) throw err
        res.send(data)
    })
}
