define(['noteFolder','folderView'],function(Model,View){
  var Controller = {
      init: function () {
          var c = new Model.collection()
          c.fetch({reset:true})
          c.on('reset',function(){
            new View({ collection: c })
          })
      }
  }

  return Controller;
})
