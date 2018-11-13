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
          <legend class="title">用户密码</legend>
          <div class='item'>
            <span>密码位数：</span>
            <span style="width:5%">8位</span><input type="checkbox" /></input>
            <span style="width:7%">10位</span><input type="checkbox" /></input>
            <span style="width:10%">12位</span><input type="checkbox" /></input>
            <!-- <span style="width:8%"></span>
            <span style="width:auto">用户登录密码规则在系统建立初期进行设置，设置完成后不能修改</span> -->
          </div></br>
          <div class='item'>
            <span>密码强度：</span>
            <span style="width:5%">数字</span><input type="checkbox" /></input>
            <span style="width:7%">数字+字母</span><input type="checkbox" /></input>
            <span style="width:10%">数字+字母+符号</span><input type="checkbox" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">密码错误</legend>
          <div class='item'>
            <span>密码试错次数：</span>
            <span style="width:5%">5次</span><input type="checkbox" /></input>
            <span style="width:7%">8次</span><input type="checkbox" /></input>
            <span style="width:10%">10次</span><input type="checkbox" /></input>
            <!-- <span style="width:8%"></span>
            <span style="width:auto">用户登录密码规则在系统建立初期进行设置，设置完成后不能修改</span> -->
          </div></br>
          <div class='item'>
            <span>试错超限间隔：</span>
            <span style="width:5%">1分钟</span><input type="checkbox" /></input>
            <span style="width:7%">2分钟</span><input type="checkbox" /></input>
            <span style="width:10%">5分钟</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span>试错锁定次数：</span>
            <span style="width:5%">10次</span><input type="checkbox" /></input>
            <span style="width:7%">15次</span><input type="checkbox" /></input>
            <span style="width:10%">20次</span><input type="checkbox" /></input>
          </div></br>
        </fieldset>
        <fieldset>
          <legend class="title">告警设置</legend>
          <div class='item'>
            <span>设备相关警报：</span>
            <span style="width:5%">设备重用</span><input type="checkbox" /></input>
            <span style="width:7%">设备故障</span><input type="checkbox" /></input>
            <span style="width:10%">设备记录不符</span><input type="checkbox" /></input>
            <!-- <span style="width:8%"></span>
            <span style="width:auto">用户登录密码规则在系统建立初期进行设置，设置完成后不能修改</span> -->
          </div></br>
          <div class='item'>
            <span>工程相关警报：</span>
            <span style="width:5%">无效工程</span><input type="checkbox" /></input>
            <span style="width:7%">工程配置不符</span><input type="checkbox" /></input>
            <span style="width:10%">工程执行异常</span><input type="checkbox" /></input>
          </div></br>
          <div class='item'>
            <span>用户相关警报：</span>
            <span style="width:5%">用户重用</span><input type="checkbox" /></input>
            <span style="width:7%">客户端异常</span><input type="checkbox" /></input>
            <span style="width:10%">访问频度异常</span><input type="checkbox" /></input>
          </div></br>
        </fieldset>

      </fieldset>
    </div>
  </div>
</template>
<script>
import navi from '../../navi/index.vue'
export default {
  name: "SafeConfig",
  components: {
   navi,
 },
 computed:{
   menuitem: function () {
       return this.$store.state.tree[4].children[2];
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
      width: 27%;
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
