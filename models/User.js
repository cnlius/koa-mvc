/**
 * @author liusong
 * @date 2018/6/10
 */

const db = require('../db');

module.exports = db.defineModel('user', {
    name: db.STRING(100)
});