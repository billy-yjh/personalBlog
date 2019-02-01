var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var tagsDao = require('../dao/TagsDao.js');
var blogDao = require('../dao/BlogDao.js');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao.js');
var url = require('url');
var path = new Map();

//随机标签云
function queryRandomTags(request, response) {
  tagsDao.queryAllTag(function (result) {
    result.sort(function () {
      return Math.random() > 0.5 ? true : false
    })
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  })
}
path.set('/queryRandomTags', queryRandomTags)

// 根据标签查询
function queryByTag(request, response) {
  var params = url.parse(request.url, true).query;
  tagsDao.queryTag(params.tag, function (result) {
    if (result == null || result.length == 0) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "评论成功", result));
      response.end();
    } else {
      tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
        // console.log(result)
        var blogList = [];
        for (var i = 0; i < result.length; i++) {
          blogDao.queryBlogById(result[i].blog_id, function (result) {
            blogList.push(result[0]);
          })
        }
        getResult(blogList, result.length, response)

      })
    }
  })
}
path.set('/queryByTag', queryByTag)
//通过阻塞的方式拿到信息
function getResult(blogList, len, response) {
  if (blogList.length < len) {
    setTimeout(function () {
      getResult(blogList, len, response)
    }, 10)
  } else {
    for(var i = 0; i < blogList.length; i++){
      // console.log(blogList[i])
      blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/,"");
      blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/,"");
    }
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", blogList));
    response.end();
  }
}

//根据标签查询总数
function queryByTagCount(request, response) {
  var params = url.parse(request.url, true).query;
  // console.log(params)
  tagsDao.queryTag(params.tag, function (result) {
    tagBlogMappingDao.queryByTagCount(result[0].id,function(result){
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "评论成功", result));
      response.end();
    })
  })

}
path.set('/queryByTagCount', queryByTagCount)
module.exports.path = path;