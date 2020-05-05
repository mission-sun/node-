const handlerBlogSerive = require("./src/router/blog");
const handlerUserSerive = require("./src/router/user");

const SESSION_DATA = {};

const myPromise = require("./util/myPromise");
const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");
  // post 请求是异步的，所以参数需要异步处理   res.body 的请求是异步的
  // 请求地址
  myPromise(req, res).then(data => {
    if (data) {
      req.body = data;
    }
    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie;
    if (cookieStr) {
      cookieStr.split(";").forEach(ele => {
        if (!ele) {
          return;
        }
        const key = ele.split("=")[0].trim();
        const value = ele.split("=")[1].trim();
        req.cookie[key] = value;
      });
    }

    // 解析session
    // 判断有没有userid 没有创建一个{} 
    // 有userid 那就查看SESSION_DATA 中有没有
    let isNeedSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
      if (!SESSION_DATA[userId]) {
        SESSION_DATA[userId] = {};
      }
    } else {
      isNeedSetCookie = true;
      userId = `${Date.now()}_${Math.random()}`;
      SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];

    console.log('session', req.session)


    const blogResult = handlerBlogSerive(req, res);

    if (blogResult) {
      blogResult.then(blogData => {
        if (blogData) {
          if (isNeedSetCookie) {
            res.setHeader("Set-Cookie", `userid=${userId}; path=/;httpOnly;`);
          }
          res.end(JSON.stringify(blogData));
          return;
        }
      });
      return;
    }
    const userData = handlerUserSerive(req, res);
    if (userData) {
      userData.then(data => {
        if (data) {
          if (isNeedSetCookie) {
            res.setHeader("Set-Cookie", `userid=${userId}; path=/;httpOnly;`);
          }
          res.end(JSON.stringify(data));
          return;
        }
      });
      return;
    }
    // 没找到对应的连接
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write(" 404  not found ");
    res.end();
  });
};

module.exports = serverHandler;
