var mongoose = require('mongoose');
var thongtin = new mongoose.Schema({taikhoan:'string',matkhau:'string',sodienthoai:'string'},{collection:'thongtin'});
module.exports = mongoose.model('thongtin',thongtin);