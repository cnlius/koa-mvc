/**
 * @author liusong
 * @date 2018/6/8
 */
/**
 * @author liusong
 * @date 2018/6/8
 */

var mysql = require('mysql');
// 1. 创建数据库连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gogogo15820',
    database : 'db_test',
    port     : 3306
});
//2.连接数据库
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected ' + connection.threadId);
});
//3.执行sql语句
/**
 * 执行sql
 */
// connection.query('SELECT * FROM user', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });


//--sql防注入转义------------------------------------------

/**
 * sql注入操作
 */
// connection.query('SELECT * FROM user WHERE id=?', ['2 or id=3'],function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

/**
 * 查询值转义: escape转义（mysql.escape()、connection.escape()、pool.escape()）
 */
// connection.query('SELECT * FROM user WHERE id='+mysql.escape('2 or id=3'),function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

/**
 * 查询值转义: ?作为查询值得占位符
 */
// connection.query('SELECT * FROM user WHERE id=?', 2,function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });


/**
 * 查询标识转义: ?作为查询值得占位符
 */
// connection.query('SELECT * FROM user ORDER BY' + connection.escapeId('create_time'),function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

/**
 * 查询标识转义: 用 ?? 作为占位符来替代你想要转义的标识
 */
connection.query('SELECT * FROM user ORDER BY ??','create_time',function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});
//--sql防注入------------------------------------------



//4.关闭连接（end方法会确保执行完此前的所有查询）
connection.end(function(err) {
    if (err) {
        console.error('end error connecting: ' + err.stack);
        return;
    }
    console.log('end connected ' + connection.threadId);
});