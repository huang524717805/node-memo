define(['backbone', 'folderController', 'noteListController', 'noteDetailController'],
    function (B, folderController, noteListController, noteDetailController) {
        var Router = B.Router.extend({
            ////定义路由信息
            /// 路由地址:执行函数
            routes: {
                '': 'allFolder',
                'folder/:id': 'folder',
                'note/:fid': 'note',
                'note/:fid/:id': 'note'
            },
            allFolder: function () {
                ///////index 路由执行的时候
                folderController.init();

            },
            folder: function (id) {
                noteListController.init(id)
            },
            note: function (fid,id) {
                // fid表示目录(note_folder)id,id表示文件id
                noteDetailController.init(fid,id);
            }
        })
        var router = new Router();
        return router;
    })
