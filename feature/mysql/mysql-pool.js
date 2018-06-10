/**
 * @author liusong
 * @date 2018/6/8
 */


var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'gogogo15820',
    database : 'db_test',
    port     : 3306
});

// 直接用pool查询
// pool.query('SELECT * FROM user', function(err, results, fields) {
//     if (err) throw err;
//     console.log(results);
// });

// 使用连接查询
pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM user ORDER BY ??','create_time',function (error, results, fields) {
        // 释放连接回连接池
        connection.release();
        // 销毁连接
        connection.destroy();
        pool.end();
        if (error) throw error;
        console.log(results);
    });
});


