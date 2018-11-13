<template>
  <div class="shutter">
    <div class="alter2">
      <div class="title">
        修改及新建工程
        <button type="button" name="button" class="removebtn" @click='close'>
        <i class="fa fa-times" aria-hidden="true" style="color: rgb(248, 246, 248); font-size: 20px;"></i>
        </button>
      </div>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="md-8">
              <fieldset class="fieldset-top">
                <legend>基本资料</legend>
                <div class="information">
                  <div class="">
                    <span>工程名称<i style="color:red">*</i>：</span>
                    <input type="text" name="" value="" class="longinput" v-model='project.proname' style="ime-mode:disabled">
                  </div>
                  <div class="">
                    <span>所属分类<i style="color:red">*</i>：</span>
                       <select id="sendSybol" v-model="project.category" >
                         <option  v-for="classchild  in classsettings[0].children" name="sendSymbolId" :value="classchild.name"  :selected='selected(classchild.name)'>{{classchild.name}}</option>
                       </select>
                  </div>
                  <div class="">
                    <span>主设计人&#8194：</span>
                    <input type="text" name="" value="" class="shortinput" v-model='project.designer' disabled>
                    <span>共同设计 ：</span>
                    <input type="text" name="" value="members" class="shortinput" v-model='members' readonly='true' @click='members_click'>
                  </div>
                  <div class="">
                    <span>建立时间&#8194：</span>
                    <input type="text" name="" value="" class="shortinput" v-model='project.statime' disabled>
                    <span>修改时间 ：</span>
                    <input type="text" name="" value="" class="shortinput" v-model='project.alttime' disabled>
                  </div>
                  <div class="">
                    <span>工程版本<i style="color:red">*</i>：</span>
                    <input type="text" name=""  class="shortinput" v-model='project.version' @input="handleInput" >
                    <span>工程状态 ：</span>
                    <input type="text" name="" value="" class="shortinput" v-model='project.status' disabled>
                  </div>
                  <div class="">
                    <span>版本变更说明 ：</span>
                    <input type="text" name="" value="" v-model='project.version_description' class="longinput" >
                  </div>
                </div>

              </fieldset>
              <fieldset class="fieldset-bottom">
                <legend>工程日志</legend>
                <div class="fieldest-log">
                  <div class="log">
                    <div class="date">
                      <span v-for='log in logs'>{{log.date}}<br></span>
                    </div>
                    <div class="operation">
                      <span v-for='log in logs'>{{log.motion}}<br></span>
                    </div>
                    <div class="comments">
                      <span v-for='log in logs'>{{log.information}}<br></span>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="md-4">
                <div class="right">
                  <span class="righttitle">工程描述及工作笔记</span>
                </div>
                <div class="description">
                  <textarea id='alter2_right_description' v-model='project.description'  v-on:input='description_change()'></textarea>
                </div>
            </div>

          </div>
        </div>
      </div>
        <div class="bottombtns">
          <button class="btn btn-default" style="background-color:  rgb(108, 121, 255) " @click='save_botton'>保存</button>
          <!-- <button class="btn btn-default" style="background-color: rgb(108, 160, 255)">保存并继续添加</button> -->
          <button class="btn btn-default" @click='close' style="background-color: rgb(240, 95, 82)" >关闭</button>
        </div>
    <alter3 v-if="isalter3"  @isAlter3='closeMadal' @submitbtn='getinfo' :whichbotton='whichbotton' :now_data='now_memberlist'></alter3>
    </div>
  </div>
</template>
<script >
import alter3 from './alter3.vue'
export default {
  name: 'alter2',
  props: ['project','classsettings','neworalt'],
  data() {
    return {
      isalter3:false,
      whichbotton:'choose_designer',
      isAlter2: true,
      memberName:"",
      memberId:[],
      description_save:'',
      description_last:'',
      now_memberlist:[],
      memberlist:[],
      msg1:'选择共同设计人员',
    }
  },
  components: {
    alter3,
  },
  computed: {
    logs:function(){
      return this.project.logs;
    },
    members:function(){
      var membername='';
      console.log('project',this.project);
      for(var i=0;i<this.project.member.length;i++){
        membername=membername+" "+this.project.member[i].name;
      }
      this.memberName = membername;
      return this.memberName;
    },
    membersId:function(){
      for(var i=0;i<this.project.member.length;i++){
        this.membersId.push(project.member[i].id);
      }
      return this.membersId;
    },
  },
  mounted:function () {
    this.description_save=this.project.description;
    this.description_last=this.project.description;
  },
  methods: {
    closeMadal:function(){
      this.isalter3=false;
    },
    save_botton:function() {
      console.log(this.neworalt);
      var that=this;
      if(this.neworalt=='new')
      {
        if(this.project.proname=='')
        {
          alert('工程名称不能为空');
        }
        else if (document.getElementById("sendSybol").value=='') {
          alert('所属分类不能为空');
        }
        else if (this.project.version==''||this.project.version=='v') {
          alert('工程版本不能为空');
        }
        else
        {
          console.log('classsettings',this.classsettings);
          for(var i=0;i<this.classsettings[0].children.length;i++)
          {
            if(this.classsettings[0].children[i].name==document.getElementById("sendSybol").value)
            {
              this.project.category=this.classsettings[0].children[i].name;
              this.project.classification_id=this.classsettings[0].children[i].classification_id;
            }
          }
          var myDate = new Date();//获取系统当前时间
          this.project.alttime=myDate.toLocaleString('chinese',{hour12:false});
          this.project.status='设计';
          this.project.status_id='1';
          console.log(this.project);
          console.log('ajax');
          $.ajax({
            url: "add_engineering.php",
            type:'POST',
            dataType:'Json',
            data: {
              "data": that.project,
            },
            success: function(data){
              console.log(data);
              that.$emit('submitbtn');
            }
          })
        }

      }
      else if (this.neworalt=='alt') {
        if(this.project.proname=='')
        {
          alert('工程名称不能为空');
        }
        else if (document.getElementById("sendSybol").value=='') {
          alert('所属分类不能为空');
        }
        else if (this.project.version==''||this.project.version=='v') {
          alert('工程版本不能为空');
        }
        else
        {
          console.log('classsettings',this.classsettings);
          var temp_data=this.project;
          for(var i=0;i<this.classsettings[0].children.length;i++)
          {
            if(this.classsettings[0].children[i].name==document.getElementById("sendSybol").value)
            {
              this.project.category=this.classsettings[0].children[i].name;
              this.project.classification_id=this.classsettings[0].children[i].classification_id;
            }
          }
          var myDate = new Date();//获取系统当前时间
          this.project.alttime=myDate.toLocaleString('chinese',{hour12:false});
          this.project.status='设计';
          this.project.status_id='1';
          console.log(that.project);
          console.log('ajax');
          $.ajax({
            url: "update_engineering.php",
            type:'POST',
            dataType:'Json',
            data: {
              "data": that.project,
            },
            success: function(data){
              console.log(data);
              that.$emit('submitbtn');
            }
          })
      }
      }

    },
    members_click:function () {
      console.log(this.project);
      this.whichbotton='choose_designer';
      this.now_memberlist=[];
      for(var i=0;i<this.project.member.length;i++){
        this.now_memberlist.push(this.project.member[i].id);
      }

      var  that = this;
      console.log(that.project.classification_id);
      $.ajax({
        url:'eng_choose_designer.php',
        type:'POST',
        dataType:'JSON',
        data:{
          "whichbtn":"choose_designer",
          "id":that.project.classification_id,
        },
        success:function(data) {
          console.log(data);
          that.memberlist=data;
          that.isalter3=true;
        }
      })
    },
    selected:function(value){
      return value===this.project.category;
    },
    close: function() {
      this.$emit('isAlter2')
    },
    getinfo: function(choose,whichbotton) {
      console.log('alter3_return_alter2');
      console.log(whichbotton);
      console.log(choose);
      switch(whichbotton)
      {
        case "choose_designer":
          this.project.member=[];
          this.project.member=choose;
          if(choose==false)
          {
            this.project.member=[];
          }
          break;
      }
      this.isalter3=false;
    },
    handleInput(e){
      this.project.version='v'+e.target.value.replace(/[^\-?\d.]/g,'');
    },
    description_change:function(){
      var y=document.getElementById('alter2_right_description').value;
      if(y.indexOf(this.description_save)==0)
      {
        console.log('1');
        this.project.description=y;
        this.description_last=y;
      }
      else {
        console.log('0');
        this.project.description=this.description_last;
      }
    },
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
  .alter2{
    width:700px;
    height: 600px;
    border-radius: 5px;
    position: absolute;
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
      overflow-y: auto;
      height: 500px;
      border: 1px solid gray;
      margin: 10px;
      padding: 0px;
      .md-8 {
        width: 70%;
        border: 1px solid gray;
        height: 490px;
        padding: 5px;
        .fieldset-top {
          padding: 15px;
          border: 1px solid gray;
          height: 220px;
          legend {
            display: inline-block;
            width: auto;
            font-size: 14px;
            font-weight: bold;
          }
          .information {
            text-align: right;
            div {
              span {
                font-size: 12px;
                i {
                  font-size: 12px;
                }
              }
            }
          }
          select {
            width: 314px;
            border: 1px solid gray;
            height: 18px;
            margin-bottom: 5px;
            font-size: 12px;
          }
          .longinput {
            width: 314px;
            border: 1px solid gray;
            height: 18px;
            margin-bottom: 5px;
            font-size: 12px;
          }
          .middleinput {
            width: 288px;
            border: 1px solid gray;
            height: 18px;
            margin-bottom: 5px;
            font-size: 12px;
          }
          .shortinput {
            width: 121px;
            border: 1px solid gray;
            height: 18px;
            margin-bottom: 5px;
            font-size: 12px;
          }
        }
        .fieldset-bottom {
          overflow: hidden;
          border: 1px solid gray;
          height: 245px;
          padding-left: 15px;
          margin-top: 15px;
          legend {
            display: inline-block;
            width: auto;
            font-size: 14px;
            font-weight: bold;
          }
          .fieldest-log {
           height: 90%;
            .log {
              height: 90%;
              text-align: left;
              span {
                color:rgb(160, 160, 160);
                font-size: 12px;
              }
              .date {
                width: 30%;
                display: inline-block;
              }
              .operation {
                width: 34%;
                display: inline-block;
              }
              .comments {
                width: 34%;
                display: inline-block;
              }
            }
          }
        }
      }
      .md-4 {
        width: 30%;
        border: 1px solid gray;
        height: 490px;
        padding: 0px;
        margin-left: 0px;
        .right {
          width: 200px;
          height:25px;
          background-color: rgb(144, 146, 146);
          padding: 3px;
          margin-bottom: 10px;
          .righttitle {
            text-align: left;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .description {
          padding: 10px 5px;
          textarea {
            color:rgb(160, 160, 160);
            text-align: left;
            font-size: 12px;
          }
        }
      }
      .name {
        display: inline-block;
        width: 80px;
        font-size: 14px;
        vertical-align: top
      }
      .btns {
        padding:5px 0px 5px 240px;
      }
      .tips {
        color: blue;
      }
      p {
        padding:0px 20px 0px 81px;
      }

      input[type='text']{
        width: 353px;
        height: 18px;
        margin-bottom: auto;
      }
      textarea{
        width: 100%;
        height: 445px;
        resize:none;
      }
    }
    .bottombtns {
      float: right;
      margin-right: 25px;
    }
  }
}

</style>
