const querystring = require("querystring");
const { getUserList } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// const {setVal, getVal } = require("../db/redis")

// 设置过期是时间   expires
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const handlerUserSerive = (req, res) => {
  const method = req.method;
  const path = req.url.split("?")[0];

  if (method == "POST" && path == "/api/user/login") {
    const user = getUserList(req, res);
    return user.then(userData => {
      if (userData.realname) {
        req.session.username = userData.username;
        req.session.realname = userData.realname;
        // res.setHeader('Set-Cookie', `username=${userData.username}; path=/; httpOnly `)
        return new SuccessModel();
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }

  if (method == "GET" && path == "/api/user/islogin") {
    console.log('session', req.session)
    if (req.session.username) {
      return Promise.resolve(new SuccessModel("已经登录"));
    } else {
      return Promise.resolve(new ErrorModel("没有登录"));
    }
  }
};

module.exports = handlerUserSerive;
