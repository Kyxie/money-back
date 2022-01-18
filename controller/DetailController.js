/*
 * @Date: 2022-01-18 16:30:41
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-01-18 17:37:17
 * @FilePath: \backend\controller\DetailController.js
 */
const qs = require('qs')


exports.getDetail = function (req, res) {
    console.log(req)
    const params = qs.stringify(req.query)
    const response = {
        data: {
            username: '123',
            param: params
        },
        code: 200
    }
    res.send(response)
}