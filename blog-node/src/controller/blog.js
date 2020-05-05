const exec = require("../db/mysql");

const getBlogList = (author, keyWord) => {
  let sql = `select * from blog where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyWord) {
    sql += `and title like '%${keyWord}%' `;
  }
  sql += `order by createTime  desc;`;
  console.log("sql", sql);
  return exec(sql);
};
const getBlogDetail = id => {
  const sql = `select * from blog where id = '${id}' `;
  return exec(sql).then(rows => {
    return rows[0];
  });
};
const createBlog = (req, res) => {
  // 目前输入汉字有问题
  const author = req.session.username;
  const { title, content } = req.body;
  const createTime = Date.now();
  const sql = `insert into blog (title, content, createTime, author) values
    ('${title}','${content}',${createTime},'${author}')`;
  return exec(sql).then(res => {
    return { id: res.insertId };
  });
};

// 更新博客
const updateBlog = (req, res) => {
  const { title, content, id } = req.body;
  const sql = `update blog set title = '${title}', content = '${content}' where id = ${id} `;
  return exec(sql).then(res => {
    if (res.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};
// 删除博客
const delBlog = (req, res) => {
  const { id } = req.body;
  const author = req.session.username
  const sql = `delete from blog where id = ${id} and author = '${author}' `;
  console.log("sql", sql);
  return exec(sql).then(res => {
    if (res.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  getBlogList,
  createBlog,
  getBlogDetail,
  updateBlog,
  delBlog
};
