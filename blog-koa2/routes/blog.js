const router = require("koa-router")();

router.prefix("/api/blog");

router.get("/list", function (ctx, next) {
  const query = ctx.query;
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }else {
    ctx.session.viewCount ++;
  }
  ctx.body = {
    errNo: 1,
    query,
    session: ctx.session,
    viewCont: ctx.session.viewCount
  };
});

module.exports = router;
