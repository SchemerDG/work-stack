<template>
  <div>
    <navi :menuitem='menuitem'></navi>
    <div >
      <fieldset>
        <legend class="title">系统信息</legend>
        <div class='item'>
          <span>系统名称<i style="color:red">*</i>：</span><input type="text" /></input>
        </div></br>
        <div class='item'>
          <span>访问地址(本地)：</span><input type="text" /></input>
        </div>
      </fieldset>
      <fieldset>
        <legend class="title">设备连接</legend>
      </fieldset>
      <fieldset>
        <legend class="title">用户登录</legend>
      </fieldset>
      <fieldset>
        <legend class="title">空间设置</legend>
      </fieldset>
      <fieldset>
        <legend class="title">外部数据接口</legend>
      </fieldset>
    </div>
  </div>
</template>
<script>
import navi from '../../navi/index.vue'
export default {
  name: "CoreConfig",
  components: {
   navi,
 },
 computed:{
   menuitem: function () {
       return this.$store.state.tree[4].children[0];
     },
 },
 mounted:function(){
   console.log(this.$store.state.tree[4].children[0]);
 },
}
</script>
<style lang="less" scoped>
fieldset{
  padding: 15px 5px 3px;
  border: 1px solid rgb(213,215,216);
  margin-left:10px;
  margin-right: 30px;
  margin-top: 20px;
  .title{
    font-size: 16px;
    display: inline-block;
    margin: 0 15px;
    width: auto;
    font-weight: bold;
  }
  .item{
    font-size: 13px;
    width: 100%;
    float: left;
    line-height: 25px;
    letter-spacing: 1px;
    span{
      width: 12%;
      font-size: inherit;
      display: inline-block;
      text-align:right;
    }
    input[type='text']{
      width: 25%;
      height: 25px;
      line-height: 25px;
      overflow-x: hidden;
      box-sizing: border-box;
      border: 1px solid #c8cccf;
      margin-top: 3px;
      box-shadow:1px 1px 1px #aaaaaa;
    }
    .colon{
      width: 0;
      float: right;
      margin-right: 1rem;
    }
  }
}
</style>
