define(['jquery','backbone','text!tplAllFolder','template','noteFolder','alert'],function($,B,tpl,template,Model,Alert){

  return B.View.extend({
    el:$('body'),  //要把此处的html文件渲染到的节点
    template:template.compile(tpl),   //表示我此处的html模板内容
    initialize:function(){  ///初始化
      this.render()    ///此处调用渲染（render）方法
    },
    render(){
      // 处理传递进来的数据
      var arr = this.collection.models.map(function(item){
          return item.toJSON();
      })
      // 指定通话is.$el的内容
      this.$el.html(this.template({model:arr}))
    },
    events:{
      'click .note-create-dir':'addFolderHandle'
    },
    addFolderHandle:function(){
      var that = this;    //此处通过that中间变量实现参数传递
      var p = new Alert.Prompt("新建文件夹", function (dirName) {
        // view中的collection集合 调用create方法在集合中新建一个模型
        // 参数一是模型，参数二是 option{wait：true}     等待服务器端返回数据后跟新集合
          that.collection.create(new Model.model({name:dirName,count:0}),{wait: true})
          that.listenToOnce(that.collection,'sync',function(model){
            location.href = "";
          })
      }, function () {

      });
      p.show();
    }
  })

})
