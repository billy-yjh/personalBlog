var dbutil = require('./DBUtil.js');
//存值
function insertEveryDay(content, ctime, success) {
  var insertSql = "insert into every_day (`content`, `ctime`) values (?, ?)";
  var params = [content, ctime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}


//取值
function queryEveryDay(success) {
  var querySql = "select * from every_day order by id desc limit 1;";
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}
module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;