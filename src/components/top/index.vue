<template>
<div class="top container-fluid">
  <div class="row">
    <div class="md-8">
    </div>
    <div class="md-4" id="btns">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default btn-xs">
           <i class="fa fa-bell-o" aria-hidden="true">提醒</i></button>
        <div class="btn-group" role="group">
        <button type="button" class="btn btn-default btn-xs">
          <i class="fa fa-bars" aria-hidden="true"></i>待办事物</button>
        <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-question-circle-o" aria-hidden="true"></i>帮助
            <span class="glyphicon glyphicon-chevron-down" style="color: white; "> </span>
        </button>
        <button type="button" class="btn btn-default btn-xs">
             <i class="fa fa-user" aria-hidden="true"></i>{{getinfo.user_id}}</button>
          <ul class="dropdown-menu">
            <li><a href="#">Dropdown link</a></li>
            <li><a href="#">Dropdown link</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'top',
  data () {

    // loginUser:'';
    return {
        getinfo:''
    }
  },
  created:function() {
    console.log('created');
    var that=this;
    $.ajax({
      url:"who_i_am.php",
      type:"POST",
      dataType:"json",
      data:{
        "state":"who_i_am"
      },
      success:function(data){
        console.log(data);
          that.getinfo=data;
      }
    })
  },
  watch: {
    getinfo:function(curVal,oldVal){
      this.getinfo=curVal;
    }
  }
}
</script>
<style scoped lang="less">
  .btn{
    border-radius: 0.3rem !important;
  }
  .top {
    background-color: rgb(59, 124, 186);
  }
  .md-8 {
    width: 66%
  }
  .md-4 {
    width: 34%;
  }
  .btn-group{
    float: right;
    button {
      background-color: rgb(52, 133, 198);
      font-size: 13px;
      color: white;
      i {
        font-size: 13px;
        color: white;
      }
    }
  }
  .btn-default{
    margin: 10px;
  }

</style>
