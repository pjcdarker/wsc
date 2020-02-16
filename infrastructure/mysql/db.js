const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 8,
    host: 'localhost',
    port: '3306',
    user: '1',
    password: '1',
    database: '1'
});



function save(sql, params, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, params, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            callback(error, results, fields)
        });
    })
}

function isExist(sql, values, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, values, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            callback(!!results.length)
        });
    })
}

function currentTimestamp(params) {
    return mysql.raw('CURRENT_TIMESTAMP()');
}

module.exports = {
    save,
    currentTimestamp,
    isExist
}

