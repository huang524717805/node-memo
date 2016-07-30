define(['jquery','backbone','text!tplAllNote','template','note'],function($,B,tpl,template,Model){

  return B.View.extend({
    el:$('body'),
    template:template.compile(tpl),
    initialize:function(){
      this.render()


    },
    render(){
      // 获取folderID 通过collection的url
      var folderID = this.collection.url.split('/').splice(-1)[0];
      var arr = this.collection.models.map(function(item){
          return item.toJSON();
      })
      this.$el.html(this.template({model:arr,folderID:folderID}))
    }
  })

})
