define(['note','noteListView'],function(Model,View){
  var Controller = {
      init: function (id) {
        // 集合
          var c = new Model.collection()
          // 此处需要对每一个集合的url进行设置
          c.url = '/note/'+id
          c.fetch({reset:true})
          // 当集合的数据改变的时候 reset事件被触发
          c.once('reset',function(){
            new View({collection: c})
          })
      }
  }

  return Controller;
})
