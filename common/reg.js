
function ischina(str) {
    var reg = /[\u4E00-\u9FA5]+/;
    return reg.test(str);
}

module.exports = {
    ischina
}