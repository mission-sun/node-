const querystring = require("querystring");
const {
  getBlogList,
  createBlog,
  getBlogDetail,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = req => {
  if (!req.session.username) {
    return new ErrorModel("登录失败");
  }
};

const handlerBlogSerive = (req, res) => {
  const method = req.method;
  const path = req.url.split("?")[0];
  const query = querystring.parse(req.url.split("?")[1]);

  if (method == "GET" && path == "/api/blog/list") {
    // const isLogin = loginCheck(req);
    // if(isLogin) return Promise.resolve(isLogin);

    const author = query.author || "";
    const keyWord = query.keyWord || "";
    const blogData = getBlogList(author, keyWord);
    // 返回的的blogData 是一个promise
    // 需要整体返回出去, 这个地的写法比较骚气
    // 服务器修改cookie 并且增加给前端浏览器
    // res.setHeader('Set-Cookie', 'username=1212', 'path=/')

    return blogData.then(res => {
      return new SuccessModel(res);
    });
  }
  if (method == "GET" && path == "/api/blog/detail") {
    const id = query.id || "";
    const blogData = getBlogDetail(id);
    return blogData.then(res => {
      return new SuccessModel(res);
    });
  }

  if (method == "POST" && path == "/api/blog/create") {
    const blogResult = createBlog(req, res);
    return blogResult.then(res => {
      return new SuccessModel(res);
    });
  }

  if (method == "POST" && path == "/api/blog/update") {
    const blogResult = updateBlog(req, res);
    return blogResult.then(res => {
      if (res) {
        return new SuccessModel();
      } else {
        return new ErrorModel();
      }
    });
  }
  if (method == "POST" && path == "/api/blog/del") {
    const blogResult = delBlog(req, res);
    return blogResult.then(res => {
      if (res) {
        return new SuccessModel();
      } else {
        return new ErrorModel();
      }
    });
  }
};

module.exports = handlerBlogSerive;
