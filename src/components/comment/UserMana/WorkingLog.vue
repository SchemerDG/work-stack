<template>
  <div>
    <fieldset>
      <legend class="title">用户工作日志</legend>
      <div class="content">
        <div class="item" v-for="item in logList" :key="item.key">
          <span v-for="row in item.content" :key="row.key">{{ row }}</span>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  name: "workinglog",
  data: () => ({
       logList:""
    // logList: [
    //   {
    //     id: 1,
    //     content: ['2015-04-23 14:05', '登录系统', '李莉电脑', '网内', 'MAC:44-37']
    //   },
    //   {
    //     id: 2,
    //     content: ['2015-04-23 15:23', '新建工程', '调谐器测试验证', 'V1.0']
    //   }
    // ]
  }),
  computed:{
    getuserid: function () {
        return this.$parent.userId;
      }
  },
  watch:{
    getuserid: function(curVal,oldVal){
      var that = this;
      console.log("这是workinglog-watch11");
      console.log(curVal);
      // console.log(permitionList);
      $.ajax({
        url: "get_user_log.php",
        type:'POST',
        dataType:'Json',
        data: {
          "userid": curVal,
        },
        success: function(data){
          that.logList=data;
          console.log("这里是workinglog-watch");
          console.log(that.logList);
      }
    })
    },
 }
}
</script>
<style lang="less" scoped>
fieldset{
  padding: 15px 5px 3px;
  border: 1px solid rgb(213,215,216);
  .title{
    font-size: 1.6rem;
    display: inline-block;
    margin: 0 15px;
    width: auto;
    font-weight: bold;
  }
  .content{
    margin: 10px 15px;
    height: 300px;
    .item{
      font-size: 14px;
      letter-spacing: 1px;
      span{
        font-size: inherit;
        margin: 0 10px;
        color: rgb(103,103,103);
      }
    }
  }
}
</style>
