<template>
  <div>
    <navi :menuitem='menuitem'></navi>
    <div >
      <fieldset>
        <div class='item' style="background:#F1F1F1">
          <button type="button" class="mod-btn"  style="background:#3B85C7" @click="save">
            <i class="mod-btn-icon fa fa-save"></i>保存
          </button>
          <button type="button" class="mod-btn" style="background:#004080" @click="exit">
            <i class="mod-btn-icon fa fa-sign-out"></i>退出
          </button>
        </div>
        <fieldset>
          <legend class="title">系统信息</legend>
          <div class='item'>
            <span>系统名称<i style="color:red">*</i>：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>访问地址(本地)：</span><input type="text" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">设备连接</legend>
          <div class='item'>
            <span style="width:12%">USB连接</span><input type="checkbox" /></input>
            <span style="width:10%">互联网连接</span><input type="checkbox" /></input>
            <span style="width:10%">局域网连接</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span>IP范围(本地)：</span><input type="text" style="width:11%" /></input><span style="width:3% ;text-align:center;">...</span><input type="text" style="width:11%" />
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">用户登录</legend>
          <div class='item'>
            <span style="width:12%">服务器登录</span><input type="checkbox" /></input>
            <span style="width:10%">远程登录</span><input type="checkbox" /></input>
            <span style="width:10%">本地登录</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span>IP范围(本地)：</span><input type="text" style="width:11%" /></input><span style="width:3% ;text-align:center;">...</span><input type="text" style="width:11%" />
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">空间设置</legend>
          <div class='item'>
            <span>服务器空间/M：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>用户空间/M：</span><input type="text" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">外部数据接口</legend>
          <div class='item'>
            <span style="width:12%">允许外部读取：</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span>外部数据库链接名称：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>外部数据库链接地址：</span><input type="text" /></input>
          </div></br>
        </fieldset>
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
  padding: 15px 5px 15px;
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
