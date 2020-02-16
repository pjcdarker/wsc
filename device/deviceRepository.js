const db = require('../infrastructure/mysql/db')

function save(fields, callback) {
    let sql = 'INSERT INTO tmp_device_price SET ?';
    callback = callback || (() => { })
    db.save(sql, { ...fields, createTime: db.currentTimestamp(), updateTime: db.currentTimestamp() }, callback)
}

function isExist(params, callback) {
    let sql = 'SELECT id FROM tmp_device_price WHERE make=? and model=?';
    db.isExist(sql, params, callback);
}

function print(msg) {
    console.log(msg);
}

module.exports = {
    save,
    print,
    isExist
}