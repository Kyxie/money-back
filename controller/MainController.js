/*
 * @Date: 2022-01-19 15:31:24
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-19 17:21:43
 * @FilePath: \backend\controller\Main.js
 */

exports.getMain = function (req, res) {
    res.render('index', { title: 'Main' });
}