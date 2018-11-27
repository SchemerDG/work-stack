<template >
<div>
  <div class="btns clear">
    <button type="button" class="mod-btn mod-btn-save"  @click='save()'>
      <i class="mod-btn-icon fa fa-check-circle-o"></i>保存
    </button>
    <button v-if="log_botton_if" type="button" class="mod-btn mod-btn-log" @click='changeModel("log")' >
      <i class="mod-btn-icon fa fa-file-text-o" ></i>日志
    </button>
    <button v-if="controller_botton_if" type="button" class="mod-btn mod-btn-permi" @click='changeModel("controller")' >
      <i class="mod-btn-icon fa fa-cog" ></i>控制器
    </button>
    <button v-if="performer_botton_if" type="button" class="mod-btn mod-btn-permi" @click='changeModel("performer")' >
      <i class="mod-btn-icon fa fa-cog" ></i>执行器
    </button>
  </div>
  <form class="form" action="index.html" method="post">
    <fieldset border-radius class="fieldset">
        <legend class="form-title">编辑添加对象</legend>
        <div>
            <div class="item">
                <span>对象名称<span class="colon">:</span></span>
                <input type="text" name="objename"  v-model='usersignup.objename' :disabled='readonly1'>

                <span>对象归属<span class="colon">:</span></span>
                <select id="obj_belong" :disabled='readonly2'>
                  <option  v-for="option  in belongs"  :value="option.id" :selected='selected1(option.id)'>
                    {{option.name}}</option>
                </select>

                <span>系统注册<span class="colon">:</span></span>
                <select id="sys_re" :disabled='readonly3' >
                  <option  v-for="register  in register_status" :value="register.value"  :selected='selected(register.value)'>
                    {{register.text}}</option>
                </select>

                <span v-if='!readonly4'>有 效 期<span class="colon"  >:</span></span>
                <div class="datapicker_div" v-if='!readonly4'>
                    <date-picker :date="startTime" :option="option" ></date-picker>
                </div>
               <!-- <input type="text" name="sysignup"  v-model='usersignup.expirydate' :disabled='readonly4'> -->

                <span v-if='!readonly5'>注 册 人<span class="colon">:</span></span>
               <input type="text"  v-if='!readonly5' name="signuper"  disabled='true'  v-model='usersignup.signuper' >

                <span v-if='!readonly6'>注册日期<span class="colon">:</span></span>
               <input type="text" v-if='!readonly6' name="signupdate" disabled='true'  v-model='usersignup.signupdate' >
            </div>
            <div class="item-textarea">
             <textarea name="objdescr" id='sysarc_right_description' v-model='usersignup.description' :disabled='readonly7' v-on:input='description_change()'></textarea>
            </div>
          </div>
    </fieldset>
  </form>

  <model v-if="controller_botton_if"v-show="isModel" :unit_data1='unit_data1'/>
  <model0 v-if="performer_botton_if" v-show="isModel0" :unit_data1='unit_data1'/>
  <log v-if="log_botton_if" v-show="isLog" :log_data='log_data'/>
  </div>
</template>
<script>
import model from './model'
import model0 from './model0'
import log from './log'
import myDatepicker from 'vue-datepicker'
export default {
  props:['unit_data','unit_data1','log_data','status','belongs'],
  name: 'sysarc_right',
 components: {
   model,
   model0,
   log,
  'date-picker':  myDatepicker
 },
 data() {
   return {
     endtime: {
       time: ''
     },
     description_save:'',
     description_last:'',
     option: {
       type: 'day',
       week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
       month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
       format: 'YYYY-MM-DD',
       placeholder: '请选择日期',
       inputStyle: {
         'border':' 1px solid #c8cccf',
         'height': '25px',
         'display': 'inline-block',
         'box-shadow':'1px 1px 1px #aaaaaa',

       },
       color: {
         header: '#ccc',
         headerText: '#f00'
       },
       buttons: {
         ok: 'Ok',
         cancel: 'Cancel'
       },
       overlayOpacity: 0.5, // 0.5 as default
       dismissible: true // as true as default
     },
/*     limit: [{
       type: 'weekday',
       available: [1, 2, 3, 4, 5]
     },
     {
       type: 'fromto',
       from: '2016-02-01',
       to: '2016-02-20'
     }],*/


     text:'111',
     register_status:[{text:'',value:''},{text:'有效',status:true,value:'1'},{text:'无效',status:false,value:'0'}],
     arr: [
       '1',
       '2'
     ],
     localunit_id:'',
     show_flag:false,
     isModel: false,
     isModel0:false,
     isLog:false,
   }
 },
 computed: {
   startTime: function(){
     return {time:this.usersignup.expirydate};
   },
   log_botton_if:function(){
     return this.status==3;
   },
   controller_botton_if:function(){
     return this.status==3;
   },
   performer_botton_if:function(){
     return this.status==3;
   },
   readonly1:function(){
     return false;
   },
   readonly2:function(){
     return this.status==1||this.status==3;
   },
   readonly3:function(){
     return this.status==1||this.status==2;
   },
   readonly4:function(){
     return this.status==1||this.status==2;
   },
   readonly5:function(){
     return this.status==1||this.status==2;
   },
   readonly6:function(){
     return this.status==1||this.status==2;
   },
   readonly7:function(){
     return false;
   },
   usersignup: function(){
     return this.unit_data;
   },
 },
 mounted:function () {

 },
 watch:{
   usersignup: function(curVal,oldVal){
     if(curVal.id!=oldVal.id)
     {
       console.log('2');
       this.description_save=this.usersignup.description;
       this.description_last=this.usersignup.description;
       console.log(this.description_last);
     }
    // this.usersignup=curVal;
     console.log('watch',this.usersignup);
   },
   status:function(curVal,oldVal){
     if(curVal!=oldVal)
     {
        console.log('3');
       this.description_save=this.usersignup.description;
       this.description_last=this.usersignup.description;
     }
    // this.status=curVal;
     console.log('watch',this.status);
     console.log(this.description_last);
   }
},
 methods: {
   description_change:function(){
     console.log('description_change');
     var y=document.getElementById('sysarc_right_description').value;
     console.log('y',y);
     console.log(this.description_save);
     console.log(this.description_last);
     if(y.indexOf(this.description_save)==0)
     {
       console.log('1');
       this.usersignup.description=y;
       this.description_last=y;
     }
     else {
       console.log('0');
       this.usersignup.description=this.description_last;
     }
   },
   selected:function(value){
     return value===this.usersignup.sysignup;
   },
   selected1:function(id){
     return id===this.usersignup.localunit_id;
   },
   changeModel (data) {
     switch (data) {
       case 'controller':
       this.isModel=true;
       this.isModel0=false;
       this.isLog=false;
       break;
       case 'performer':
       this.isModel=false;
       this.isModel0=true;
       this.isLog=false;
       break;
       case 'log':

      this.isModel=false;
       this.isModel0=false;
       this.isLog=true;
       break;
       default:
       this.isModel=false;
        this.isModel0=false;
        this.isLog=false;
     }
   },
   save: function() {
     console.log('status',this.status);
     if(this.status!=-1)
     {
       var new_data={
         description:this.usersignup.description,
         expirydate:this.startTime['time'],
         localunit_id:document.getElementById("obj_belong").value,
         objename:this.usersignup.objename,
         sysignup:document.getElementById("sys_re").value,
         id:this.usersignup.id,
       };
       if(new_data['expirydate']!=this.usersignup.expirydate)
       {
         console.log(new_data['expirydate']);
         console.log(this.usersignup.expirydate);
         new_data['signuper_id']='now_user_id';
         var myDate = new Date();//获取系统当前时间
         new_data['signupdate']=myDate.toLocaleString('chinese',{hour12:false});
       }
       else{
         new_data['signuper_id']=this.usersignup.signuper_id;
         new_data['signupdate']=this.usersignup.signupdate;
       }

       console.log('new_data',new_data);
       var that=this;
       if(this.status==1)
       {
         $.ajax({
           url: "save_subsystem_information.php",
           type:'POST',
           dataType:'Json',
           data: {
             "subsystem_information":new_data,
           },
           success: function(data){

             that.$emit('refresh');

         }
         })
       }else if (this.status==2) {

         $.ajax({
           url: "save_unit_information.php",
           type:'POST',
           dataType:'Json',
           data: {
             "unit_information":new_data,
           },
           success: function(data){
             console.log('x');
           //this.description_save=this.description_last;
          // this.usersignup.description=this.description_last;
           console.log(data);
           console.log('a');
           that.$emit('refresh');
           console.log('b');
         }
         })
       }
       else if (this.status==3) {
         this.description_save=this.usersignup.description;
         $.ajax({
           url: "save_device_information.php",
           type:'POST',
           dataType:'Json',
           data: {
             "device_information":new_data,
           },
           success: function(data){
             // this.description_save=this.description_last;
             // this.usersignup.description=this.description_last;
             console.log('tree',data);
             that.$emit('refresh');
         }
       })
       }
     }

   },
 }
}
</script>

<style lang="less" scoped>
  .btns{
    border: 1px solid #d5d5d5;
    padding-left: 10px;
    button{
      padding: 6px;
      margin: 2px;
      float: left;
    }
  }
 .form {
   font-size: 10px;
   .item-textarea {
    display: inline-block;
    height: 150px;
    width: 48%;
    margin-right:20px;
    float:right;
    font-size: 13px;
    span{
      font-size: inherit;
      display: inline-block;
      width: 19%;
      text-align: center;
    }
    textarea {
      resize:none;
      width: 100%;
      height: 100%;
      line-height: 25px;
      overflow-y:scroll;
      box-sizing: border-box;
      border: 1px solid #c8cccf;
      margin-top: 3px;
      box-shadow:1px 1px 1px #aaaaaa;
    }
   }
   .item{
     position: relative;
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
     .colon{
       width: 0;
       float: right;
       margin-right: 10px;
     }
     input[type='text']{
       width: 70%;
       height: 25px;
       line-height: 25px;
       overflow-x: hidden;
       box-sizing: border-box;
       border: 1px solid #c8cccf;
       margin-top: 3px;
       box-shadow:1px 1px 1px #aaaaaa;
     }
     .datapicker_div{
       width: 70%;
       height: 25px;
       line-height: 25px;
       display: inline-block;
       overflow: visible;
       box-sizing: border-box;
       margin-top: 3px;
       }
   }

}
 fieldset table {
   width: 850px;
   align-items: center;
   margin: auto;

 }



 /* textarea {
   box-sizing: border-box;
   font-size:14px;
   height:100%;
   border-radius:4px;
   border:1px solid #c8cccf;
   color:#6a6f77;
   -web-kit-appearance:none;
   -moz-appearance: none;
   outline:0;
   padding:0 10px;
   text-decoration:none;
   width:70%;
 } */
.texta_style {
  vertical-align: top;
}
.fieldset{
  overflow: hidden;
  margin-top: 7px 0;
  border:1px solid rgb(213,215,216);
  padding-bottom: 7px;
}
.form-title{
  font-weight: bold;
  font-size: 16px;
  margin: 0 15px;
  width: auto;
}
select {
  width: 70%;
  height: 25px;
  line-height: 25px;
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid #c8cccf;
  margin-top: 3px;
  box-shadow:1px 1px 1px #aaaaaa;
}
</style>
