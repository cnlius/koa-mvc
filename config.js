/**
 * 数据库配置文件
 * @author liusong
 * @date 2018/6/8
 */
// config files:
const prodConfig = './config/config-prod.js';
const testConfig = './config/config-test-db.js';

var config = null;

if (process.env.NODE_ENV === 'test') {
    config = require(testConfig);
} else {
    config = require(prodConfig);
}

module.exports = config;