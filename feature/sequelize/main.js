const Sequelize = require('sequelize');
const config = require('./config');

// 可以简单地使用 uri 连接
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
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

//测试数据库连接
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// 创建数据库表映射模板
let User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER, // INTEGER
        autoIncrement: true, //主键自增
        primaryKey: true //主键
    },
    name: Sequelize.STRING, // VARCHAR(255)
    sex: Sequelize.STRING, // VARCHAR(255)
    age: Sequelize.INTEGER, // INTEGER
    create_time: Sequelize.BIGINT // BIGINT
}, {
    // orm自动增加时间戳，可以禁用,禁用后就不会自动插入createdAt和updatedAt时间
    timestamps: false,
    //也可以手动隐藏创建和更新时间
    // createdAt: false,
    // updatedAt: false,
    tableName: 'user' //表名称默认会加s, 这里可以设置最终的表名；
});

//--增加操作-------------------------------------

// promise方式操作数据库
// User.create({
//     name: '李x龙',
//     sex: '男',
//     age: 33,
//     create_time: new Date()
// },{ fields: [ 'name' ] }).then(result => {
//     console.log(JSON.stringify(result));
// }).catch(error => {
//     console.log(error.stack);
// });

// 异步方式操作数据库
// (async () => {
//     await User.create({
//         name:'李云龙',
//         sex:'男',
//         age: 33,
//         create_time:'2018-02-01'
//     });
// })();

//--查询操作-------------------------------------

// (async () => {
//     let users = await User.findAll({
//         //设置需要查询的字段，通过嵌套数组给查询的字段重命名（相当于sql中的as）
//         attributes: [['id','userId'], 'name',[sequelize.fn('COUNT', sequelize.col('name')), 'nameCount']],
//         //查询条件
//         where: {
//             name: '李云龙'
//         },
//         //id降序排序
//         order: [['id','DESC']],
//         //分页设置，跳过2条数据，取5条数据
//         offset:2,
//         limit:5
//
//     });
//     console.log(`user count: ${users.length}`);
//     for (let user of users) {
//         console.log(JSON.stringify(user));
//     }
// })();

// 查询单个实例
(async () => {
    let user = await User.find({
        where: {
            sex: '女'
        }

    });
    console.log(user);
})();

//聚合函数查询
// (async () => {
//         let users = await User.findAll({
//             //设置需要查询的字段是一个聚合函数，可以使用sql中的函数
//             attributes: [[sequelize.fn('COUNT', sequelize.col('name')), 'nameCount']],
//             //查询条件
//             where: {
//                 name: '李云龙'
//             }
//
//         });
//         console.log(`user count: ${users.length}`);
//         for (let user of users) {
//             console.log(JSON.stringify(user));
//         }
// })();

//查询多少条记录
// (async () => {
//     let users = await User.count({
//         where:{
//             name:'李云龙'
//         }
//     });
//     console.log(`user count: ${users}`);
// })();


// 删除
// (async () => {
//     let count=await User.destroy({
//         where:{
//             name:'李云龙'
//         }
//     });
//     console.log(count);
// })();

//批量修改
// (async () => {
//     let user = await User.update({sex:'女'},{
//         where:{}
//     });
// })();





















