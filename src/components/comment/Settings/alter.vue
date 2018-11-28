<template>
  <div class="shutter">
    <div class="alter">
      <div class="title">
        {{msg}}
        <button type="button" name="button" class="removebtn" @click='close'>
          <!-- <span class="glyphicon glyphicon-remove" style="color: rgb(248, 246, 248); font-size: 18px;"></span> -->
          <i class="fa fa-times" aria-hidden="true" style="color: rgb(248, 246, 248); font-size: 20px;"></i>
        </button>
      </div>
      <div class="content">
        <div class="classname">
          <span class="name">分类名称 <i style="color:red">*</i>:</span>
          <input type="text" v-model='alertdata.classname' :readonly='onlyUser'>
        </div>
        <div class="classinstruction">
          <span class="name">分类说明  &ensp;:</span>
          <textarea v-model='alertdata.classinstruction'></textarea>
        </div>
        <div class="managers">
          <span class="name">分类管理  &ensp;:</span>
          <input type="text" v-model='managersx' id="cs" readonly= "true" :disabled='onlyUser'>
          <div class="btns">
            <button  class="btn btn-default " style="background-color: rgb(108, 160, 255)" @click="addperson0" :disabled='onlyUser'>添加人员</button>
            <button  class="btn btn-default " style="background-color: rgb(135, 135, 135)" @click="delperson0" :disabled='onlyUser'>删除</button>
            <button  class="btn btn-default " @click='clearcs' :disabled='onlyUser'>清空</button>
          </div>
        </div>
        <div class="membersdiv">
          <span class="name">分类成员 &ensp;:</span>
          <textarea v-model='membersx' id="csm" readonly= "true "></textarea>
          <div class="btns">
            <button class="btn btn-default" style="background-color: rgb(108, 160, 255)" @click="addperson1">添加人员</button>
            <button class="btn btn-default" style="background-color: rgb(135, 135, 135)" @click="delperson1">删除</button>
            <button class="btn btn-default" @click='clearcsm'>清空</button>
          </div>
        </div>
        <div class="consulter">
          <span class="name">分类查阅 &ensp;:</span>
          <textarea v-model='readersx' id="csc" readonly= "true "></textarea>
          <div class="btns">
            <button class="btn btn-default" style="background-color: rgb(108, 160, 255)" @click="addperson2">添加人员</button>
            <button class="btn btn-default" style="background-color: rgb(135, 135, 135)" @click="delperson2">删除</button>
            <button class="btn btn-default" @click='clearcsc'>清空</button>
          </div>
        </div>
      </div>
        <div class="bottombtns">
          <button class="btn btn-default" style="background-color:  rgb(108, 121, 255)" @click="save_botton">保存</button>
          <!-- <button class="btn btn-default" style="background-color: rgb(108, 160, 255)" @click="save_continue">保存并继续添加</button> -->
          <button class="btn btn-default" style="background-color: rgb(240, 95, 82)" @click="close">关闭</button>
        </div>
        <alter3 v-if="isalter3"  @isAlter3='closeMadal' @submitbtn='getinfo' :whichbotton=whichbotton :now_data='now_memberlist'></alter3>
    </div>
  </div>


</template>
<script >
import alter3 from './alter3.vue'
export default {
  name: 'alter',
  props: ['alertdata','msg'],
  components: {
  alter3
  },
  computed: {
    managersx:function () {
      var temp='';
        for (var i=0;i<this.alertdata.managers.length;i++){
          if(i==0){
            temp=this.alertdata.managers[i].name;
          }else{
            temp=temp+" "+" "+this.alertdata.managers[i].name;
          }
        }
        return temp;
      },
    membersx: function () {
      var temp='';
        console.log(this.alertdata.members);
        for (var i=0;i<this.alertdata.members.length;i++){
          if(i==0){
            temp=this.alertdata.members[i].name;
          } else{
            temp=temp+" "+" "+this.alertdata.members[i].name;
          }
        }
        return temp;
      },
    readersx: function () {
      var temp='';
        for (var i=0;i<this.alertdata.readers.length;i++){
          if(i==0){
            temp=this.alertdata.readers[i].name;
          }else{
          temp=temp+' '+' '+this.alertdata.readers[i].name;
          }
        }
        return temp;
      }
    },
  data() {
    return {
      memberlist:[],
      now_memberlist:[],
      isAlter: true,
      isalter3:false,
      msg:"",
      msg1:'',
      whichbtn:"",
      onlyUser:false,
    }
  },
  methods: {
    close: function() {
      this.$emit('isAlter');
    },
    save_botton:function() {
      var that=this;
      console.log(that.alertdata);
      $.ajax({
        url: "update_classification_settings.php",
        type:'POST',
        dataType:'Json',
        data: {
          "update_classification_settings": that.alertdata,
        },
        success: function(data){
          console.log(data);
          that.$emit('isAlter');
        }
      })
    },
    save_continue:function() {
      var that=this;
      $.ajax({
        url: "update_classification_settings.php",
        type:'POST',
        dataType:'Json',
        data: {
          "update_classification_settings": that.alertdata,
        },
        success: function(data){
        }
      })
      //this.$emit('isAlter');
    },
    clearcs: function() {
      document.getElementById("cs").value="";
      this.alertdata.managers=[];
    },
    clearcsm: function() {
      document.getElementById("csm").value="";
      this.alertdata.members=[];
    },clearcsc: function() {
      document.getElementById("csc").value="";
      this.alertdata.readers=[];
    },
   addperson0: function(){
     var  that = this;
     this.now_memberlist=[];
     $.ajax({
       url:'addPerson.php',
       type:'POST',
       dataType:'JSON',
       data:{
         "whichbtn":"manager"
       },
       success:function(data) {
        //  that.memberlist= data;
          that.memberlist=[];
          console.log(data.length);
          console.log(that.alertdata.managers.length);
          for (var i=0;i<data.length;i++){
            console.log(i);
            var temp_flag=true;
            for(var j=0;j<that.alertdata.managers.length;j++){
              if(data[i].userid==that.alertdata.managers[j].id){
                 temp_flag=false;
              }
            }
            if (temp_flag==true){
              that.memberlist.push(data[i]);
            }
          }
          console.log(data);
          console.log(that.memberlist);
          that.whichbotton='manager';
          that.msg1="添加管理人员";
          that.isalter3=true;
       }
     })
   },
   addperson1: function(){
     this.now_memberlist=[];
     var  that = this;
     $.ajax({
       url:'addPerson.php',
       type:'POST',
       dataType:'JSON',
       data:{
         "whichbtn":"member"
       },
       success:function(data) {
        //  that.memberlist= data;
          that.memberlist=[];
          console.log(data.length);
          console.log(that.alertdata.members.length);
          for (var i=0;i<data.length;i++){
            console.log(i);
            var temp_flag=true;
            for(var j=0;j<that.alertdata.members.length;j++){

              if(data[i].userid==that.alertdata.members[j].id){
                 temp_flag=false;
              }
            }
            for(var j=0;j<that.alertdata.managers.length;j++){

              if(data[i].userid==that.alertdata.managers[j].id){
                 temp_flag=false;
              }
            }
            if (temp_flag==true){
              that.memberlist.push(data[i]);
            }
          }
          console.log(data);
          console.log(that.memberlist);
          that.whichbotton='member';
          that.msg1="添加分类人员";
          that.isalter3=true;
       }
     })
   },
   addperson2: function(){
     this.now_memberlist=[];
     var  that = this;
     $.ajax({
       url:'addPerson.php',
       type:'POST',
       dataType:'JSON',
       data:{
         "whichbtn":"reader"
       },
       success:function(data) {
        //  that.memberlist= data;
          that.memberlist=[];
          console.log(data.length);
          console.log(that.alertdata.readers.length);
          for (var i=0;i<data.length;i++){
            console.log(i);
            var temp_flag=true;
            for(var j=0;j<that.alertdata.readers.length;j++){
              if(data[i].userid==that.alertdata.readers[j].id){
                 temp_flag=false;
              }
            }
            for(var j=0;j<that.alertdata.managers.length;j++){

              if(data[i].userid==that.alertdata.managers[j].id){
                 temp_flag=false;
              }
            }
            for(var j=0;j<that.alertdata.members.length;j++){

              if(data[i].userid==that.alertdata.members[j].id){
                 temp_flag=false;
              }
            }
            if (temp_flag==true){
              that.memberlist.push(data[i]);
            }
          }
          console.log(data);
          console.log(that.memberlist);
          that.whichbotton='reader';
          that.msg1="添加查阅人员";
          that.isalter3=true;
       }
     })
   },
   delperson0: function(){
     this.now_memberlist=[];
     var  that = this;
     that.memberlist=[];
     for(var i=0;i<that.alertdata.managers.length;i++){
       var struct={
            userid:that.alertdata.managers[i].id,
            username:that.alertdata.managers[i].name,
          };
       console.log(that.alertdata.managers[i]);

       that.memberlist.push(struct);
       console.log(that.memberlist);
      }
          console.log(that.memberlist);
          that.whichbotton='delmanager';
          that.msg1="删除管理人员";
          that.isalter3=true;
   },
   delperson1: function(){
     this.now_memberlist=[];
     console.log("delperson1");
     var  that = this;
     that.memberlist=[];
     for(var i=0;i<that.alertdata.members.length;i++)  {
       var struct={
            userid:that.alertdata.members[i].id,
            username:that.alertdata.members[i].name,
          };
       that.memberlist.push(struct);
      }
          console.log(that.memberlist);
          that.whichbotton='delmember';
          that.msg1="删除分类人员";
          that.isalter3=true;
   },
   delperson2: function(){
     this.now_memberlist=[];
     console.log("delperson2");
     var  that = this;
     that.memberlist=[];
     for(var i=0;i<that.alertdata.readers.length;i++)  {
       var struct={
            userid:that.alertdata.readers[i].id,
            username:that.alertdata.readers[i].name,
          };
       that.memberlist.push(struct);
      }
          console.log(that.memberlist);
          that.whichbotton='delreader';
          that.msg1="删除阅读人员";
          that.isalter3=true;
   },

   closeMadal: function() {
     this.isalter3=false;
   },
   getinfo: function(choose,whichbotton) {
     console.log('alter3_return_alter1');
     console.log(whichbotton);
     switch(whichbotton)
     {
       case "manager":
         for (var i=0;i<choose.length;i++){
           for(var j=0;j<this.alertdata.members.length;j++)
           {
             if(choose[i].id==this.alertdata.members[j].id)
             {
               this.alertdata.members.splice(j,1);
             }
           }
           for(var j=0;j<this.alertdata.readers.length;j++)
           {
             if(choose[i].id==this.alertdata.readers[j].id)
             {
               this.alertdata.readers.splice(j,1);
             }
           }
           this.alertdata.managers.push(choose[i]);

         }
         break;
       case "member":
         for (var i=0;i<choose.length;i++){
           for(var j=0;j<this.alertdata.readers.length;j++)
           {
             if(choose[i].id==this.alertdata.readers[j].id)
             {
               this.alertdata.readers.splice(j,1);
             }
           }
           this.alertdata.members.push(choose[i]);

         }
         break;
       case "reader":
         for (var i=0;i<choose.length;i++){
           this.alertdata.readers.push(choose[i]);
         }
         console.log(this.alertdata.readers);
         break;
       case "delmanager":
         for (var i=0;i<choose.length;i++){
           for(var j=0;j<this.alertdata.managers.length;j++)
           {
             if(choose[i].id==this.alertdata.managers[j].id)
             {
               this.alertdata.managers.splice(j,1);
             }
           }
         }
         break;
       case "delmember":
         for (var i=0;i<choose.length;i++){
           for(var j=0;j<this.alertdata.members.length;j++)
           {
             if(choose[i].id==this.alertdata.members[j].id)
             {
               this.alertdata.members.splice(j,1);
             }
           }
         }
         break;
       case "delreader":
         for (var i=0;i<choose.length;i++){
           for(var j=0;j<this.alertdata.readers.length;j++)
           {
             if(choose[i].id==this.alertdata.readers[j].id)
             {
               this.alertdata.readers.splice(j,1);
             }
           }
         }
         break;
     }
     this.isalter3=false;
   }

 },
 created:function(){
   if(this.msg==="管理工程分类"){
        console.log(this.onlyUser);
       this.onlyUser=true;
   }else {
        this.onlyUser=false;
   }
 }


}

</script>
<style scoped lang="less">
.shutter{
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  .alter{
    width: 500px;
    height: 600px;
    border-radius: 5px;
    position: fixed;
    border: 1px solid gray;
    background-color: rgb(233, 226, 255);
    left: 52rem;
    top: 8rem;
    .title{
      padding-left: 10px;
      background-color: rgb(27, 96, 148);
      height: 40px;
      color: rgb(255, 255, 255);
      font-size: 20px;
      line-height: 40px;
    }
    .removebtn {
      background-color: rgb(27, 96, 148);
        float: right;
        margin-right: 11px
    }
    .content{
      overflow-y: scroll;
      height: 500px;
      border: 1px solid gray;
      margin: 10px;
      padding: 10px;
      .name {
        display: inline-block;
        width: 80px;
        font-size: 12px;
        vertical-align: top
      }
      .btns {
        padding:5px 0px 5px 240px;
        float:right;
        margin-right: 8px;
      }
      .tips {
        color: blue;
        font-size:12px;
      }
      p {
        padding:0px 20px 0px 81px;
        font-size: 12px;
      }

      input[type='text']{
        width: 353px;
        height: 18px;
        margin-bottom: auto;
        font-size: 12px;
      }
      textarea{
        width: 353px;
        height: 60px;
        font-size: 12px;
      }
    }
    .bottombtns {
      padding-left: 250px;
      float: right;
      margin-right: 10px;
      button {
        font-size: 12px;
      }

    }
  }
}

</style>
