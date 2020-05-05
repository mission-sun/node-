const exec = require("../db/mysql");

const getUserList = req => {
  const { username, password } = req.body;
  const sql = `select username, realname from users where username='${username}' and password = '${password}' `;
  console.log('usersql', sql)
  return exec(sql).then(res => {
    return res[0] || {};
  });
};

module.exports = { getUserList };
