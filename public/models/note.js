define(['backbone'],function(B){

  //////note模型
  var m = B.Model.extend({
    defaults:{
      content:""
    },
    parse:function(res){
      this.set(res.data)
      return res.data
    }
  })

  var c = B.Collection.extend({
    model:m,
    parse:function(res){
      this.set(res.data)
      return res.data
    }
  })

  return {model:m,collection:c}

})
