define(['note','noteDetailView'],function(Model,View){
  var Controller = {
      init: function (fid,id) {
          var m = new Model.model({id:id})
          m.urlRoot = '/note/'+fid
          // 如果id有值表示修改，没有值表示新增
          if(id){
            m.fetch()
            m.once('change',function(){
              new View({model: m})
            })
          }
          else{
            new View({model: m})
          }
      }
  }

  return Controller;
})
