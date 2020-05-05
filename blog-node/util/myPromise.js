const MyPromise = (req, res) => {
  const method = req.method
  const promise = new Promise((reslove, rejected) => {
    if(method == 'POST') {
      let postData = "";
      req.on("data", chunk => {
        postData += chunk.toString();
      });
      req.on("end", () => {
        // res.body = postData;
        reslove(JSON.parse(postData))
      });
    }else {
      reslove({})
    }
  });
  return promise
};

module.exports = MyPromise