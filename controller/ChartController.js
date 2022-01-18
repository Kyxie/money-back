/*
 * @Date: 2022-01-18 17:12:44
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:31:19
 * @FilePath: \backend\controller\ChartController.js
 */


exports.getChart = function (req, res) {
    res.render('index', { title: 'Chart' });
}