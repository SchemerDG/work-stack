<template>
  <div>
    <navi :menuitem=menuitem></navi>
    <div class="sysarc">
      <pagetitle :pageTitle='pageTitle'/>
      <div class="container-fluid">
        <div class="row">
          <div class="md-3">
            <div class="btns">
              <button type="button" class="mod-btn mod-btn-ref"@click='refresh'>
                <i class="mod-btn-icon fa fa-refresh"></i>刷新
              </button>

              <button type="button" class="mod-btn mod-btn-del"@click='dele'>
                <i class="mod-btn-icon fa fa-trash"></i>删除
              </button>
              <button type="button" class="mod-btn mod-btn-add"@click='add'>
                <i class="mod-btn-icon fa fa-plus"></i>添加
              </button>
              <button type="button" class="mod-btn mod-btn-search">
                <i class="mod-btn-icon fa fa-map-marker"></i>寻址
              </button>
            </div>
            </buttons>
            <div class="user-info">
              <ul id='systemtree' class="ztree_sys"></ul>
            </div>
          </div>
          <div class="md-9">
            <sysarc_right v-if='sysarc_right_on' :unit_data='unit_data' :unit_data1='unit_data1' :log_data='log_data' :status='status' :belongs='belongs' v-on:refresh="refresh"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import createDataTree from '../../utils/createDataTree.vue'
import navi from '../../navi/index.vue'
import pagetitle from '../../utils/PageTitle'
import buttons from '../../utils/Buttons'
import sysarc_right from './components/SysArc_Right'
import 'ztree'
import '../../../plugins/ztreejs/jquery.ztree.exedit.js'
import '../../../plugins/treecss/system_tree_style/Style.css'
//import '../../../plugins/treecss/metroStyle/metroStyle.css'
export default {
  name: 'sysarc',
  components: {
    createDataTree,
    navi,
    sysarc_right,
    pagetitle,
    buttons
  },
  data () {
    return {
      sysarc_right_on:false,
      pageTitle: '系统架构管理',
      now_nodeId:'',
      now_nodeName:'',
      before_changeId:'',
      before_changeName:'',
      status:-1,
      belongs:[{id:'',name:''}],
      log_data:[{
        date: '',
        operation: '',
        result: '',
        operator: '',
      }],
      unit_data:{
        id: '',
        signuper: '',
        objename: '',
        sysignup: '',
        localunit: '',
        localunit_id:'',
        expirydate: '',
        signupdate: '',
        description:'',
      },
      unit_data1:{
        controller: {
        model: '',
        version: '',
        series: '',
        startDate: '',
        workingDuring: '',
        status: '',
        systemSoft: '',
        excuteSoft: ''
      },
      performer: {
        model: '',
        version: '',
        series: '',
        startDate: '',
        workingDuring: '',
        status: '',
        systemSoft: '',
        excuteSoft: ''
      }
    },
      tree: [
        {
        name:'DEVISER组态工作栈管理系统',open:true,isParent:true,children:[],
        }
      ],
      setting:{
        view: {
          showLine: true,
          showIcon:this.showIconForTree,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.zTreeOnClick,
          onRename: this.zTreeOnRename,

        }
      },
    }
  },
  computed: {
    nodeData:function(){
      return this.tree;
    },
    menuitem: function () {
        return this.$store.state.tree[2]
      }
  },
    mounted(){
      console.log('MOUNNTED',this.nodeData);
      var treeObj =$.fn.zTree.init($("#systemtree"), this.setting, this.nodeData);
      treeObj.expandAll(true);
      var that=this;
      $.ajax({
        url: "get_subsystems.php",
        type:'POST',
        dataType:'Json',
        data: {
          "subsystem":"subsystem",
        },
        success: function(data){
          that.tree=data;
          console.log('tree',data);
          var treeObj =$.fn.zTree.init($("#systemtree"), that.setting, that.nodeData);
          treeObj.expandAll(true);
      }
    })
  },
  watch:{
    nodeData: function(curVal,oldVal){
        var that = this;
        var treeObj =$.fn.zTree.init($("#systemtree"), this.setting, this.nodeData);
        treeObj.expandAll(true);
    },
 },
  methods: {
    addressing: function() {
      console.log("敬请期待......");
    },
    add: function() {
      var treeObj = $.fn.zTree.getZTreeObj("systemtree");
      var newNode = {name:"new",id:'-1'};
      console.log(treeObj.getNodeByParam("name",'DEVISER组态工作栈管理系统', null));
      newNode = treeObj.addNodes( treeObj.getNodeByParam("name",'DEVISER组态工作栈管理系统', null), newNode);
      this.before_changeId=treeObj.getNodeByParam('id','-1',null).treeId;
      this.before_changeName=treeObj.getNodeByParam('id','-1',null).name;
      console.log(this.before_changeId);
      treeObj.editName(treeObj.getNodeByParam('id','-1',null));
    },
    dele: function() {
      var that=this;
      var treeObj = $.fn.zTree.getZTreeObj("systemtree");
      var nodes = treeObj.getSelectedNodes();
      for(var i=0;i<nodes.length;i++)
      {
        if(nodes[i].type=='subsystem'&&nodes[i].children.length==0)
        {
          $.ajax({
            url: "del_subsystems.php",
            type:'POST',
            dataType:'Json',
            data: {
              "subsystem_id":nodes[i].id,
            },
            success: function(data){
              that.tree=data;
              console.log('tree',data);
          }
        })
        }
      }

    },
    refresh: function() {
      var that=this;
        $.ajax({
          url: "get_subsystems.php",
          type:'POST',
          dataType:'Json',
          data: {
            "subsystem":"subsystem",
          },
          success: function(data){
            that.tree=data;
            console.log(data);
        }
      })
    },
    get_subsystems:function(id,treeNode){
      var that=this;
        $.ajax({
          url: "get_subsystem_information.php",
          type:'POST',
          dataType:'Json',
          data: {
            "subsystem_id":id,
          },
          success: function(data){
            that.unit_data=data;
            console.log('子系统信息',data);
            that.belongs=[{id:'',name:''}];
            that.status=1;
        }
      })
    },
    get_units:function(id,treeNode){
      var that=this;
        $.ajax({
          url: "get_unit_information.php",
          type:'POST',
          dataType:'Json',
          data: {
            "unit_id":id,
          },
          success: function(data){
            that.unit_data=data;
            console.log('单元信息',data);
            var treeObj = $.fn.zTree.getZTreeObj("systemtree");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            console.log(nodes);
            that.belongs=[];
            var temp={id:'-1',name:'DEVISER组态工作栈管理系统'};
            that.belongs.push(temp);
            for(var i=0;i<nodes.length;i++)
            {
              if(nodes[i].type=='subsystem')
              {
                var temp={id:nodes[i].id,name:nodes[i].name,type:nodes[i].type};
                that.belongs.push(temp);
              }
            }
            that.status=2;
        }
      })
    },
    get_devices:function(id,treeNode){
      var that=this;
        $.ajax({
          url: "get_device_information.php",
          type:'POST',
          dataType:'Json',
          data: {
            "device_id":id,
          },
          success: function(data){
            that.unit_data=data.information;
            that.unit_data1.controller=data.controller;
            that.unit_data1.performer=data.performer;
            that.log_data=data.log;
            console.log('设备信息',data);
            var treeObj = $.fn.zTree.getZTreeObj("systemtree");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            console.log(nodes);
            that.belongs=[];
            var pnode=treeNode.getParentNode();
            var temp={id:pnode.id,name:pnode.name};
            that.belongs.push(temp);
            console.log('belongs',that.belongs);
            that.status=3;
        }
      })
    },
    zTreeOnClick:function(event, treeId, treeNode){
        this.sysarc_right_on=false;
        this.now_nodeId=treeNode.id;
        this.now_nodeName=treeNode.name;
        if(treeNode.type=='subsystem'){
          this.get_subsystems(treeNode.id,treeNode);
        }
        else if(treeNode.type=='unit') {
          this.get_units(treeNode.id,treeNode);
        }
        else if(treeNode.type=='device'){
          this.get_devices(treeNode.id,treeNode);
        }
        this.sysarc_right_on=true;
      },
    showIconForTree:function(treeId, treeNode) {
      	return treeNode.type != 'subsystem'||true;
      },
    zTreeOnRename:function(event, treeId, treeNode, isCancel) {
      console.log('isCancel',isCancel);
      if(isCancel!=true)
      {
        if(treeNode.name=='new')
        {
          var treeObj = $.fn.zTree.getZTreeObj("systemtree");
          alert("子系统名称不能为'new',请重新命名或按ESC键退出");
          setTimeout(function(){
            treeObj.editName(treeObj.getNodeByParam('id','-1',null));
          },100);
        }
        else
        {
          if(treeNode.id=='-1')
          {
            treeNode.id='';
            var that=this;
            console.log(treeNode.name);
            $.ajax({
              url: "new_subsystem.php",
              type:'POST',
              dataType:'Json',
              data: {
                "subsystem_name":treeNode.name,
              },
              success: function(data){
                that.tree=data;
                console.log(data);
            }
          })
          }
        }
      }
      else{
        var treeObj = $.fn.zTree.getZTreeObj("systemtree");
        treeObj.removeNode(treeNode);
      }

    },

  }
}
</script>

<style scoped lang="less">

  .sysarc{
    height: 100%;
    margin: 5px 0 0 5px;
    border: 1px solid rgb(213,215,216);
  }

  .md-3{
    width: 25%;
    border-right: 1px solid rgb(213,215,216);
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
  .md-9 {
    width: 75%;
  }
  .user-info{
    height: 100%;
    overflow-y: scroll;
  }
</style>
