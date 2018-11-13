<template>
  <div class="leftside" id="leftside">
      <div class="menu">
        <div class="text">
          系统菜单
        </div>
      </div>
      <div class="comment" id="comment" >
        <!-- <div style="float:left;width:30px;height:200px;background-color:white"></div> -->
        <ul id='leftTree' class="ztree_left"></ul>
      </div>
  </div>
</template>

<script>
import '../../plugins/ztreejs/jquery.ztree.core.js'
import '../../plugins/treecss/leftside_tree_style/Style.css';
//import 'ztree/css/demo.css'

export default {
  name: 'leftside',
  components: {
  },
  computed:{
    nodeData:function(){
     return this.tree;
   },
   tree:function(){
     return this.$store.state.tree;
   }
  },
  data () {
    return {
      route:'',
      dir: true,
      styles: '',
      setting:{
        view: {
          showLine: true,
          //fontCss : {'color':'#5081c8','font-size':'18px'},//需要改jquery.ztree.core.js文件
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.zTreeOnClick
        }
      }
    }
  },
  created: function(){
    var dv = $("#comment");
    var x = 0;
    var l = 0;
    var isDown = false;
    var width1= $("#leftside").width();
    var leftside = $("#leftside");
    //鼠标按下事件
    dv.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        //开关打开
        isDown = true;
        //设置样式
    }
    //鼠标移动
    window.onmousemove = function(e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var width2 = nl +width1+ 'px';
        $("#leftside").css({
          "width":"width2"
        })
    }
    //鼠标抬起事件
    window.onmouseup = function() {
        //开关关闭
        isDown = false;
    }
  },
  mounted(){
      $.fn.zTree.init($("#leftTree"), this.setting, this.nodeData);
  },
  watch:{
    nodeData: function(curVal,oldVal){
      var that = this;
      $.fn.zTree.init($("#leftTree"), this.setting, this.nodeData);
    },
 },
  methods: {
    zTreeOnClick:function(event, treeId, treeNode){
      console.log( treeId,treeNode);
      this.route=treeNode.route;
      if(this.route!='')
      {
        this.$router.push(this.route);
      }
    //  console.log(this.route);

    },
  }
}

</script>
<style scoped lang="less">

  .leftside{
    width: 100%;
    height: 100%;
    border-right: 1px solid grey;
  }
  .menu{
    width: 100%;
    height: 45px;
    padding: 8px,12px;
    background-color: rgb(52, 133, 198);

  }
  .text{
    float: left;
    font-size: 25px;
    line-height: 45px;
    padding-left: 30px;
    color: #fff;
  }
  .comment{
    height: 100%;
    border-right: 1px solid rgb(223, 224, 225);
    overflow-y: scroll;
    cursor: w-resize;
    padding-right: 10px;
    padding-left: 20px;
    ul {
      cursor: pointer;
    }
  }
</style>
