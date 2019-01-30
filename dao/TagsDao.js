var dbutil = require('./DBUtil');
//写入
function insertTag(tag, ctime, utime, success) {
  var insertSql = "insert into tags ( `tag`,`ctime`, `utime`) values (?, ?,?)";
  var params = [tag, ctime, utime];

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
//查询
function queryTag(tag, success) {
  var insertSql = "select * from tags where tag = ?;";
  var params = [tag];

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
//查询全部的tag标签
function queryAllTag(success) {
  var insertSql = "select * from tags ;";
  var params = [];
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
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;