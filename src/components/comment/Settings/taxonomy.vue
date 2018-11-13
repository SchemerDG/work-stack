<template>
  <div >
    <div >
      <navi :menuitem='menuitem'></navi>
    </div>

    <div class="global">
      <div class="top">
       <span >分类名称：</span>
       <input type="text" class="input-1" id="input-1" :placeholder="msg" v-model="inputmsg">
       <button class="middle-btn-search" @click='search' >查询</button>
       <button class="middle-btn-clear" @click='clear'>清空</button>
      </div>
      <button type="button" class="mod-btn mod-btn-ref" @click='refresh'>
        <i class="mod-btn-icon fa fa-refresh"></i>刷新
      </button>
      <button type="button" class="mod-btn mod-btn-del" @click='dele'>
        <i class="mod-btn-icon fa fa-trash"></i>删除
      </button>
      <button type="button" class="mod-btn mod-btn-add" @click='add'>
        <i class="mod-btn-icon fa fa-plus"></i>添加
      </button>
      <div class="middle">
        <form  class="form"  >
            <table class="table table-hover"  ref="table">
            	<thead>
            		<tr>
                  <td></td>
                  <td><input type="checkbox"></td>
            			<th>操作</th>
            			<th>分类名称</th>
            			<th>分类说明</th>
                  <th>工程数量</th>
                  <th>管理人</th>
                  <th>成员</th>
            		</tr>
            	</thead>
            	<tbody>
          		<tr v-for='(classsettings, index) in classsettings' class="trstyle" v-if="(13*(page-1))<=index&&index<(13*page)">
                <td class="td-index">{{index+1}}</td>
                <td><input type="checkbox" class='checkbox' v-bind:name="classsettings.id"></input></td>
                <td><button @click.prevent='openMadal(index)' class="alterbtn">修改</button></td>
          			<td><span>{{classsettings.classname}}</span></td>
          			<td><span>{{classsettings.classinstruction}}</span></td>
                <td><span>{{classsettings.engineeringnum}}</span></td>
                <td><span v-for='(managers,index) in classsettings.managers'>{{managers.name}}&nbsp</span></td>
                <td><span v-for='(members,index) in classsettings.members'>{{members.name}}&nbsp</span></td>
          		</tr>
            	</tbody>
           </table>
        </form>
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
          共<span id="pagespan">{{Math.ceil(classsettings.length/13)}}</span>页
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
        <alter v-if="isAlter" v-show="isAlter" @isAlter='closeMadal' :alertdata=alertdata :msg=msg></alter>
    </div>
  </div>

</template>

<script>
import alter from './alter.vue'
import navi from '../../navi/index.vue'
export default {
  name: 'taxonomy',
  components: {
    navi,
    alter,
  },
  data () {
    return {
      classsettings:"",
      page: 1 ,
      msg: '请输入',
      isAlter:false,
      index:0,
      alertdata:'',
      msg:'添加及修改工程分类',
      blank:"、",
      inputmsg:'',
      del_id:[]
         }
      },
      computed: {
        // classsettings: function() {
        //   return this.$store.state.classsettings
        // },
        menuitem: function () {
          return this.$store.state.tree[3].children[0]
        }
  },
  methods: {
      add: function() {
        var that = this;
        var status=true;
        for(var i=0;i<this.classsettings.length;i++){
          if(this.classsettings[i].classname==="未命名"){
              console.log("已存在未命名分类，请先编辑！");
              status=false;
          }
        }
        if(status==true)
        {
          console.log('add_');
          $.ajax({
            url: "new_classification_settings.php",
            type:'POST',
            dataType:'Json',
            data: {
              "add_classification_settings": "add_classification_settings",
            },
            success: function(data){
              that.classsettings=data;
              console.log(that.classsettings);
            }
          })
        }
      },
      dele: function() {
          var that=this;
          let checkDom=this.$refs.table.getElementsByClassName("checkbox");

          var j=0;
          for (var i=0;i<checkDom.length;i++)
          {
            if(checkDom[i].checked)
            {
              that.del_id[j]=checkDom[i].name;
              console.log(checkDom[i].name);
              j++;
            }
          }
          console.log(that.del_id);

          if (that.del_id.length>0)
          {
            console.log(that.del_id);
            $.ajax({
              url:"dele_classification_settings.php",
              type:"POST",
              dataType:"Json",
              data:{
                "data":that.del_id,
              },
              success:function(data){
                console.log("ajax");
                that.classsettings =data;
                console.log(that.classsettings);
              }
            })
          }
      },
      refresh: function() {
        var that=this;
         $.ajax({
           url:"get_classification_settings.php",
           dataType:"Json",
           type:"POST",
           data:{"getinfo":"i'need classification settings list"},
           success:function(data){
             console.log("ajax");
             that.classsettings =data;
             console.log(that.classsettings);
           }
         })
      },
      nextpage: function() {
        if(this.page < Math.ceil(this.classsettings.length/13)){
          this.page= this.page + 1;
          return this.page;
        }else {
          this.page = Math.ceil(this.classsettings.length/13);
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
        this.page = Math.ceil(this.classsettings.length/13);
        return this.page;
      },
      clear: function() {
        document.getElementById("input-1").value="";
      },
      openMadal: function(index) {
        this.index = index;
        this.alertdata=this.classsettings[index];
        this.isAlter =true
      },
      closeMadal: function() {
        //写ajax
        var that=this;
         $.ajax({
           url:"get_classification_settings.php",
           dataType:"Json",
           type:"POST",
           data:{"getinfo":"i'need classification settings list"},
           success:function(data){
             that.classsettings =data;
             console.log(that.classsettings);
           }
         })
        this.isAlter=false
      },
      search: function() {
        console.log("search");
        var that=this;
        that.inputmsg = $(".input-1").value;
        console.log(inputmsg);
        console.log(inputmsg);
        $.ajax({
          url:"search_classification_settings.php",
          type:"POST",
          dataType:"JSON",
          data:{
            "inputmsg":inputmsg,
          },
          success:function(data) {
            console.log(data);
            that.classsettings=data;
          }
        })
      },
   },
   created:function() {
       console.log("created");
       var that=this;
        $.ajax({
          url:"get_classification_settings.php",
          dataType:"Json",
          type:"POST",
          data:{"getinfo":"i'need classification settings list"},
          success:function(data){
            console.log("ajax");
            that.classsettings =data;
            console.log(that.classsettings);
          }
        })
   },
   watch:{
     inputmsg: function(curVal,oldVal){
       var that =this;
       console.log(curVal);
       $.ajax({
         url:"search_classification_settings.php",
         type:"POST",
         dataType:"JSON",
         data:{
           "inputmsg":curVal,
         },
         success:function(data) {
           console.log(data);
           that.classsettings=data;
         }
       })
     }
   }

}
</script>
<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
body,html {
  width: 100%;
  height: 100%;
}
.top{
  padding: 5px;
  border: 1px solid gray;
  margin: 0px;
  input {
    height: 20px;
    border: 1px solid gray;
    border-radius: 2px;
    font-size: 12px;
  }
  span {
    font-size: 12px;
  }
}

 thead {
   tr {
     td {
       border: 1px solid gray;
       background-color: rgb(240, 238, 238);
       border-radius: 2px;
     }
     th {
       border: 1px solid gray;
       background-color: rgb(240, 238, 238);
       border-radius: 2px;
       font-size: 12px;
     }
   }
 }

   tr {
     td {
       vertical-align:middle;
       font-size: 10px;
       color: black;
       span {
         color: black;
         font-size: 10px;
       }
     }
     .td-index {
       background-color: rgb(240, 238, 238);
       border: 1px solid gray;
     }
   }
  .alterbtn {
    height:21px;
    width: 30px;
    background-color:  rgb(207, 69, 113);
    border-radius: 4px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    color: white;
    font-size: 10px;
  }
  .global {
    border-radius: 6px;
    margin-top: 5px;
    height: 100%;
    border: 1px solid gray;
  }
  /* buton {
      border: 1px solid gray;
      margin-left: 5px;

  } */
  .middle{
    height: 510px;
    border: 1px solid gray;
    overflow-y: scroll;
  }
  .bottom {
   font-size: 12px;
   margin: 10px;
   button {
     width: 15px;
     margin: 3px 3px;
     border-radius: 2px;
    i {
      font-size: 12px;
      color: black;
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
   span {
     font-size: 12px;
   }
  }

</style>
