var express = require('express');
var globalConfig = require('./config.js');
var loader = require('./loader.js');
var app = new express();
//提供对静态资源文件的服务   就是放HTML css js 文件的目录
app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get('/editEveryDay'));
app.get("/queryEveryDay",loader.get('/queryEveryDay'));

app.post("/editBlog",loader.get('/editBlog'));
app.get("/queryBlogByPage",loader.get('/queryBlogByPage'));

app.get('/queryBlogCount',loader.get('/queryBlogCount'));

app.get('/queryBlogById',loader.get('/queryBlogById'));

app.get('/addComment',loader.get('/addComment'));

app.get('/queryRandomCode',loader.get('/queryRandomCode'));

app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'));

app.get('/queryCommentsCountByBlogId',loader.get('/queryCommentsCountByBlogId'));

app.get('/queryAllBlog',loader.get('/queryAllBlog'));

app.get('/queryRandomTags',loader.get('/queryRandomTags'));

app.get('/queryHotBlog',loader.get('/queryHotBlog'));

app.get('/queryNewComments',loader.get('/queryNewComments'));
//根据tag来查详情
app.get('/queryByTag',loader.get('/queryByTag'));
//根据tag查数量
app.get('/queryByTagCount',loader.get('/queryByTagCount'));

//根据tag来查详情
app.get('/queryBlogByTitle',loader.get('/queryBlogByTitle'));
//根据tag查数量
app.get('/queryBlogByTitleCount',loader.get('/queryBlogByTitleCount'));
app.listen(globalConfig.port, function(){
  console.log('服务器已启动');
})