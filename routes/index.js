var express = require('express');
var router = express.Router();
var thongtinMongoose = require('../Mongoose/thongtin.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/dangnhap', function(req, res, next) {
  res.render('dangnhap', { saimk:'',saitk:'' });
});
router.get('/dangki', function(req, res, next) {
  res.render('dangki', { saimk:'',saitk:'' });
});
router.post('/dangki', function(req, res, next) {
  if (req.body.mk.length < 4 ) 
  {
    res.render('dangki',{saimk:'Nhập Lại Mật Khẩu',saitk:'Nhập Lại Tài Khoản'})
  }
  else if (req.body.tk.length < 6 ) 
  {
    res.render('dangki',{saitk:'Nhập Lại Tài Khoản',saimk:'Nhập Lại Mật Khẩu'})
  }
  else {
    var info = {
      "taikhoan":req.body.tk,
      "matkhau":req.body.mk,
      "sodienthoai":req.body.sdt,
    }
    thongtinMongoose.find({"taikhoan":info.taikhoan},function(err,dulieu) {
      if (dulieu.length > 0) 
      {
        res.render('dangki',{saitk:'Tài Khoản Đã Được Sử Dụng !',saimk:' '})
      }
      else
      {
        thongtinMongoose.insertMany(info,function(err,dulieu) {
        res.render('dkthanhcong');
      });
      }
    })   
  }
});
router.post('/dangnhap', function(req, res, next) {
  if (req.body.mk.length < 4 ) 
  {
    res.render('dangnhap',{saimk:'Nhập Lại Mật Khẩu',saitk:'Nhập Lại Tài Khoản'})
  }
  else if (req.body.tk.length < 6 ) 
  {
    res.render('dangnhap',{saitk:'Nhập Lại Tài Khoản',saimk:'Nhập Lại Mật Khẩu'})
  }
  else {  
    thongtinMongoose.find({$and:[{"taikhoan":req.body.tk},{"matkhau":req.body.mk}]},function(err,dulieu) {
      // dulieu.forEach(function(pt) {
      //   if (pt.taikhoan == req.body.tk && pt.matkhau == req.body.mk) 
      //   {
      //     res.redirect('/dnthanhcong');
      //   }
      // })
      if (dulieu.length > 0) 
      {
        res.render('dnthanhcong');
      }
      else {
        res.render('index');
      }
    })
  }
});
module.exports = router;
