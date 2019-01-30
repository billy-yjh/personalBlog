var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var blogDao = require('../dao/BlogDao.js');
var tagsDao = require('../dao/TagsDao.js');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao.js');
var url = require('url');
var path = new Map();

//查询全部博客 (按热度查)
function queryHotBlog(request,response){
  blogDao.queryHotBlog(5,function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success",'请求成功',result));
    response.end();
  })
}
path.set('/queryHotBlog',queryHotBlog)

//查询全部博客
function queryAllBlog(request,response){
  blogDao.queryAllBlog(function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success",'请求成功',result));
    response.end();
  })
}
path.set('/queryAllBlog',queryAllBlog)

//根据 id查询博客
function queryBlogById(request,response){
  var params = url.parse(request.url,true).query;
  blogDao.queryBlogById(parseInt(params.bid),function(result){
    // console.log(result)
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",result));
    response.end();
    blogDao.addViews(parseInt(params.bid),function(result){});
  })
}
path.set("/queryBlogById",queryBlogById);


//查博客总数
function queryBlogCount(request,response){
  blogDao.querytBlogCount(function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",result));
    response.end();
  })
}
path.set('/queryBlogCount',queryBlogCount);

//查询
function queryBlogByPage(request,response){
  var params = url.parse(request.url,true).query;
  blogDao.querytBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
    for(var i = 0; i < result.length; i++){
      // console.log(result[i])
      result[i].content = result[i].content.replace(/<img[\w\W]*>/,"");
      result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/,"");
    }
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",result));
    response.end();
  })
}
path.set('/queryBlogByPage',queryBlogByPage)

function editBlog(request, response) {
  //获取地址后面的参数 并把参数解析成对象
  var params = url.parse(request.url, true).query;
  //把params的tag里面的空格去掉 并把中文的逗号替换成英文的逗号
  var tags = params.tags.replace(/ /g, "").replace("，", ",");
  request.on('data', function (data) {
    blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "添加成功", null));
      response.end();
      var blogId = result.insertId;
      var tagList = tags.split(",");
      for (var i = 0; i < tagList.length; i++) {
        //遍历taglist 看taglist的每一位存不存在
        if (tagList == '') {
          continue;
        }
        queryTag(tagList[i], blogId);
      }
    })
  })
}
path.set('/editBlog', editBlog);


//查询tag
function queryTag(tag, blogId) {
  tagsDao.queryTag(tag, function (result) {
    if (result == null || result.length == 0) {
      //如果没有这个tag 则调用写入tag的方法
      insertTag(tag, blogId);
    } else {
      //有的话就传给 tag 和 blog 的映射
      tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
    }
  })
}

//写入tag
function insertTag(tag, blogId) {
  tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
    insertTagBlogMapping(result.insertId, blogId)
  })
}

//写入 tag 和 blog 的映射
function insertTagBlogMapping(tagId, blogId) {
  tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
}

module.exports.path = path;