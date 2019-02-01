var dbutil = require('./DBUtil.js');
//存值
function insertBlog(title, content, tags, views, ctime, utime, success) {
  var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
  var params = [title, content, tags, views, ctime, utime];

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
function querytBlogByPage(page,pageSize, success) {
  var querySql = "select * from blog order by id desc limit ?,?;";
  var params = [page*pageSize,pageSize];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

//查询博客总数
function querytBlogCount(success) {
  var querySql = "select count(1) as count from blog";
  var params = [];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

//根据id 查找blog
function queryBlogById(id , success) {
  var querySql = "select * from blog where id = ?";
  var params = [id];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

//查询全部的博客
function queryAllBlog(success){
  var querySql = "select * from blog order by id desc";
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
  connection.end();
}
//点击添加 观看数
function addViews(id,success){
  var querySql = "update blog set views = views + 1 where id = ?;";
  var params = [id]
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
  connection.end();
}

//根据观看数 查博客的热度  （博客总数）
function queryHotBlog(size,success){
  var querySql = "select * from blog order by views desc limit ? ;";
  var params = [size]
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
  connection.end();
}

//根据名字查博客
function queryBlogByTitle(title,page, pageSize,success){
  var querySql = "select * from blog where title like '%' ? '%' limit ?, ?;";
  var params = [title, page * pageSize, pageSize];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
  connection.end();
}
//根据名字查博客总数
function queryBlogByTitleCount(title,success){
  var querySql = "select count(1) as count from blog where title like '%'? '%' ;";
  var params = [title];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
  connection.end();
}

module.exports.queryBlogByTitleCount = queryBlogByTitleCount
module.exports.queryBlogByTitle = queryBlogByTitle
module.exports.insertBlog = insertBlog;
module.exports.querytBlogByPage = querytBlogByPage;
module.exports.querytBlogCount = querytBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;