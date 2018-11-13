<template>
  <div>
        <div class="shutter">
        </div>
      <!-- <navi :menuitem='menuitem'/> -->
      <div class="container-fluid global">
        <div class="row">
          <div class="design-left">
            <pageTitle pageTitle='使用设备管理列表'/>
            <div class="buttons">
              <button type="button" class="mod-btn mod-btn-search" @click='add_virtual_subsystem_botton'>
                <i class="mod-btn-icon fa fa-plus"></i>系统
              </button>
              <button type="button" class="mod-btn mod-btn-ref" @click='add_virtual_unit_botton'>
                <i class="mod-btn-icon fa fa-plus"></i>单元
              </button>
              <button type="button" class="mod-btn mod-btn-add" @click='add_virtual_device_botton'>
                <i class="mod-btn-icon fa fa-plus"></i>设备
              </button>
              <button type="button" class="mod-btn mod-btn-del"  @click='del_virtuals_botton'>
                <i class="mod-btn-icon fa fa-trash"></i>删除
              </button>
            </div>
            <div class="left-list">
              <ul id='proDesign_tree1' class="ztree_proDesign"></ul>
            </div>
          </div>
          <div class="design-middle">
            <pageTitle pageTitle='工程文件编辑'/>
            <div class="buttons clear">
              <div class="left">
                <button type="button" class="mod-btn mod-btn-add" @click='add_instrTopro'>
                  <i class="mod-btn-icon fa fa-plus"></i>添加
                </button>
                <button type="button" class="mod-btn mod-btn-del" @click='del_instrFrompro'>
                  <i class="mod-btn-icon fa fa-trash"></i>删除
                </button>
              </div>
              <div class="right">
                <button type="button" class="mod-btn mod-btn-approval">
                  <i class="mod-btn-icon fa fa-check-circle-o"></i>审批
                </button>
                <button type="button" class="mod-btn mod-btn-save"  @click='save_eng_data'>
                  <i class="mod-btn-icon fa fa-save"></i>保存
                </button>
                <button type="button" class="mod-btn mod-btn-compile">
                  <img src="../../../icons/编译_有效.png" height='12.73px' width='11.14px'></img>编译
                </button>
                <button type="button" class="mod-btn mod-btn-ref">
                  <i class="mod-btn-icon fa fa-download" aria-hidden="true">下载
                </button>
                <button type="button" class="mod-btn mod-btn-debug">
                  <i class="mod-btn-icon fa fa-cog" ></i>调试
                </button>
              </div>
            </div>
            <div class="pageTitle">
              工程文件:{{ proFile.name }}
            </div>
            <div class="designView">
              <ul id='designView_list'>

              </ul>
            </div>
          </div>
          <div class="design-right">
            <pageTitle pageTitle='工程设计协助'/>
            <div class="buttons">
              <button type="button" class="mod-btn mod-btn-add">工程调试</button>
              <button type="button" class="mod-btn mod-btn-ref" @click='showInstrList'>指令列表</button>
              <button type="button" class="mod-btn mod-btn-log" @click='showProList'>工程列表</button>
              <button type="button" class="mod-btn mod-btn-log" style='background-color:#004080;'  @click='sysarc_show'>系统架构</button>
            </div>
            <div v-if="this.show=='sys_arc_show'" class="pageTitle">
              {{pageTitle_data}}
            </div>
            <div v-if="show=='showInstrList'" class="buttons" style="text-align:right">
              <button type="button" class="mod-btn mod-btn-search" @click='add_virtual_subsystem_botton' style="width:54px;background-color:#3b85c7">
                <i class="mod-btn-icon fa fa-plus"></i>全部
              </button>
              <button type="button" class="mod-btn mod-btn-ref" @click='add_virtual_unit_botton' style="width:54px;background-color:#008080">
                <i class="mod-btn-icon fa fa-plus"></i>逻辑
              </button>
              <button type="button" class="mod-btn mod-btn-add" @click='add_virtual_device_botton' style="width:54px;">
                <i class="mod-btn-icon fa fa-plus"></i>用户
              </button>
              <button type="button" class="mod-btn mod-btn-del"  @click='del_virtuals_botton' style="width:54px;background-color:#004080">
                <i class="mod-btn-icon fa fa-trash"></i>工程
              </button>
              <button type="button" class="mod-btn mod-btn-del"  @click='del_virtuals_botton' style="width:54px;background-color:#e7e8e8;color:black">
                <i class="mod-btn-icon fa fa-at" style="color:black"></i>信息
              </button>
            </div>
            <!-- <div v-if="this.show=='proList'" class="pageTitle">
              {{pageTitle_data}}
            </div>
            <div v-if="this.show=='proList'" class="pageTitle">
              {{pageTitle_data}}
            </div> -->
            <!-- <div class="virtualDeviceList" v-show="show==='virtualDeviceList'">
              <ul>
                <li v-for="virtualDeviceItem in virtualDeviceList" :key="virtualDeviceItem.id" @click='showInstructionList(virtualDeviceItem.id)'>
                  {{ virtualDeviceItem.name }}:{{ virtualDeviceItem.softwareVersion }}
                </li>
              </ul>
            </div> -->
            <div class="instructionList" v-show="show == 'showInstrList'">
              <ul>
                <li class="right_instr" v-for="instruction in instructionList" @click='right_li_click($event)'>
                  <span class="instructionName"> {{ instruction.name}}</span><span class="instructionPara" v-for="para in instruction.Param"> {{ para[0] }}</span>
                </li>
              </ul>
            </div>
            <div  v-if="show ==='proList'" class="proList">
              <ul>
                <ul id='proDesign_tree3' class="ztree_proDesign2"></ul>
              </ul>
            </div>
            <div v-if="show === 'sys_arc_show'" class="proList">
              <ul id='proDesign_tree2' class="ztree_proDesign2"></ul>
            </div>

            <!-- <div class="pro" v-show="show === 'pro'">
              <ul>
                <draggable class="dragarea" v-model="proFile.files" :options=dragOptions @start="drag=true" @end="drag=false">
                  <li v-for="pro in proFile.files">
                    <span class="proName">{{ pro.name }}</span>
                    <span class="proPara" v-for="para in pro.paras" :key="para.key">{{ para }}</span>
                  </li>
                </draggable>
              </ul>
            </div> -->
          </div>
          <div class="bottombtns">
            <button class="btn btn-default" style="background-color:  rgb(108, 121, 255)" >保存</button>
            <!-- <button class="btn btn-default" style="background-color: rgb(108, 160, 255)" >保存并继续添加</button> -->
            <button class="btn btn-default" style="background-color: rgb(240, 95, 82)" @click="close">关闭</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import navi from '../../navi/index.vue'
import pageTitle from '../../utils/PageTitle.vue'
import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
import draggable from 'vuedraggable'
import Tree from './proDesignFile/device1.json'
import VirtualDeviceList from './proDesignFile/VirtualDeviceList.json'
import ProList from './proDesignFile/ProList.json'
import '../../../plugins/ztreejs/jquery.ztree.core.js'
import '../../../plugins/ztreejs/jquery.ztree.excheck.js'
import '../../../plugins/ztreejs/jquery.ztree.exedit.js'
import '../../../plugins/treecss/proDesign_tree1_style/Style.css'
import '../../../plugins/treecss/proDesign_tree2_style/Style.css'
import './proDesign.css'
var that={};
export default {
  props:['eng_id'],
  name: "prodesign",
  components: {
    navi,
    pageTitle,
    draggable
  },
  data(){
    return {
      logic_instr:[],
      user_instr:[],
      eng_instr:[],
      sig_instr:[],
      checkedIds: [],
      options: {
        label:'name',
        idsWithParent: false
      },
      designViewOptions: {
        group: {
          name: 'directive'
        },
        animation: 150
      },
      dragOptions: {
        group: {
          name: 'directive',
          pull: 'clone',
          put: false
      },
        animation: 150
      },
      eng_data:'',
      pageTitle_data:'',
      tree: [
        {
        name:'DEVISER组态工作栈管理系统',type:'sys',open:true,isParent:true,children:[],
        }
      ],
      tree1: [
        {
        name:'DEVISER组态工作栈管理系统',type:'sys',open:true,isParent:true,children:[],
        }
      ],
      tree2: [],
      item: {},
      virtualDeviceList: [],
      show: '',
      instructionList: [],
      proList: [],
      proFile: [],
      setting:{
        view: {
          showLine: true,
          showIcon:this.showIconForTree,
        },
        edit: {
  				drag: {
  					autoExpandTrigger: true,
  					prev: true,
  					inner: true,
  					next: true
  				},
  				enable: true,
  				showRemoveBtn: false,
  				showRenameBtn: false
  			},
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.zTreeOnClick,
          onRename: this.zTreeOnRename,
          beforeDrop: this.zTreeBeforeDrop,
          beforeCheck: this.zTreeBeforeCheck
        },
        check:{
          enable: true,
      		chkStyle: "checkbox",
      		chkboxType: { "Y": "ps", "N": "ps" }
        }
      },
      setting1:{
        view: {
          showLine: true,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
        }
      },
      setting2:{
        view: {
          showLine: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
        },
      },
      designArr: []
    }
  },

  computed:{
    menuitem: function () {
      return this.$store.state.tree[3].children[2]
    },
    nodeData1:function(){
      return this.tree1;
    },
    nodeData2:function(){
      return this.tree2;
    },
    nodeData:function(){
      return this.tree;
    },
  },
  mounted:function(){
    that=this;
    console.log(this.nodeData);
    console.log(this.tree);
    console.log(this.nodeData);
      $.ajax({
        url: "get_virtual_subsystems.php",
        type:'POST',
        dataType:'Json',
        data: {
          "eng_id":that.eng_id,
        },
        success: function(data){
          that.tree=data;
          console.log('tree',data);
          var treeObj =$.fn.zTree.init($("#proDesign_tree1"), that.setting, that.nodeData);
          treeObj.expandAll(true);
      }
    })
    $.ajax({
      url: "get_eng_data.php",
      type:'POST',
      dataType:'Json',
      data: {
        "eng_id":that.eng_id,
      },
      success: function(data){
        that.eng_data=data.data;
        that.refreshLi(that.eng_data);
    }
  })
  $.ajax({
    url: "get_logic_instr.php",
    type:'POST',
    dataType:'Json',
    data: {
      "eng_id":that.eng_id,
    },
    success: function(data){
      that.logic_instr=data;
  }
})
  },
  watch:{
    nodeData: function(curVal,oldVal){
        var treeObj =$.fn.zTree.init($("#proDesign_tree1"), this.setting, this.nodeData);
        treeObj.expandAll(true);
    },
    nodeData1:function(curVal,oldVal){
        var treeObj =$.fn.zTree.init($("#proDesign_tree2"), this.setting1, this.nodeData1);
        treeObj.expandAll(true);
    },
    nodeData2:function(curVal,oldVal){
        var treeObj =$.fn.zTree.init($("#proDesign_tree3"), this.setting2, this.nodeData2);
        treeObj.expandAll(true);
    },
  },
  methods: {
    save_eng_data:function(){
      var d=document.getElementsByClassName('middle_li');
      var data='';
      data=that.eng_data[0]+'\r\n'+that.eng_data[1]+'\r\n';
      var Dev_Models='<Dev_Models>:';
      for (var i=5;i<that.eng_data.length-1;i++)
      {
          var x=(that.eng_data[i].split(';')[0]).split(':');
          if(x.length>1)
          {
            if(x[1]!='')
            {
              Dev_Models=Dev_Models+x[1]+','
            }
          }
      }
      Dev_Models=Dev_Models+';\r\n'
      data=data+Dev_Models;
      data=data+that.eng_data[3]+'\r\n';
      data=data+that.eng_data[4]+'\r\n';
      for(var i=5;i<that.eng_data.length;i++)
      {
        if(that.eng_data!=''&&(that.eng_data.indexOf(/\s*/)==-1)&&i<that.eng_data.length-1)
        {
          data=data+that.eng_data[i]+'\r\n';
        }
        else if(that.eng_data!=''&&(that.eng_data.indexOf(/\s*/)==-1))
        {
          data=data+that.eng_data[i];
        }
      }
      console.log(data);

      $.ajax({
        url: "save_eng_data.php",
        type:'POST',
        dataType:'Json',
        data: {
          "data":data,
          'eng_id':that.eng_id,
        },
        success: function(data){
        //  that.eng_data=data.data;
        //  that.refreshLi(that.eng_data);
      }
    })
    },
    sysarc_show:function(){
      that.pageTitle_data='系统架构列表';
      this.show = 'sys_arc_show';
      $.ajax({
        url: "get_subsystems.php",
        type:'POST',
        dataType:'Json',
        data: {
          "subsystem":"subsystem",
        },
        success: function(data){
          that.tree1=data;
          var treeObj =$.fn.zTree.init($("#proDesign_tree2"), that.setting1, that.nodeData1);
          treeObj.expandAll(true);
      }
      })
    },
    showProList() {
      this.show = 'proList';
        $.ajax({
          url: "get_user_eng_canuse.php",
          type:'POST',
          dataType:'Json',
          data: {
            "user_id":'',
          },
          success: function(data){
            console.log(data);
            that.tree2=data;
            var treeObj =$.fn.zTree.init($("#proDesign_tree3"), that.setting2, that.nodeData2);
            treeObj.expandAll(true);
          }
        })
    },
    add_virtual_subsystem:function (treeObj) {
      var name=prompt("请输入新子系统名称","");
      console.log(name);
      if (name!=null && name!="")
      {
        var temp_flag=true;
        console.log(that.tree);
        for (var i=0;i<that.tree.children.length;i++)
        {
          if(that.tree.children[i].name==name)
          {temp_flag=false;}
        }
        if(temp_flag==true)
        {
          var newNode = {name:name,id:''};
          console.log(newNode.name);
          $.ajax({
            url: "new_virtual_subsystem.php",
            type:'POST',
            dataType:'Json',
            data: {
              "subsystem_name":newNode.name,
              'eng_id':that.eng_id
            },
            success: function(data){
              that.tree=data;
              console.log(data);
          }
        })
        }else {
          alert('该名称已存在，请重新输入');
          that.$options.methods.add_virtual_subsystem(treeObj);
        }
      }
      else if(name==='')
      {
        alert('名称不能为空，请重新输入');
        that.$options.methods.add_virtual_subsystem(treeObj);
      }
    },
    add_virtual_unit:function (treeObj,id) {
      var name=prompt("请输入新单元名称","");
      if (name!=null && name!="")
      {
        var temp_flag=true;
        for (var i=0;i<that.tree.children.length;i++)
        {
          for(var j=0;j<that.tree.children[i].children.length;j++)
          {
            if(that.tree.children[i].children[j].name==name)
            {temp_flag=false;}
          }
        }
        if(temp_flag==true)
        {
          var newNode = {name:name,id:''};
          console.log(newNode.name);
          $.ajax({
            url: "new_virtual_unit.php",
            type:'POST',
            dataType:'Json',
            data: {
              "unit_name":newNode.name,
              'subsystem_id':id,
              'eng_id':that.eng_id
            },
            success: function(data){
              that.tree=data;
              console.log(data);
          }
        })
        }else {
          alert('该名称已存在，请重新输入');
          that.$options.methods.add_virtual_unit(treeObj,id);
        }
      }
      else if(name==='')
        {
          alert('名称不能为空，请重新输入');
          that.$options.methods.add_virtual_unit(treeObj);
        }
    },
    add_virtual_subsystem_botton:function () {
      var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
      var nodes = treeObj.getSelectedNodes();
      if(nodes.length!=0)
      {
        if(nodes.length==1&&nodes[0].type=='sys')
        {
          console.log('2');
          that.$options.methods.add_virtual_subsystem(treeObj);
        }
      }
    },
    add_virtual_unit_botton:function(){
      var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
      var nodes = treeObj.getSelectedNodes();
      if(nodes.length!=0)
      {
        if(nodes.length==1&&nodes[0].type=='subsystem')
        {
          that.$options.methods.add_virtual_unit(treeObj,nodes[0].id);
        }
        else if (nodes.length==1&&nodes[0].type=='sys') {
          that.$options.methods.add_virtual_unit(treeObj,'');
        }
      }
    },
    add_virtual_device_botton:function(){
      var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
      var nodes = treeObj.getSelectedNodes();
      if(nodes.length!=0)
      {
        if(nodes.length==1&&nodes[0].type=='unit'&&nodes[0].children.length==0&&this.show=='sys_arc_show')
        {
          var treeObj1 = $.fn.zTree.getZTreeObj("proDesign_tree2");
          var nodes1 = treeObj1.getSelectedNodes();
          console.log(nodes1);
          if(nodes1.length==1)
          {
            var node=nodes1[0];
            console.log(node);
            console.log(node.type);
            if(node.type=='device')
            {
              if(node.chno=='F')
              {
                $.ajax({
                  url: "new_virtual_device.php",
                  type:'POST',
                  dataType:'Json',
                  data: {
                    'chno':'F',
                    'unit_id':nodes[0].id,
                    'eng_id':that.eng_id,
                    'device_id':node.id
                  },
                  success: function(data){
                    that.tree=data;
                    console.log(data);
                }
              })
              }
            }
          }
        }
        if(nodes.length==1&&nodes[0].type=='device'&&nodes[0].id=='blank'&&nodes[0].getParentNode().children.length!=0&&this.show=='sys_arc_show')
        {
          var now_chno=nodes[0].getIndex()-1;
          console.log(now_chno);
          var treeObj1 = $.fn.zTree.getZTreeObj("proDesign_tree2");
          var nodes1 = treeObj1.getSelectedNodes();
          console.log(nodes1);
          if(nodes1.length==1)
          {
            var node=nodes1[0];
            console.log(node);
            console.log(node.type);
            if(node.type=='device')
            {
              if(node.chno!='F')
              {
                $.ajax({
                  url: "new_virtual_device.php",
                  type:'POST',
                  dataType:'Json',
                  data: {
                    'chno':now_chno,
                    'unit_id':nodes[0].getParentNode().id,
                    'eng_id':that.eng_id,
                    'device_id':node.id
                  },
                  success: function(data){
                    that.tree=data;
                    console.log(data);
                }
              })
              }
            }
          }
        }
      }
    },
    del_virtuals_botton:function(){
      var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
      var nodes = treeObj.getSelectedNodes();
      if(nodes.length!=0)
      {
        if(nodes.length==1&&nodes[0].type=='subsystem')
        {
          if(nodes[0].children.length==0)
          {
            $.ajax({
              url: "del_virtual_subsystem.php",
              type:'POST',
              dataType:'Json',
              data: {
                'virtual_subsystem_id':nodes[0].id,
                'eng_id':that.eng_id
              },
              success: function(data){
                that.tree=data;
                console.log(data);
            }
          })
          }
        }
        else if (nodes.length==1&&nodes[0].type=='unit') {
          if(nodes[0].children.length==0)
          {
            $.ajax({
              url: "del_virtual_unit.php",
              type:'POST',
              dataType:'Json',
              data: {
                'virtual_unit_id':nodes[0].id,
                'eng_id':that.eng_id
              },
              success: function(data){
                that.tree=data;
                console.log(data);
            }
          })
          }
        }
        else if (nodes.length==1&&nodes[0].type=='device'){
          var node = nodes[0].getParentNode();
          if(nodes[0].chno=='F'&&node.children.length==1)
          {
            $.ajax({
              url: "del_virtual_device.php",
              type:'POST',
              dataType:'Json',
              data: {
                  'virtual_device_id':nodes[0].id,
                'eng_id':that.eng_id
              },
              success: function(data){
                that.tree=data;
                console.log(data);
            }
          })
          }
          else if(nodes[0].chno!='F'&&nodes[0].id!='blank')
          {
            $.ajax({
              url: "del_virtual_device.php",
              type:'POST',
              dataType:'Json',
              data: {
                  'virtual_device_id':nodes[0].id,
                  'eng_id':that.eng_id
              },
              success: function(data){
                that.tree=data;
                console.log(data);
            }
          })
          }
        }
      }
    },
    zTreeBeforeCheck:function (treeId, treeNode)
    {
      return false;
    } ,
    zTreeBeforeDrop:function(treeId, treeNodes, targetNode, moveType) {
      console.log('treeNodes',treeNodes);
      console.log('targetNode',targetNode);
      console.log('moveType',moveType);
      if(treeNodes.length==1)
      {
        var node=treeNodes[0];
        switch (moveType) {
          case 'prev':
            if(node.type==targetNode.type)
            {

            }
            break;
          case 'next':
            if(node.type==targetNode.type)
            {

            }
            break;
          case 'inner':
          if(node.type==targetNode.type&&node.type=='device'&&targetNode.id=='blank'&&node.chno!='F')
          {
            console.log(node);
              $.ajax({
                url: "update_virtual_device.php",
                type:'POST',
                dataType:'Json',
                data: {
                    'virtual_device_id':node.id,
                    'chno':targetNode.getIndex()-1,
                    'virtual_unit_id':targetNode.getParentNode().id,
                    'eng_id':that.eng_id
                },
                success: function(data){
                  that.tree=data;
                  console.log(data);
              }
            })
          }
          if((node.type=='unit'&&targetNode.type=='subsystem')||(node.type=='unit'&&targetNode.type=='sys'))
            {
              console.log(targetNode.type);
              var id;
              if(targetNode.type== "sys")
              {
                id=null;
              }
              else {
                id=targetNode.id;
              }
              $.ajax({
                url: "update_virtual_unit.php",
                type:'POST',
                dataType:'Json',
                data: {
                    'virtual_unit_id':node.id,
                    'subsystem_id':id,
                    'eng_id':that.eng_id
                },
                success: function(data){
                  that.tree=data;
                  console.log(data);
              }
            })
            }
            break;
          default:

        }
      }
      return false;
    },
    showIconForTree:function(treeId, treeNode) {
      	return treeNode.type != 'subsystem'&&treeNode.type != 'unit'&&treeNode.type != 'device';
    },
    zTreeOnClick:function(event, treeId, treeNode){
      console.log(treeNode);
      if(this.show=='showInstrList')
      {
        that.$options.methods.showInstrList();
      }
    },
    del_instrFrompro:function(){
      var f=document.getElementsByClassName('middle_li');
      for(var j=f.length;j--;){
        if(f[j].value==1&&f[j].childNodes[0].innerText!='<End_Instr>'&&f[j].childNodes[0].innerText!='<Instr>'){
          that.eng_data.splice(f[j].index,1);
          that.$options.methods.refreshLi(that.eng_data);
        }
      }
    },
    add_instrTopro:function(){
      var flag=true;
      for(var i=0;i<that.eng_data.length;i++)
      {
        if(that.eng_data[i].indexOf('=(')!=-1||that.eng_data[i].indexOf('= (')!=-1)
        {
          console.log('false');
          flag=false;
        }
      }
      if(flag==true)
      {
        switch (that.show) {
          case 'showInstrList':
              var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
              var nodes = treeObj.getSelectedNodes();
              var index;
              if(nodes.length==1)
              {
                if(nodes[0].type=='device')
                {
                  var device=nodes[0].getParentNode().name+'.'+nodes[0].chno;
                  var device_name=nodes[0].name;
                  var d=document.getElementsByClassName('right_instr');
                  for(var p=d.length;p--;)
                  {
                    if(d[p].value==1)
                    {
                      console.log(d[p].firstChild.innerText);
                      console.log(that.instructionList);
                      for(var i=0;i<that.instructionList.length;i++)
                      {
                        if(that.instructionList[i].name===d[p].firstChild.innerText)
                        {
                            var str=device+':'+device_name+';'+that.instructionList[i].name+':';
                            for(var j=0;j<that.instructionList[i].Param.length;j++)
                            {
                              str=str+that.instructionList[i].Param[j][0]+'='+' (';
                              if(j!=that.instructionList[i].Param.length-1)
                              {
                                for(var k=1;k<that.instructionList[i].Param[j].length;k++)
                                {
                                  if(k!=that.instructionList[i].Param[j].length-1)
                                  {
                                    str=str+that.instructionList[i].Param[j][k]+'.';
                                  }
                                  else {
                                    str=str+that.instructionList[i].Param[j][k];
                                  }
                                }
                                str=str+')'+',';
                              }
                              else {
                                for(var k=1;k<that.instructionList[i].Param[j].length;k++)
                                {
                                  if(k!=that.instructionList[i].Param[j].length-1)
                                  {
                                    str=str+that.instructionList[i].Param[j][k]+'.';
                                  }
                                  else {
                                    str=str+that.instructionList[i].Param[j][k];
                                  }
                                }
                                str=str+')';
                              }
                            }
                            var f=document.getElementsByClassName('middle_li');
                            for(var j=f.length;j--;){
                              if(f[j].value==1&&f[j].childNodes[0].innerText!='<End_Instr>'){
                                that.eng_data.splice(f[j].index+1,0,str);
                                index=f[j].index+1;
                                console.log(that.eng_data);
                                that.$options.methods.refreshLi(that.eng_data);
                              }
                            }
                            var dd=document.getElementsByClassName("middle_li");
                            console.log(dd);
                            for(var j=0;j<dd.length;j++)
                            {
                              if(dd[j].index==index)
                              {
                                f[j].style.backgroundColor='#ff8080';
                                f[j].value=1;
                              }
                            }
                        }
                      }
                    }
                  }
                }
              }
            break;
          case 'proList':
              var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree3");
              var nodes = treeObj.getSelectedNodes();
              var index;
                if(nodes.length==1)
                {
                  var treeObj1 = $.fn.zTree.getZTreeObj("proDesign_tree1");
                  var nodes1 = treeObj1.getSelectedNodes();
                  if(nodes1.length==1)
                  {
                    if(nodes1[0].type=='unit')
                    {
                    var d=document.getElementsByClassName('middle_li');
                    for(var i=d.length;i--;){
                      if(d[i].value==1&&f[j].childNodes[0].innerText!='<End_Instr>'){
                      var unit=nodes1[0].name;
                      var str=unit+':WAIT:'+nodes[0].name;
                      console.log(str);
                      index=d[i].index+1;
                      that.eng_data.splice(d[i].index+1,0,str);
                      that.$options.methods.refreshLi(that.eng_data);
                    }
                  }
                  var dd=document.getElementsByClassName("middle_li");
                  console.log(dd);
                  for(var j=0;j<dd.length;j++)
                  {
                    if(dd[j].index==index)
                    {
                        dd[j].style.backgroundColor='#ff8080';
                        dd[j].value=1;
                    }
                  }
                }
              }
            }
            break;
          default:
        }
      }
      else {
        alert('有指令参数未设置，请设置后插入新指令');
      }


    },
    refreshLi:function (data){
        console.log('addli');
        var logic_instr_flag=false;
        var normal_instr_flag=false;
        var li_1;
        var f=document.getElementById("designView_list");
        var childs = f.childNodes;
        for(var i = childs.length - 1; i >= 0; i--) {
          f.removeChild(childs[i]);
        }
        console.log('data',data);
        console.log('data.length',data.length);
        for(var i=0;i<data.length;i++)
        {
          if(data[i].indexOf('WAIT')!=-1)
          {
            console.log('wait',i);
            var datax=data[i].split(":");
            var data1=datax[0];
            var data2=datax[1];
            var data3=datax[2];
            li_1=document.createElement("li");
            li_1.setAttribute("class", 'middle_li');
            li_1.onclick=that.$options.methods.middle_li_click;
            li_1.value=0;
            li_1.index=i;
            that.$options.methods.addSpan(li_1,data1,'middle_ideviceName_use');
            that.$options.methods.addSpan(li_1,data2,'middle_instructionName_use');
            that.$options.methods.addSpan(li_1,data3,'middle_instructionPara_use');
            f.appendChild(li_1);
          }
          if(data[i].indexOf('WAIT')==-1
          &&data[i].indexOf('<Head>')==-1
          &&data[i].indexOf('<IEname>')==-1
          &&data[i].indexOf('<Dev_Models>')==-1
          &&data[i].indexOf('<End_Head>')==-1
          &&data[i].indexOf('<Instr>')==-1
          &&data[i].indexOf('<End_Instr>')==-1
          &&data[i]!='')
          {
            console.log('dadas');
            li_1=document.createElement("li");
            li_1.setAttribute("class", 'middle_li');
            li_1.onclick=that.$options.methods.middle_li_click;
            li_1.value=0;
            li_1.index=i;
            var datas=[];
            var datax=data[i].split(';');
            var datax1=datax[0].split(':');
            datas.push(datax1[0]);
            that.$options.methods.addSpan(li_1,datax1[0],'middle_ideviceName');
            datas.push(datax1[1]);
            that.$options.methods.addSpan(li_1,datax1[1],'middle_instructionName');
            var datax2=datax[1].split(':');
            datas.push(datax2[0]);
            that.$options.methods.addSpan(li_1,datax2[0],'middle_instructionName');
            var datax3=datax2[1].split(',');
            for(var j=0;j<datax3.length;j++)
            {
              var datax4=datax3[j].split('(');
              datas.push(datax4[0]);
              if(datax4.length>1)
              {
                datax4[1]=datax4[1].replace(")","");
                var value=datax4[0].split('=')[1];
                var param_name=datax4[0].split('=')[0];
                var params=datax4[1].split('.');
                console.log(params[0].split('|')[0]);
                if(params[0].split('|')[0]=='Enum_type')
                {
                  console.log('value',value);
                  var param=params.slice(1);
                  that.$options.methods.addSelect(li_1,value,param,param_name,'middle_instructionName');
                }
                else if (params[0].split('|')[0]=='Int') {
                  console.log('value',value);
                  that.$options.methods.addInput(li_1,value,param_name,'middle_instructionName','int');
                }
                else if (params[0].split('|')[0]=='Float') {
                  that.$options.methods.addInput(li_1,value,param_name,'middle_instructionName','float');
                }
                else if (params[0].split('|')[0]=='String') {
                  that.$options.methods.addInput(li_1,value,param_name,'middle_instructionName','string');
                }
              }
            }
            f.appendChild(li_1);
          }
          if(data[i].indexOf('<Instr>')!=-1||data[i].indexOf('<End_Instr>')!=-1)
          {
            li_1=document.createElement("li");
            li_1.setAttribute("class", 'middle_li');
            li_1.onclick=that.$options.methods.middle_li_click;
            li_1.value=0;
            li_1.index=i;
            that.$options.methods.addSpan(li_1,data[i],'middle_instr');
            f.appendChild(li_1);
          }
        }
      },
    CheckInputFloat:function (event) {
        var oInput=event.target;
        if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,'')) {
             oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
        }
     },
    CheckInputInt:function (event) {
        var oInput=event.target;
        oInput.value = oInput.value.replace(/\D/g,'');
      },
    addInput: function(li,text,param_name,css,type){
        var span_1=document.createElement("span");
          span_1.setAttribute("paraname", param_name);
          span_1.setAttribute("class", css);
        var input_1=document.createElement("input");
            input_1.innerText=text;
            input_1.value=text;
            input_1.setAttribute("class", css);
            input_1.style.marginLeft='0';
            input_1.style.width='64px';
            switch (type) {
              case 'int':
                input_1.onkeyup=function(input_1){that.$options.methods.CheckInputInt(input_1);};
                input_1.onafterpaste=function(input_1){that.$options.methods.CheckInputInt(input_1);};
                break;
              case 'float':
              input_1.onkeyup=function(input_1){that.$options.methods.CheckInputFloat(input_1);};
              input_1.onafterpaste=function(input_1){that.$options.methods.CheckInputFloat(input_1);};
                break;
              case 'string':
                break;
              default:
            }
            input_1.oninput=function(input_1){
              that.$options.methods.CheckInputInt(input_1);
              var strx=new RegExp(param_name+'=.*?'+"\\(");

              var str1=that.eng_data[input_1.target.parentNode.parentNode.index].match(strx);

              var str2=param_name+'='+input_1.target.value+'(';

              that.eng_data[input_1.target.parentNode.parentNode.index]=that.eng_data[input_1.target.parentNode.parentNode.index].replace(str1[0],str2);
              console.log(that.eng_data);
            };
            span_1.appendChild(input_1);
            li.appendChild(span_1);
        },
    addSelect: function(li,text,options,param_name,css){
        var span_1=document.createElement("span");
            span_1.setAttribute("class", css);
        var select_1=document.createElement("select");
            select_1.setAttribute("class", css);
            select_1.style.marginLeft='0';
            options.splice(0,0,'');
            for(var i=0;i<options.length;i++)
            {
              var opt = document.createElement("option");
              opt.innerHTML = options[i];
              opt.selected=(options[i]==text);
              select_1.appendChild(opt);
            }
            select_1.onchange=function(select_1){
            var strx=new RegExp(param_name+'=.*?'+"\\(");

            var str1=that.eng_data[select_1.target.parentNode.parentNode.index].match(strx);

            var str2=param_name+'='+select_1.target.value+'(';

            that.eng_data[select_1.target.parentNode.parentNode.index]=that.eng_data[select_1.target.parentNode.parentNode.index].replace(str1[0],str2);
            console.log(that.eng_data);
          }

            span_1.appendChild(select_1);
            li.appendChild(span_1);
        },
        //为姓名或邮箱等添加span标签，好设置样式
    addSpan: function(li,text,css){
          var span_1=document.createElement("span");
              span_1.innerText=text;
              span_1.setAttribute("class", css);
              li.appendChild(span_1);
          },
    showInstrList() {
      var treeObj = $.fn.zTree.getZTreeObj("proDesign_tree1");
      var nodes = treeObj.getSelectedNodes();
      that.show = 'showInstrList';
      if(nodes.length!=0)
      {
        if(nodes.length==1&&nodes[0].type=='device')
        {
          $.ajax({
            url: "get_instruction.php",
            type:'POST',
            dataType:'Json',
            data: {
              "real_device_id":nodes[0].real_device_id,
            },
            success: function(data){
              that.user_instr=data;
              that.instructionList=that.logic_instr;
              that.instructionList.push(...that.user_instr);

              console.log(that.instructionList);
            }
          })
        }
        else if(nodes.length==1&&nodes[0].type!='device')
        {
          console.log('123');
          that.instructionList='';
          console.log(that.instructionList);
        }
      }
    },
    close: function() {
      this.$emit('isProd');
    },
    right_li_click:function(event){
      var d=document.getElementsByClassName('right_instr');
      var el = event.target;
      var elp=event.srcElement.parentElement;
      console.log('event',el);
      console.log('event parent',el.parent);
      for(var p=d.length;p--;){
        console.log(d[p]);
        if(d[p]==el){d[p].style.backgroundColor='#ff8080';d[p].value=1;/*点击的*/}
        else if(d[p]==elp){d[p].style.backgroundColor='#ff8080';d[p].value=1;}
        else{d[p].style.backgroundColor='';d[p].value=0;/*其他*/}
      }
    },
    middle_li_click:function(event){
      var d=document.getElementsByClassName('middle_li');
      var el = event.target;
      var elp=event.srcElement.parentElement;
      var elpp=event.srcElement.parentElement.parentElement;
      console.log('event',el);
      console.log('event parent',el.parent);
      for(var p=d.length;p--;){
        console.log(d[p]);
        if(d[p]==el){d[p].style.backgroundColor='#ff8080';d[p].value=1;/*点击的*/}
        else if(d[p]==elp){d[p].style.backgroundColor='#ff8080';d[p].value=1;/*点击span*/}
        else if(d[p]==elpp){d[p].style.backgroundColor='#ff8080';d[p].value=1;/*点击span*/}
        else{d[p].style.backgroundColor='';d[p].value=0;/*其他*/}
      }
    },
  }
}
</script>
<style lang="less" scoped>
.shutter{
  background-color: rgba(0,0,0,0.5);
  min-width: 1680px;
  min-height: 860px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.global{
  border-radius: 4px;
  position: absolute;
  top: 95px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  height: 80%;
  width: 90%;
}
.row{
  margin: auto;
  height: 700px;
  width: 1500px;
  border-radius: 4px;
  background-color: white;
}
.buttons{
  background-color: rgb(241, 241, 241);
  height:32px;
  padding-top:2px;
  padding-bottom:2px;
}
.pageTitle{
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  padding-left: 8px;
  border: 1px solid rgb(216, 218, 218);
  background-color: rgb(241, 241, 241);
}
.design-left{
  border: 1px solid rgb(216, 218, 218);
  padding: 5px 0 0 5px;
  height: 90%;
  width: 20%;
  background-color: white;
  .left-list{
    overflow-y: scroll;
  }
}
.design-middle{
  border: 1px solid rgb(216, 218, 218);
  background-color: white;
  padding: 5px 0 0 5px;
  height: 90%;
  width: 50%;
  .left{
    display: inline-block;
    float: left;
  }
  .right{
    display: inline-block;
    float: right;
  }
  .designView{
    overflow-y: scroll;
    overflow-x: scroll;
    padding: 10px 0 0 0px;
    border: 1px solid rgb(216, 218, 218);
    height:525px;
    ul li{
      line-height: 22px;
    }
  }
}
.design-right{
  border: 1px solid rgb(216, 218, 218);
  background-color: white;
  padding: 5px 0 0 5px;
  height: 90%;
  width: 30%;
  .description{
    padding: 4px;
    border: 1px solid rgb(216, 218, 218);
    .item{
      letter-spacing: 1px;
      font-size: 12px;
    }
  }
  .virtualDeviceList{
    overflow-y: scroll;
    li:hover{
      color: rgb(70,130,136);
    }
    ul li{
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 1px;
      line-height: 22px;
      user-select: none;
    }
  }
  .instructionList{
    overflow-y: scroll;
    padding: 10px 0 0 0px;
    border: 1px solid rgb(216, 218, 218);
    height:524px;
    ul li{
      margin-top: 2px;
      height:21px;
      cursor:pointer;
      padding-left:5px;
      span{
        font-size: 14px;
        display: inline-block;
        //background-color: rgb(223, 223, 223);
      }
      .instructionName{
        position: relative;
        width: 94px;
        height: 21px;
        padding-left:5px;
        overflow:visible;
        background-color: rgb(223, 223, 223);
      }
      .instructionName:after {
        content: '';
        position: absolute;
        top: 0;
        left:94px;
        height: 0;
        width: 0;
        border-top:10.5px solid  transparent;
        border-bottom: 10.5px solid  transparent;
        border-left: 14px solid rgb(223, 223, 223);
      }
      .instructionPara{
        position: relative;
        height: 21px;
        width: 64px;
        padding-left:2px;
        overflow:visible;
        margin-left:14px;
        background-color: rgb(223, 223, 223);
      }
    .instructionPara:before {
        content: '';
        position: absolute;
        top: 0;
        left: -12px;
        height: 0;
        width: 0px;
        border-top:10.5px solid  rgb(223, 223, 223);
        border-bottom: 10.5px solid  rgb(223, 223, 223);
        border-left: 14px solid transparent;
      }
      .instructionPara:after {
        content: '';
        position: absolute;
        top: 0;
        left: 64px;
        height: 0;
        width: 0;
        border-top:10.5px solid  transparent;
        border-bottom: 10.5px solid  transparent;
        border-left: 14px solid rgb(223, 223, 223);
      }
    }
  }
  .proList{
    overflow-y: scroll;
    /* height: 60%;
    padding: 10px 0 0 5px;
    border: 1px solid rgb(216, 218, 218); */
    li:hover{
      color: rgb(70,130,136);
    }
    ul li{
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 1px;
      line-height: 22px;
      user-select: none;
    }
  }
  .pro{
    overflow-y: scroll;
    /* height: 60%;
    border: 1px solid rgb(216, 218, 218);
    padding: 10px 0 0 5px; */
    ul {
      .dragarea{
        min-height: 30px;
      }
      li{
        margin-top: 2px;
        span{
          font-size: 12px;
          display: inline-block;
          background-color: rgb(223, 223, 223);
          cursor: move;
        }
        .proName{
          width: 25%;
        }
        .proPara{
          margin-left: 3px;
        }
        .proPara:nth-last-child(-n+2){
          text-align: center;
          width: 10%;
        }
      }
    }
  }
  }
  .bottombtns {
    /* padding-left: 250px; */
    /* float: right; */
    margin: auto;
    button {
      font-size: 12px;
    }
  }

</style>
