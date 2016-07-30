define(['backbone'],function(B){

  /////note_folder模型
  var m = B.Model.extend({
    defaults:{
      name:""
    },
    parse:function(res){
      this.set(res.data)
      return res.data
    }
  })

  var c = B.Collection.extend({
    url:'/note_folder',
    model:m,
    parse:function(res){
      this.set(res.data)  //为Collection指定数据
      return res.data
    }
  })

  return {model:m,collection:c}

})
