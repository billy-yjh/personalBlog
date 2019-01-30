//用于返回内容  让返回更加格式化

function writeResult(status,msg,data){
  return JSON.stringify({status:status,msg:msg,data:data});
}
module.exports.writeResult = writeResult