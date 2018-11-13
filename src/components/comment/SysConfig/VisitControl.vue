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
          <legend class="title">登录时间</legend>
          <div class='item'>
            <span>允许登录起始时间：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>允许登录截止时间：</span><input type="text" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">强制退出</legend>
          <div class='item'>
            <span style="width:12%">强制退出用户选择：</span><input type="text" style="height:80px"/></input>
          </div></br>
          <div class='item'>
            <span style="width:20%"></span>
            <button type="button" class="mod-btn"  style="background:#3B85C7;" @click="save">
              <i class="mod-btn-icon fa fa-save"></i>确认
            </button>
            <button type="button" class="mod-btn" style="background:#004080;width:86px;"  @click="exit">
              <i class="mod-btn-icon fa fa-sign-out"></i>添加人员
            </button>
            <button type="button" class="mod-btn" style="background:#004080" @click="exit">
              <i class="mod-btn-icon fa fa-sign-out"></i>删除
            </button>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">设备控制</legend>
          <div class='item'>
            <span style="width:12%">允许远程注册设备</span><input type="checkbox" /></input>
            <span style="width:10%">允许远程开启设备</span><input type="checkbox" /></input>
            <span style="width:10%">允许远程关闭设备</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span style="width:12%">允许远程下载工程</span><input type="checkbox" /></input>
            <span style="width:10%">允许远程执行工程</span><input type="checkbox" /></input>
            <span style="width:10%">允许远程删除工程</span><input type="checkbox" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">在线控制</legend>
          <div class='item'>
            <span>在线用户数量上限：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>最长在线时长控制：</span><input type="text" /></input>
          </div></br>
          <div class='item'>
            <span>无操作退出时长：</span><input type="text" /></input>
          </div></br>
        </fieldset>
      </fieldset>
    </div>
  </div>
</template>
<script>
import navi from '../../navi/index.vue'
export default {
  name: "VisitControl",
  components: {
   navi,
 },
 computed:{
   menuitem: function () {
       return this.$store.state.tree[4].children[1];
     },
 },
 mounted:function(){
   
 },
}
</script>
<style lang="less" scoped>
fieldset{
  padding: 2px 5px 15px;
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
    margin-top:5px;
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
