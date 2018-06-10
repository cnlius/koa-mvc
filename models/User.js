/**
 * @author liusong
 * @date 2018/6/10
 */
const Sequelize = require('sequelize');
const db = require('../db');

let User=db.defineModel('user', {
    name: Sequelize.STRING(100)
})
module.exports =User;