var express = require('express');
var router = express.Router();

var db = require('../db')

/**
 * 获取指定文件目录中的数据
 * @param  {[type]} '/:folder/:id?' [description]
 * @param  {[type]} (req,           res,          next [description]
 * @return {[type]}                 [description]
 */
router.get('/:folder/:id?', (req, res, next) => {
    if (req.params.folder) {
        if (req.params.id) {
            db.Note.findById(req.params.id, (err, data) => {
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
            db.Note.find({
                folder: req.params.folder
            }).sort('-_id').exec((err, data) => {
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
                        data: db.toArray(data)
                    })
                }
            })
        }
    } else {}
});

/**
 * 新增 post请求
 * @param  {[type]} '/:folder'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
router.post('/:folder', (req, res, next) => {
    var note = new db.Note(req.body);
    note.folder = req.params.folder
    note.save((err) => {
        if (err) {
            res.json({
                status: 'n',
                msg: '新增数据失败',
                data: {}
            })
        } else {
            res.json({
                status: 'y',
                msg: '新增数据成功',
                data: note
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
router.put('/:folder/:id', (req, res, next) => {
    req.body.update_time = Date.now();
    db.Note.findByIdAndUpdate(req.params.id, req.body, (err) => {
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
router.delete('/:folder/:id', (req, res, next) => {
    db.Note.findByIdAndRemove(req.params.id, (err) => {
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
