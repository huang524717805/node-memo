define(['jquery', 'backbone', 'text!tplNoteDetail', 'template'], function($, B, tpl, template) {

    var View = B.View.extend({
        el: $('body'),
        template: template.compile(tpl),
        initialize: function() {
          console.log('------')
            this.render()
        },
        render() {
            var folderID = ''
            if (this.model.id) {
              folderID = this.model.get('folder')
            } else {
              folderID = this.model.urlRoot.split('/').splice(-1)[0]
            }
            // 无论新增还是修改，model.content都是有值的
            // 新增时 content为空字符串
            // 修改是container为服务器保存的值
            this.$el.html(this.template({
                model: this.model.toJSON(),
                folderID:folderID
            }))
        },
        events:{
          'click .note-save-file':'saveHandle'
        },
        saveHandle:function(){
          console.log('click ....')
          this.model.set('content',this.$('#content').val())
          var that = this;
          // 监听model和服务器的同步事件
          this.model.on('sync',function(){
            that.undelegateEvents()    ///删除页面中所有的标签事件
            location.href = '#folder/'+that.model.get('folder')

          })
          // 保存数据
          this.model.save()
        }
    })
    return View;

})
