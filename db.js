/**
 * Created by yuluo on 16/07/23.
 */
////引入mongoose模块
var db = require('mongoose');

//// 链接数据库 mongodb 协议, localhost 主机ip, student_db 数据库名称
db.connect('mongodb://localhost/note_db');

var NoteFolder = db.model('note_folder',{
  name:{type:String,required:true},
  remarks:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  update_time:{type:Date,default:Date.now}
})

var Note = db.model('note',{
  content:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  update_time:{type:Date,default:Date.now},
  folder:{type:db.Schema.ObjectId,ref:'note_folder'}
})

/**
 * 导出一个方法以便在多个位置使用
 * 功能是：将模型转换成普通数据对象
 * 并将 _id 变成 id
 *
 * @param {Model} model 数据模型
 * @returns {Object} 数据模型中的数据
 */
toObject = function (model) {
    model = model.toObject()
    model.id = model._id.toString()
    delete model._id
    delete model.__v
    return model
}


/**
 * 将模型数组转换成普通数据对象的数组
 * 而且模型中的 _id 会被变成 id
 *
 * @param models 模型数组
 * @returns 普通数据数组
 */
toArray = function(models){
    return models.map(m => toObject(m))
}

/////模块导出
module.exports = {
    NoteFolder:NoteFolder,
    Note:Note,
    toObject:toObject,
    toArray:toArray
}
