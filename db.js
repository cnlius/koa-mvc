const Sequelize = require('sequelize');
const config = require('./config');

console.log('init Sequelize...');

/**
 * sequelize数据库连接配置
 * @type {sequelize.Sequelize | sequelize}
 */
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


/**
 * model模板
 * @param name
 * @param attributes
 * @returns {Model}
 */
function defineModel(name, attributes) {
    //模板属性
    let attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        value.allowNull = value.allowNull || false;
        attrs[key] = value;
    }
    //默认的字段
    attrs.id = {
        type: Sequelize.INTEGER,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        //模型生命周期检查钩子
        hooks: {
            //操作数据库开始时设置默认字段
            beforeValidate: function (obj) {
                let date = new Date();
                let seconds = date.getSeconds();
                if (date.getSeconds() < 10) {
                    seconds = '0' + date.getSeconds();
                }
                let curTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
                    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + seconds;
                //判断是否是新纪录
                if (obj.isNewRecord) {
                    obj.createdAt = curTime;
                    obj.updatedAt = curTime;
                    obj.version = 0;
                } else {
                    obj.updatedAt = curTime;
                    obj.version++;
                }
            }
        }
    });
}


var db = {
    defineModel: defineModel
};

module.exports = db;