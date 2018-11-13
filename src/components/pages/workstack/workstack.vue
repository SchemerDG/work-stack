<template>
  <div class="workstack">
    <top></top>
    <!-- <div class="container-fluid"> -->
      <div class="row">
        <div class="left ">
          <!-- <leftside v-on:flag="change"></leftside> -->
          <leftside></leftside>
        </div>
        <div class="right navi ">
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
 import leftside from '../../leftside/index'
 import top from '../../top/index'
 import navi from '../../navi/index'
 export default {
   name: 'workstack',
   data(){
     // loginUser:"";
     return {

     }
   },
   components: {
     leftside,
     top,
     navi
   },
   computed: {
         loginUser:function(){
           return this.$route.params.loginUser;
         }
   },
   watch: {
     loginUser:function(curVal,oldVal){
       this.loginUser = curVal;
     }
   },
   created: function(){
      console.log("getinfo");
       this.loginUser = this.$route.params.loginUser;
       // console.log("这是workstack");
       // console.log(this.loginUser);//undefine
      setInterval(function(){
          //console.log("heart");
        $.ajax({
          url:"heart.php",
          type:"POST",
          dataType:"json",
          data:{
            "state":"i'm alive"
          },
          success:function(data){
          //  console.log("我知道你还活着");
          }
        })
      },5000);
   },
   methods: {
      // change:function (msg) {
      //   if (msg=="right") {
      //     $(".right").css({
      //       "width":"84%"
      //     })
      //   }
      //   if(msg=="left") {
      //     $(".right").css({
      //       "width":"100%"
      //     })
      //   }
      // }
   }
 }
</script>
<style scoped lang="less">
* {
  padding: 0px;
  margin: 0px;
}
html,body {
  height: 100%;
  width: 100%;
}
.workstack{
  width: 100%;
  height: 100%;
  min-width: 1680px;
  min-height: 860px;
  overflow: hidden;
  .left {
    width: 16%;
    height: 100%;
    leftside {
      height: 100%;
      width: 100%;
    }
  }
  .right {
    width: 84%;
    height: 100%;
  }
  router-view {
    width: 100%;
    height: 100%;
  }
}
</style>
