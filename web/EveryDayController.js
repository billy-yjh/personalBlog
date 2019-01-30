
var respUtil = require('../util/RespUtil.js')
//引入用于获取 创建时间的方法
var timeUtil = require('../util/TimeUtil.js') 
//引入 对数据库操作的方法
var everyDayDao = require('../dao/EveryDayDao.js')

var path = new Map();
//给写入数据库
function editEveryDay(request,response){
  request.on('data',function(data){
    everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(),function(result){
      response.writeHead(200);
      response.write(respUtil.writeResult("success","添加成功",null))
      response.end()
    })
  })
}

path.set('/editEveryDay',editEveryDay)

//读取数据库数据方法
function queryEveryDay(request,response){
  everyDayDao.queryEveryDay(function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success","添加成功",result))
    response.end()
  })
}

path.set('/queryEveryDay',queryEveryDay)

module.exports.path = path