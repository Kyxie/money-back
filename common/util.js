/*
 * @Date: 2022-01-18 16:32:37
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-25 16:38:21
 * @FilePath: \Money_Back\common\util.js
 */

const jwt = require("jsonwebtoken")

const secret = "123456"

const generateToken = (payload) => {
    if (payload) {
        return jwt.sign({ ...payload }, secret)
    }
}

const getJWTPayload = (token) => {
    return jwt.verify(token.split(" ")[1], secret)
}
exports.generateToken = generateToken
exports.getJWTPayload = getJWTPayload
