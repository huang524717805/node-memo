var express = require('express');
var router = express.Router();

var db = require('../db')

/**
 * 获取指定文件目录中的数据
 * 如果传递了id参数 
 * 如果没有
 * @param  {[type]} '/:folder/:id?' [description]
 * @param  {[type]} (req,           res,          next [description]
 * @return {[type]}                 [description]
 */
router.get('/:id?', (req, res, next) => {
    if (req.params.id) {
        db.NoteFolder.findById(req.params.id, (err, data) => {
            if (err) {
                res.json({
                    status: "n",
                    msg: "获取数据失败",
                    data: {}
                })
            } else {
                res.json({
                    status: "y",
                    msg: "返回数据成功",
                    data: db.toObject(data)
                })
            }
        })
    } else {
        // 查询所有的数据
        db.NoteFolder.find().sort('-_id').exec((err, data) => {
            if (err) {
                res.json({
                    status: "n",
                    msg: '获取数据失败',
                    data: {}
                })
            } else {
                // 做聚合处理 根据folder字段统计note中的数据
                db.Note.aggregate({
                    $group: {
                        _id: "$folder",
                        count: {
                            $sum: 1
                        }
                    }
                }).exec((err, gdata) => {
                    if (err) {
                        res.json({
                            status: "n",
                            msg: '获取数据失败',
                            data: {}
                        })
                    } else {

                        var resData = db.toArray(data)
                        // 遍历查询结果
                        resData = resData.map(function(item) {
                            var count = 0
                            // 遍历统计结果
                            for (var i = 0; i < gdata.length; i++) {
                                if (item.id == gdata[i]._id) {
                                    count = gdata[i].count
                                }
                            }
                            item.count = count;
                            return item
                        })
                        res.json({
                            status: "y",
                            msg: '获取数据成功',
                            data: resData
                        })
                    }
                })
            }
        });
    }
})

/**
 * 新增 post请求
 * @param  {[type]} '/:folder'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
router.post('/', (req, res, next) => {
    var noteFolder = new db.NoteFolder(req.body);
    noteFolder.save((err) => {
        if (err) {
            console.log(err)
            res.json({
                status: 'n',
                msg: '新增数据失败',
                data: {}
            })
        } else {
            res.json({
                status: 'y',
                msg: '新增数据成功',
                data:db.toObject(noteFolder)
            })
        }
    })
})

/**
 * 修改 put请求
 * @param  {[type]} '/:folder/:id' [description]
 * @param  {[type]} (req,res,next  [description]
 * @return {[type]}                [description]
 */
router.put('/:id', (req, res, next) => {
    req.body.update_time = Date.now();
    db.NoteFolder.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({
                status: 'n',
                msg: '修改数据失败',
                data: {}
            })
        } else {
            res.json({
                status: 'y',
                msg: '修改数据成功',
                data: {}
            })
        }
    })
})

/**
 * 删除 delete请求
 * @param  {[type]} '/:folder/:id' [description]
 * @param  {[type]} (req,res,next  [description]
 * @return {[type]}                [description]
 */
router.delete('/:id', (req, res, next) => {
    db.NoteFolder.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.json({
                status: 'n',
                msg: '删除数据失败',
                data: {}
            })
        } else {
            res.json({
                status: 'y',
                msg: '删除数据成功',
                data: {}
            })
        }
    })
})

module.exports = router;
