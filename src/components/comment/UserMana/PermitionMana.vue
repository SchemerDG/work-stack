<template>
  <div>
    <fieldset>
      <legend class="title">用户权限管理</legend>
      <div class="wrap">
        <div class="limitionlist">
          <div class="listname">
            权限列表
          </div>
          <div class="content">
            <div :class="'row-'+permition.id" v-for="permition in permitionList" :key="permition.key">
              <span class="bold-item item"><input type='checkbox' v-model="permition.checked" @click.stop='checkAll(permition)'/>{{ permition.name }}</span>
              <span class="item" v-for="item in permition.children" :key="item.key">
                <input type='checkbox' checked='checked' v-model="item.checked" :value="item.name"/>
                <span style='width:48px'>{{ item.name }}</span>
                <span v-if="(item.isRange==true)&&(item.haveRange==true)" :class="item.canClick ? 'clicked' : 'unclicked'"  @click='clicked(item)'>[有范围]</span>
                <span v-if="(item.isRange==true)&&(item.haveRange==false)" :class="item.canClick ? 'clicked' : 'unclicked'" >[无范围]</span>
                <span v-if="(item.isRange==false)&&(item.haveLimit==true)" :class="item.canClick  ? 'clicked' : 'unclicked'"  >[有限制]</span>
                <span v-if="(item.isRange==false)&&(item.haveLimit==false)" :class="item.canClick  ? 'clicked' : 'unclicked'" >[无限制]</span>
                <input type='text' v-if="!(item.text===undefine)" v-model='item.text'/>
              </span>
            </div>
          </div>
        </div>
        <div class="limition">
          <div class="listname">
            权限范围
          </div>
          <div class="limtree">
            <!-- <createDataTree  :tree=tree v-for="tree in limtree" :key="tree.key">
                <input slot='checkbox' type="checkbox"/>
            </createDataTree> -->
            <ul id='limit_range_tree' class="ztree_limit_range"></ul>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
import createDataTree from '../../utils/createDataTree.vue'
import  'ztree'
import '../../../plugins/treecss/limit_range_tree_style/Style.css'
var that={};
export default {
  // props:["userId"],
  name: "PermitionMana",
  components: {
    createDataTree,
  },
  computed: {
    getuserid: function () {
        return this.$parent.userId;
      }
    },
    data(){
      return {
      checkedArr: [],
       permitionList:"",
       now_treename:'',
      limtree:"",
      userid:"",
      setting:{
        view: {
          showLine: true,
        },
        check:{
          enable: true,
          chkStyle: "checkbox",
          chkboxType: { "Y": "ps", "N": "ps" }
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onCheck: this.zTreeOnCheck
        }
      },
    }
  },
  mounted:function(){
    that=this;
  },
  methods: {
    zTreeOnCheck:function (event, treeId, treeNode) {
      that.userid=that.$parent.userId;
      $.ajax({
        url: "change_limiterange.php",
        type:'POST',
        dataType:'Json',
        data: {
          'targgget_id':treeNode.id,
          'limit_name':that.now_treename,
          'checked':treeNode.checked,
          "userid": that.userid
        },
        success: function(data){
          that.limtree = data;
          var treeObj=$.fn.zTree.init($("#limit_range_tree"), that.setting, that.limtree);
          console.log(treeObj);
            console.log(data);
        }
      })
    } ,
    clicked: function(item){
      that.now_treename=item.name;
      console.log(item.name);
      console.log(that.userid);
      var itemName=item.name;
      $.ajax({
        url: "get_user_limiterange.php",
        type:'POST',
        dataType:'Json',
        data: {
          "itemName": itemName,
          "userid": that.userid
        },
        success: function(data){
          that.limtree = data;
          var treeObj=$.fn.zTree.init($("#limit_range_tree"), that.setting, that.limtree);
          console.log(treeObj);
            console.log(data);
        }
      })
    },
    checkAll(permition) {
      let _this = this
      if (permition.checked === true) {
        permition.children.forEach(function(item){
          _this.checkedArr.splice(_this.checkedArr.indexOf(item.name),1)
        })
      }else {
        permition.children.forEach(function(child){
          console.log(child.name);
          if (_this.checkedArr.indexOf(child.name)!==-1) {
            _this.checkedArr.splice(_this.checkedArr.indexOf(child.name),1)
          }
        })
        permition.children.forEach(function(item){
        _this.checkedArr.push(item.name)
      })
      }
    }
  },
  watch: {
    getuserid: function(curVal,oldVal){
      console.log("这是watch11");
      console.log(curVal);
      console.log("这是原本数据+that");
      console.log(that.permitionList);
      console.log("这是原本数据无that");
      // console.log(permitionList);
      $.ajax({
        url: "get_user_limit.php",
        type:'POST',
        dataType:'Json',
        data: {
          "userid": curVal,
        },
        success: function(data){
          that.permitionList=data;
          console.log("这里是watch");
          console.log(that.permitionList);
      }
    })
    },
  },
}
</script>
<style lang="less" scoped>
  .unclicked{
    color: rgb(161, 161, 161);
  }
  .clicked{
    color: blue;
    cursor: pointer;
  }
  fieldset{
    padding: 15px 5px 3px;
    border: 1px solid rgb(213,215,216);
    .title{
      font-size: 16px;
      display: inline-block;
      margin: 0 15px;
      width: auto;
      font-weight: bold;
    }
    .listname{
      width: 90px;
      height: 20px;
      margin-top: 5px;
      background-color: rgb(128, 128, 128);
      text-align: center;
      letter-spacing: 4px;
      line-height: 20px;
      color: #fff;
      font-weight: bold;
    }
    /* .limitionlist{
      width: 400px;
      height: 305px;
      overflow-y: scroll;
    } */
    .wrap{
      padding: 0 5px;
      .limitionlist{
        float: left;
        .content{
          overflow-y: scroll;
          width: 600px;
          height: 304px;
          border: 1px solid rgb(213,215,216);
          display: inline-block;
          span{
            font-size: 12px;
            display: inline-block;
            line-height: 30px;
            float: left;
            input[type='checkbox']{
              float: left;
              margin: 10px 4px;
            }
            input[type='text']{
              margin-left: 10px;
              height: 20px;
              width: 185px;
              border: 1px solid #c8cccf;
              box-shadow:1px 1px 1px #aaaaaa;
            }
          }
          .bold-item{
            height: 100%;
            font-weight: bold;
            float: left;
          }
          .item{
            margin-left: 10px;
            margin-right: 25px;
          }
          .row-1{
            height: 304px*0.47;
          }
          .row-2{
            height: 304px*0.25;
          }
          .row-3{
            height: 304px*0.25;
          }
          .row-4{
            height: 304px*0.25;
          }
          .row-5{
            height: 304px*0.125;
          }
          .row-6{
            height: 304px*0.125;
          }
          .row-7{
            height: 304px*0.125;
          }
          .row-8{
            height: 304px*0.125;
          }
          .row-9{
            height: 304px*0.125;
          }
        }
      }

    }
    .limition{
      display: inline-block;
      /* position: absolute;  */
       overflow-x: scroll;
      /* bottom: 8px;
      right: 18px; */
      margin-top: 0px;
      float: right;
      .limtree{

        overflow-y: scroll;
        overflow-x: hidden;
        width: 350px;
        height: 305px;
        border: 1px solid rgb(213,215,216);
      }
    }
  }
</style>
