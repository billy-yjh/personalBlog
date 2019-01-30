var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var blogDao = require('../dao/BlogDao.js');
var tagsDao = require('../dao/TagsDao.js');
var commentDao = require('../dao/CommentDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao.js');
var url = require('url');
var captcha = require("svg-captcha")
var path = new Map();

function addComment(request, response) {
  var params = url.parse(request.url, true).query;
  commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName,
    params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(),
    function (result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "评论成功", null));
      response.end();
    })
}
path.set("/addComment", addComment);

//验证码生成
function queryRandomCode(request, response) {
  var img = captcha.create({
    fontSize: 50,
    width: 100,
    height: 34
  })
  response.writeHead(200);
  response.write(respUtil.writeResult("success", "评论成功", img));
  response.end();
}
path.set("/queryRandomCode", queryRandomCode);

//根据id查博客
function queryCommentsByBlogId(request, response) {
  var params = url.parse(request.url, true).query;
  commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  })
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

//根据id 查博客的数量
function queryCommentsCountByBlogId(request, response) {
  var params = url.parse(request.url, true).query;
  commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  })
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

// 查博客的数量 根据时间
function queryNewComments(request, response) {
  var params = url.parse(request.url, true).query;
  commentDao.queryNewComments(5, function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  })
}
path.set("/queryNewComments", queryNewComments);
module.exports.path = path;