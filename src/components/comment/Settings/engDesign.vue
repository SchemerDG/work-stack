<template>
<div class="">
  <navi :menuitem='menuitem'></navi>
  <div class="container-fluid">
    <div class="row">
      <div class="md-2">
        <div class="content">
          <div class="content-top">
            <button type="button" class="mod-btn" @click='openAlter1Madal'>
              <!-- <i class="mod-btn-icon fa fa-refresh"></i>刷新 -->
              管理
            </button>
             <span>工程类别列表</span>
          </div>
          <!-- <pageTitle pageTitle='所有分类'/> -->
          <div class="tree">
            <ul id='classsettings_tree' class="ztree_proa"></ul>
          </div>
        </div>
      </div>
      <div class="md-10">
        <div class="rightcontent">
          <div class="topbtns">
            <button type="button" class="mod-btn mod-btn-ref" @click='refresh'>
              <i class="mod-btn-icon fa fa-refresh" ></i>刷新
            </button>
            <button type="button" class="mod-btn mod-btn-add" @click.prevent='openMadal(-1)'>
              <i class="mod-btn-icon fa fa-plus" ></i>新建
            </button>
            <button type="button" class="mod-btn mod-btn-imp">
              <i class="mod-btn-icon fa fa-reply"></i>导入
            </button>
            <!-- <button type="button" class="mod-btn mod-btn-rank" @click="showButtonList" @blur="hiddenList">
              <i class="mod-btn-icon fa fa-sort"></i>排序
            </button>-->
            <select id="eng_rank" class="mod-btn mod-btn-rank" v-on:change="rank_change($event)">
              <option  v-for="rank in rank_way" :value="rank.text">
                {{rank.text}}</option>
            </select>
            <!-- <button type="button" class="mod-btn mod-btn-add">
              工程检查
            </button> -->
            <div class="toprightbtns">
              <!-- <span>工程名称：</span> -->
              <select id="research_x">
                <option  v-for="research in research_values" :value="research.value" >
                  {{research.value}}</option>
              </select>
              <input id="research_content" type="text" name="" value="" class="input-1">
              <button type="button" name="button" class="middle-btn-search" @click='search'>查询</button>
              <button type="button" name="button" class="middle-btn-clear" @click='clear'>清空</button>
            </div>
          </div>
          <div class="tablecontent">
            <table class="table table-hover">
              <thead>
                <tr>
                  <td></td>
                  <th>操作</th>
                  <th>工程名称/所属分类</th>
                  <th>版本</th>
                  <th>建立时间</th>
                  <th>修改时间</th>
                  <th>设计人</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for='(projects, index) in projects' class="trstyle" v-if="(15*(page-1))<=index&&index<(15*page)">
                <td class="td-index">{{index+1}}</td>
                <td>
                  <button type="button" name="button" class='button_design' @click.prevent='openProdMadal(projects.id)'>设计</button>
                  <button type="button" name="button" class='button_Sent' @click='sendToapproval(index)'>送审</button>
                  <button type="button" name="button" class='button_file' @click.prevent='openMadal(index)'>文件</button>
                  <button type="button" name="button" class='button_check'>查验</button>
                  <button type="button" name="button" class='button_copy'>复制</button>
                  <button type="button" name="button" class='button_export'>导出</button>
                  <button type="button" name="button" class='button_revocation'>撤回</button>
                  <button type="button" name="button" class='button_del' :disabled='del_disable(projects.status_id)' @click="del_eng(projects.id)">删除</button>
                </td>
                <td><span class="nlineSpan">{{projects.proname}}</span>
                    <span class="nlineSpan2">{{projects.category}}</span></td>
                <td><span>{{projects.version}}</span></td>
                <td><span>{{projects.statime}}</span></td>
                <td><span>{{projects.alttime}}</span></td>
                <td><span>{{projects.designer}}</span></td>
                <td><span :class="'status-'+projects.status_id">
                          {{projects.status}}</span></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="bottom">
            <button @click='firstpage'>
              <!-- <span class="glyphicon glyphicon-step-backward" style="color: rgb(129, 123, 71);"></span> -->
              <i class="fa fa-step-backward" aria-hidden="true"></i>

            </button>
            <button @click='prepage'>
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </button>
              第<input type="text"  v-bind:value="page" width="3px"  disabled=true>页
              共<span id="pagespan">{{Math.ceil(classsettings.length/15)}}</span>页
            <button @click='nextpage'>
              <!-- <span class="glyphicon glyphicon-chevron-right" style="color: rgb(129, 123, 71);"></span> -->
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </button>
            <button  @click='lastpage'>
              <i class="fa fa-step-forward" aria-hidden="true"></i>
            </button>
            <button @click='refresh'>
              <!-- <span class="glyphicon glyphicon-refresh" style="color: rgb(129, 139, 211);"></span> -->
              <i class="mod-btn-icon fa fa-refresh" style="color: rgb(129, 139, 211);"></i>
            </button>
          </div>
        </div>
      </div>
      <alter v-if="isAlter" @isAlter='closeAlterMadal' :alertdata='alertdata' :msg='msg'></alter>
      <alter2 v-if="isAlter2" @isAlter2='closeMadal' :project='project' @submitbtn='getinfo' :classsettings='classsettings' :neworalt='neworalt'></alter2>
      <prodesign v-if="isProd" @isProd='closeProdMadal':index='index' :eng_id='eng_id'></prodesign>
    </div>
  </div>

</div>
</template>
<script>

import alter2 from './alter2.vue'
import pageTitle from '../../utils/PageTitle.vue'
import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
import navi from '../../navi/index.vue'
import prodesign from './proDesign.vue'
import alter from './alter.vue'
import  'ztree'
import '../../../plugins/treecss/proa_tree_style/Style.css'
import icons_管理 from "../../../icons/工程设计/管理.png"
import icons_成员 from "../../../icons/工程设计/成员.png"
import icons_查阅 from "../../../icons/工程设计/查阅.png"
import icons_系统 from "../../../icons/工程设计/系统.png"
import icons_总系统 from "../../../icons/工程设计/总系统.png"
var that={};
export default {
  name: 'engDesign',
  data(){
    return{
        research_values:[{value:'工程名称'},{value:'所属分类'},{value:'主设计人'},{value:'共同设计'}],
        classsettings:[],
        checkedIds: [],
        projects_save:'',
        OK_status:false,
        neworalt:'',
        options: {
        label:'classname',
        idsWithParent: false
        },
        eng_id:'',
        page: 1 ,
        isAlter2:false,
        isProd:false,
        index:0,
        isAlter:false,
        alertdata:'',
        msg:'管理工程分类',
        projects:'',
        classification_id:'',
        category:'',
        alertdata:'',
        _showbuttonlist:false,
        rank_way:[{text:'排序'},{text:'工程名称'},{text:'建立时间'},{text:'设计人'},{text:'状态'},{text:'修改时间'}],
        setting:{
        view: {
          showLine: true
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
      project:'',
      }
    },
  components: {
   navi,
   VueTree,
   pageTitle,
   alter,
   alter2,
   prodesign
  },

  computed:{
    nodeData:function(){
     return this.classsettings;
   },
    menuitem: function () {
      return this.$store.state.tree[3].children[2];
    },
   },
   watch:{
     nodeData: function(curVal,oldVal){
       $.fn.zTree.init($("#classsettings_tree"), this.setting, this.nodeData);
       var treeObj =$.fn.zTree.init($("#classsettings_tree"), this.setting, this.nodeData);
       treeObj.expandAll(true);
     },
  },
 mounted:function(){
    that = this;
    $.ajax({
      url: "get_classification_settings.php",
      type:'POST',
      dataType:'Json',
      data: {
        "userid": '1',
      },
      success: function(data){
        that.classsettings=[];
        var structx={'name':'所有分类','classification_id':-1,'icon':icons_总系统,'children':[]};

        var children=[];
        for(var i=0;i<data.length;i++)
        {
            switch (data[i]['icon']) {
              case "管理":
                data[i]['icon']=icons_管理;
                break;
              case "成员":
                data[i]['icon']=icons_成员;
                break;
              case "查阅":
                data[i]['icon']=icons_查阅;
                break;
              case "总系统":
                data[i]['icon']=icons_总系统;
                break;
              case "系统":
                data[i]['icon']=icons_系统;
                break;
              default:
            }
          var struct={'name':data[i].classname,'classification_id':data[i].id,'icon':data[i].icon};
          structx.children.push(struct);
        }
        that.classsettings.push(structx);
        console.log('classsettings:',that.classsettings);
      }
    })
    $.fn.zTree.init($("#classsettings_tree"), this.setting, this.nodeData);
    var treeObj =$.fn.zTree.init($("#classsettings_tree"), this.setting, this.nodeData);
    treeObj.expandAll(true);
  },
  methods: {

    getinfo:function(){
      console.log('return');
      this.isAlter2=false;
      $.ajax({
              url:"get_engineerings.php",
              type:"POST",
              dataType:"Json",
              data:{
                "classification_id":that.classification_id,
              },
              success:function(data){
                that.projects =data;
                console.log(that.projects);
              }
        })
    },
    del_eng:function (id) {
      $.ajax({
              url:"del_engineerings.php",
              type:"POST",
              dataType:"Json",
              data:{
                "eng_id":id,
                "classification_id":that.classification_id,
              },
              success:function(data){
                that.projects =data;
                console.log(that.projects);
              }
            })
    },
    del_disable:function(value)
    {
      return value!='1';
    },
    rank_change:function(event){
      console.log(event.target.value);
      switch (event.target.value) {
        case '工程名称':
          this.projects.sort(function(a,b){return a['proname'].localeCompare(b['proname'])});
          console.log('projects',this.projects);
          document.getElementById("eng_rank").value='排序';
          break;
        case '建立时间':
          this.projects.sort(function(a,b){return a['statime'].localeCompare(b['statime'])});
          console.log('projects',this.projects);
          document.getElementById("eng_rank").value='排序';
          break;
        case '修改时间':
          this.projects.sort(function(a,b){return a['alttime'].localeCompare(b['alttime'])});
          console.log('projects',this.projects);
          document.getElementById("eng_rank").value='排序';
          break;
        case '设计人':
          this.projects.sort(function(a,b){return a['main_designer_name'].localeCompare(b['main_designer_name'])});
          console.log('projects',this.projects);
          document.getElementById("eng_rank").value='排序';
          break;
        case '状态':
          this.projects.sort(function(a,b){return a['status'].localeCompare(b['status'])});
          console.log('projects',this.projects);
          document.getElementById("eng_rank").value='排序';
          break;
        default:
          document.getElementById("eng_rank").value='排序';
      }
    },
    refresh: function() {
      $.ajax({
              url:"get_engineerings.php",
              type:"POST",
              dataType:"Json",
              data:{
                "classification_id":that.classification_id,
              },
              success:function(data){
                that.projects =data;
                console.log('refresh',data);
              }
            })
      },
      sendToapproval:function(index){
        var temp={status_id:'2',id:this.projects[index].id};
        $.ajax({
                url:"eng_change_status.php",
                type:"POST",
                dataType:"Json",
                data:{
                  "data":temp,
                },
                success:function(data){
                  console.log('sendToapproval_ok');
                    that.$options.methods.refresh();
                }
              })
      },
    nextpage: function() {
      if(this.page < Math.ceil(this.projects.length/15)){
        this.page= this.page + 1;
        return this.page;
      }else {
        this.page = Math.ceil(this.projects.length/15);
        return this.page;
      }
    },
    prepage: function() {
      if (this.page>1) {
        this.page= this.page - 1;
        return this.page;
      }else {
        this.page=1;
        return this.page;
      }
    },
    firstpage: function() {
      this.page= 1;
      return this.page;
    },
    lastpage: function() {
      this.page = Math.ceil(this.projects.length/15);
      return this.page;
    },
    clear: function() {
      document.getElementById("research_content").value="";
      if(this.projects_save!='')
      {
        this.projects=this.projects_save;
        this.projects_save='';
      }
    },
    openMadal: function(index) {
      if(this.classification_id!=''&&this.classification_id!='-1')
      {
        if(index==-1)
        {
            this.neworalt='new';
            this.project={
              alttime:'',
              category:this.category,
              classification_id:this.classification_id,
              designer:'',
              id:'',
              main_designer_name:'',
              member:[],
              proname:'',
              statime:'',
              status:'',
              status_id:'',
              version:'',
              description:'',
              version_description:''
            };
            var myDate = new Date();//获取系统当前时间
            this.project['statime']=myDate.toLocaleString('chinese',{hour12:false});
            $.ajax({
              url:"who_i_am.php",
              type:"POST",
              dataType:"Json",
              data:{
                "state":'who_i_am',
              },
              success:function(data){
                that.project['main_designer_name']=data['user_name'];
                that.project['designer']=data['user_id'];
                console.log('project',that.project);
                that.isAlter2 =true;
              }
            })
        }
        else {
          this.neworalt='alt';
          this.index = index;
          this.project = this.projects[index];
          this.isAlter2 =true;
        }
      }
    },
    openAlter1Madal: function() {

      if(that.classification_id!=-1)
      {
        $.ajax({
          url:"get_classification_setting_one.php",
          type:"POST",
          dataType:"Json",
          data:{
            "classification_id":that.classification_id,
          },
          success:function(data){
            that.alertdata =data;
            console.log(that.alertdata);
            that.isAlter =true;
          }
        })
      }
    },
    closeMadal: function() {
      this.isAlter2=false;
    },
    closeAlterMadal: function() {
      this.isAlter=false;
    },
    openProdMadal: function(id){
      this.index = id;
      this.eng_id=id;
      this.isProd =true;
    },
    closeProdMadal: function() {
      this.isProd=false;
    },
    showButtonList:function(){
      console.log("排序");
      this._showbuttonlist = this._showbuttonlist?false:true;
      console.log(this._showbuttonlist);
    },
    hiddenList:function(){
      console.log('hidden');
          this._showbuttonlist = false;
    },
    search:function() {
      this.projects_save=this.projects;
      var temp=[];
      switch (document.getElementById("research_x").value) {
        case '工程名称':
          for(var i=0;i<this.projects.length;i++)
          {
            if(this.projects[i]['proname'].indexOf(document.getElementById("research_content").value)!=-1)
            {
              temp.push(this.projects[i]);
            }
          }
          this.projects=temp;
          break;
        case '所属分类':
          for(var i=0;i<this.projects.length;i++)
          {
            if(this.projects[i]['category'].indexOf(document.getElementById("research_content").value)!=-1)
            {
              temp.push(this.projects[i]);
            }
          }
          this.projects=temp;
          break;
        case '主设计人':
          for(var i=0;i<this.projects.length;i++)
          {
            if(this.projects[i]['main_designer_name'].indexOf(document.getElementById("research_content").value)!=-1)
            {
              temp.push(this.projects[i]);
            }
          }
          this.projects=temp;
          break;
        case '共同设计':
        /*  for(var i=0;i<this.projects.length;i++)
          {
            if(this.projects[i]['proname'].indexOf(document.getElementById("research_content").value)!=-1)
            {
              temp.push(this.projects[i]);
            }
          }
          this.projects=temp;
          break;*/
        default:
      }
    },
    zTreeOnClick:function(event, treeId, treeNode) {
      console.log(treeNode.tId + ", " + treeNode.name);
      that.classification_id = treeNode.classification_id;
      that.category=treeNode.name;
      console.log(that.classification_id);
      $.ajax({
        url:"get_engineerings.php",
        type:"POST",
        dataType:"Json",
        data:{
          "classification_id":that.classification_id,
        },
        success:function(data){
          that.projects =data;
          console.log(that.projects);
        }
      })
    },
  },
}

</script>
<style scoped lang="less">
.md-2 {
  width: 17%;
  padding: 0px 0px 0px 4px;
  .content {
    overflow-y: scroll;
    border-radius: 4px;
      margin: 1px;
      border: 1px solid gray;
      height:630px;
      .content-top {
        margin: 1px;
        background-color: rgb(239, 241, 227);
        span {
          float: right;
          margin: 3px 3px 3px ;
          font-size: 12px;
          font-weight:bold;
        }
        button{
          background-color:rgb(104, 147, 77);
            padding: 3px;
        }
      }
      .tree {
        overflow-y: scroll;
      }
    }
}
.md-10 {
  width: 83%;
  padding: 0px 8px 0px 2px;
  .rightcontent {
    border-radius: 4px;
    border: 1px solid gray;
    height:100%;
    .topbtns {
      background-color: rgb(239, 241, 227);
      .toprightbtns {
        float: right;
        .input-1{
          border-radius: 2px;
          margin-top: 4px;
          border: 1px solid gray;
          height: 20px;
          width: 200px;
        }
        button {
          border-radius: 2px;
          height: 25px;
          width: 40px;
          font-size: 12px;
        }
        span {
          font-weight: bold;
          font-size: 12px;

        }
      }
    }
    .tablecontent {
      border: 1px solid gray;
      height: 550px;
      width: 100%;
      overflow-y: scroll;
      thead {
        background-color: rgb(240, 238, 238);
        td {
          border: 1px solid gray;
          border-radius: 2px;
        }
        th {
        color: black;
        font-size: 12px;
        border: 1px solid gray;
        border-radius: 4px;
        }
      }
      tbody {
        tr {
          .td-index {
            background-color: rgb(240, 238, 238);
            border: 1px solid gray;
          }
        }
        .nlineSpan {
          display: block;
          font-weight: bold;
        }
        .nlineSpan2 {
          color:gray;
        }
        .status-1{
          color: green;
        }
        .status-2{
          color: blue;
        }
        .status-3{
          color: black;
        }
        .status-4{
          color: orange;
        }
        .status-5{
          color: gray;
        }
      }
      span {
        font-size: 12px;
      }
      button {
        height: 20px;
        width: 25px;
        background-color:  rgb(207, 69, 113);
        border-radius: 4px;
        line-height: inherit;
        span {
          font-size: 10px;
          align: center;
          margin-bottom: 20px;
        }
      }
      .button_design{
        color:#fafafa;
        font-size: 10px;
        background-color: #61b860;
      }
      .button_Sent{
        color:#fafafa;
        font-size: 10px;
        background-color: #3a85c6;
      }
      .button_file{
        color:#fafafa;
        font-size: 10px;
        background-color: #e95434;
      }
      .button_check{
        color:#fafafa;
        font-size: 10px;
        background-color: #000080;
      }
      .button_copy{
        color:#fafafa;
        font-size: 10px;
        background-color: #61b860;
      }
      .button_export{
        color:#fafafa;
        font-size: 10px;
        background-color: #3a85c6;
      }
      .button_revocation{
        Color:#fafafa;
        font-size: 10px;
        background-color: #e95434;
      }
      .button_del{
        color:#fafafa;
        font-size: 10px;
        background-color: #a1a1a1;
      }
      .longinput {
        width: 120px;
        margin: 10px;
      }
      .middleinput{
        width: 80px;
        margin: 10px;
      }
      .shortinput {
        width: 40px;
        margin: 10px;
      }
    }
    .bottom {
      margin: auto;
      padding: 13px;
      font-size: 12px;
     height: 20px;
     span {
       font-size: 12px;
     }
     button {
       width: 15px;
       margin: 3px 3px;
       border-radius: 2px;
       span {
         font-size: 12px;
       }
     }
     input {
       width: 30px;
       height: 20px;
       border: 1px solid gray;
       border-radius: 2px;
       text-align: center;
       margin: 3px 3px 3px 3px;
     }
    }
  }
}

</style>
