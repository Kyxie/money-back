/*
 * @Date: 2022-01-19 15:31:24
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-24 20:29:26
 * @FilePath: \backend\controller\MainController.js
 */

exports.getMain = function (req, res) {
    res.render("index", { title: "Main" })
}
