<template>
    <div>
      <navi :menuitem=menuitem />
      <div class="usermana">
        <div class="container-fluid">
          <div class="row">
            <div class="md-3">
              <pagetitle :pageTitle='pageTitle'/>
              <div class="user-info">
                <div class="btns">
                  <button type="button" class="mod-btn mod-btn-ref" @click='ref'>
                    <i class="mod-btn-icon fa fa-refresh"></i>刷新
                  </button>
                  <button type="button" class="mod-btn mod-btn-del" @click='del'>
                    <i class="mod-btn-icon fa fa-trash"></i>删除
                  </button>
                  <button type="button" class="mod-btn mod-btn-add" @click="add">
                    <i class="mod-btn-icon fa fa-plus"></i>添加
                  </button>
                </div>
                 <ul id='usersTree' class="ztree_user"></ul>
              </div>
            </div>
            <div class="md-9">
              <div class="content">
                <pagetitle :pageTitle='pageTitle2'/>
                <div class="buttons clear">
                  <button type="button" class="mod-btn mod-btn-save" @click="save">
                    <i class="mod-btn-icon fa fa-check-circle-o"></i>保存
                  </button>
                  <button type="button" class="mod-btn mod-btn-log" @click="setPage(true)">
                    <i class="mod-btn-icon fa fa-file-text-o"></i>日志
                  </button>
                  <button type="button" class="mod-btn mod-btn-permi" @click="setPage(false)">
                    <i class="mod-btn-icon fa fa-cog" ></i>权限
                  </button>
                </div>
                <div class="baseinfo">
                  <fieldset>
                    <legend class="title">用户基本信息</legend>
                    <div class="infolists clear">
                      <div class="item">
                        <span>用户名称<i style="color:red"> * </i><span class="colon">:</span></span>
                        <input type="text" v-model="user.username">
                      </div>
                      <div class="item">
                        <span>用户工号<span class="colon">:</span></span>
                        <input type="text" v-model="user.userid">
                      </div>
                      <div class="item">
                        <span>所在部门<span class="colon">:</span></span>
                        <input type="text"  v-model="user.department">
                      </div>
                      <div class="item">
                        <span>所任职务<span class="colon">:</span></span>
                        <input type="text" v-model="user.position">
                      </div>
                      <div class="item">
                        <span>登陆账号<span class="colon">:</span></span>
                        <input type="text" v-model="user.loginId">
                      </div>
                      <div class="item">
                        <span>登陆密码<span class="colon">:</span></span>
                        <input type="text" v-model="user.password">
                      </div>
                      <div class="item">
                        <span>手机MAC<span class="colon">:</span></span>
                        <input type="text" v-model="user.phoneMac">
                      </div>
                      <div class="item disabled">
                        <span>PC MAC<span class="colon">:</span></span>
                        <input type="text" disabled='true' v-model="user.PCMac">
                      </div>
                      <div class="item disabled">
                        <span>登陆设备<span class="colon">:</span></span>
                        <input type="text" disabled='true' v-model="user.device">
                      </div>
                      <div class="item disabled">
                        <span>登陆区域<span class="colon">:</span></span>
                        <input type="text" disabled='true' v-model="user.area">
                      </div>
                      <div class="item disabled">
                        <span>注 册 人<span class="colon">:</span></span>
                        <input type="text" disabled='true' v-model="user.register">
                      </div>
                      <div class="item disabled">
                        <span>注册日期<span class="colon">:</span></span>
                        <input type="text" disabled='true' v-model="user.regiTime">
                      </div>
                    </div>
                  </fieldset>
                </div>
                <PermitionMana  v-show="!isLog" ref="PermitionMana"/>
                <WorkingLog v-show='isLog'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import navi from '../../navi/index.vue'
import pagetitle from '../../utils/PageTitle'
import buttons from '../../utils/Buttons'
import createDataTree from '../../utils/createDataTree'
import PermitionMana from './PermitionMana'
import WorkingLog from './WorkingLog'
import 'ztree'
import '../../../plugins/treecss/user_tree_style/Style.css'
export default {
  name: 'usermana',
  components: {
    navi,
    pagetitle,
    buttons,
    createDataTree,
    PermitionMana,
    WorkingLog
  },
  data () {
    return {
      checkedIds: [],
      userId:"",
      item:"",
      options: {
        label:'name',
        idsWithParent: false,
        checkbox:true,
        uncheckedIcon:"fa fa-user-o",
        checkedIcon:"fa fa-user",
        halfCheckedIcon:"fa fa-user-circle-o",
        folderBold:'false',
        openIcon:"fa fa-plus-square",
        closeIcon:"fa fa-minus-square"
      },
      isLog: false,
      pageTitle: '用户列表',
      pageTitle2: '用户信息与权限',
      userlists:"",
      user:"",
      testdata:"TEST",
      setting:{
        view: {
          showLine: true,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.zTreeOnClick
        }
      },
    }
  },
  computed: {
    menuitem: function () {
        return this.$store.state.tree[1]
      },
      nodeData:function(){
       return this.userlists;
     },

    },
    mounted(){
        var treeObj =$.fn.zTree.init($("#usersTree"), this.setting, this.nodeData);
        treeObj.expandAll(true);
    },
    watch:{
      nodeData: function(curVal,oldVal){
          var that = this;
          var treeObj =$.fn.zTree.init($("#usersTree"), this.setting, this.nodeData);
          treeObj.expandAll(true);
      },
   },
    methods: {

      // showInfo(id){
      // console.log('点击了编辑按钮，节点ID[' + id + ']');
      // },
      add() {
        console.log(this.userlists);
        var that = this;
        var status=true;
        for(var i=0;i<this.userlists.children.length;i++){
          if(this.userlists.children[i].name==="未命名"){
              console.log("已存在未命名用户，请先编辑！");
              var status=false;
          }
        }
        if(status==true)
        {
          $.ajax({
            url: "new_user.php",
            type:'POST',
            dataType:'Json',
            data: {
              "adduser": "adduser",
            },
            success: function(data){
              that.userlists=data;
              console.log(that.userlists);
              setTimeout(function(){
                var treeObj = $.fn.zTree.getZTreeObj("usersTree");
                treeObj.selectNode(treeObj.getNodeByParam("user_id",'recieve', null));
                var userid ='recieve';
                that.userId=userid;
                $.ajax({
                  url: "/get_user_information_other.php",
                  type:'POST',
                  dataType:'Json',
                  data: {
                    "userid": userid,
                  },
                  success: function(user){
                    that.user=user;
                    console.log(that.user);
                }
              })
            },200);
          }
        })
        }
    },
    del() {
      var that = this;
      if(this.userId===""){
        console.log("请选择一个用户");
      }else {
        var treeObj = $.fn.zTree.getZTreeObj("usersTree");
        var nodes = treeObj.getSelectedNodes();
        var temp_id='';
        console.log(nodes);
        for(var i=0;i<nodes.length;i++)
        {
          temp_id=nodes[i].user_id;
          console.log(temp_id);
          $.ajax({
            url: "user_delete.php",
            type:'POST',
            dataType:'Json',
            data: {
              "userid":temp_id,
            },
            success: function(data){
              that.userlists=data;
              console.log(that.userlists);
              console.log("删除成功");
          }
        })
        }
      }
    },
    ref() {
      var that =this;
      $.ajax({
        url:"get_users.php",
        type:"POST",
        dataType:"Json",
        data:{
          "userName": "1"
        },
        success:function(data){
          console.log(data);
          that.userlists=data;
          console.log(that.userlists);
          console.log("刷新成功");
        }
      })
    },
      save() {
        var that=this;
        console.log(that.userId);
        if(that.user.username===""||that.user.username==="未命名"){
          console.log("用户名不能为空，或未命名");
        }else if (that.user.password==="") {
          console.log("密码不能为空");
        }else if (that.user.loginId===""||that.user.loginId==="recieve") {
          console.log("登陆账号不能为空，或recive");
        }else {
          var permitionList = that.$refs.PermitionMana.permitionList;
          console.log(permitionList);
          $.ajax({
            url:"user_save.php",
            type:'POST',
            dataType:'JSON',
            // data:user,
            data:{
              "user":that.user,
              "permitionList":permitionList,
              "userid":that.userId
            },
            success:function(data) {
              that.userlists= data;
              console.log(data);
              console.log("保存成功");
              that.userId=that.user.loginId;
              console.log(that.userId);
            }
          })
        console.log("前面是保存成功后的id");
        }
      },
      setPage(flag){
        if (flag) {
          this.isLog = true
        }else {
          this.isLog = false
        }
      },
      zTreeOnClick:function(event, treeId, treeNode){
        console.log( treeId,treeNode);
        var that = this;
        if(treeNode.name!="DEVISER组态工作栈管理系统")
        {
            var userid =treeNode["user_id"];
            this.userId=userid;
            this.item=treeNode;
            $.ajax({
              url: "/get_user_information_other.php",
              type:'POST',
              dataType:'Json',
              data: {
                "userid": userid,
              },
              success: function(user){
                that.user=user;
                console.log(that.user);
            }
          })
        }
        console.log(userid);
        },
    },
    created: function(){
      var that = this;
      console.log(this.testdata);
      console.log("ajax之前");
       $.ajax({
         url: "get_users.php",
         type:'POST',
         dataType:'Json',
         data: {
           "userName": "1",
         },
         success: function(data){
           that.userlists = data;
             console.log(data);
             console.log("ajax成功");
         }
       })
       console.log("ajax之后");
    }
}
</script>
<style lang="less" scoped>
  .disabled{
    color: rgb(205, 205, 205) !important;
  }
  .usermana{
    box-sizing: border-box;
    height: 100%;
    margin: 5px 0 0 5px;
    border: 1px solid rgb(213,215,216);
    .md-3 {
      width: 25%;
      box-sizing: border-box;
      padding: 0;
      border-right: 1px solid rgb(213,215,216);
      .user-info{
        height: 100%;
        overflow-y: scroll;
        .btns {
          width: 100%;
          height: 40px;
          padding: 2px 0;
          button{
            float: right;
            margin: 2px;
          }
        }

      }
    }
    .md-9{
      width: 75%;
      padding: 0 0 0 4px;
      .content{
        box-sizing: border-box;
        padding: 0;
        height: 100%;
        overflow-y: scroll;
        border-right: 1px solid rgb(213,215,216);
        .buttons{
          box-sizing: border-box;
          border: 1px solid rgb(213,215,216);
            button{
            padding: 6px;
            margin: 2px;
            float: left;
          }
        }
        .baseinfo{
          fieldset{
            padding: 15px 5px;
            border: 1px solid rgb(213,215,216);
            .title{
              font-size: 16px;
              display: inline-block;
              margin: 0 15px;
              width: auto;
              font-weight: bold;
            }
            .item{
              font-size: 13px;
              width: 49%;
              float: left;
              line-height: 25px;
              letter-spacing: 1px;
              span{
                font-size: inherit;
                display: inline-block;
                width: 19%;
                text-align: center;
              }

              input[type='text']{
                width: 80%;
                height: 25px;
                line-height: 25px;
                overflow-x: hidden;
                box-sizing: border-box;
                border: 1px solid #c8cccf;
                margin-top: 3px;
                float: right;
                box-shadow:1px 1px 1px #aaaaaa;
              }
              .colon{
                width: 0;
                float: right;
                margin-right: 1rem;
              }
            }
          }
        }
      }
    }
  }
</style>
