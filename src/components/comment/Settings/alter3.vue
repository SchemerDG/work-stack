<template>
  <div class="shutter">
    <div class="alter3">
      <div class="title">
        {{msg}}
        <button type="button" name="button" class="removebtn" @click='close'>
          <!-- <span class="glyphicon glyphicon-remove" style="color: rgb(248, 246, 248); font-size: 18px;"></span> -->
          <i class="fa fa-times" aria-hidden="true" style="color: rgb(248, 246, 248); font-size: 20px;"></i>
        </button>
      </div>
      <div class="content" ref="divx">
        <ul>
           <li  v-for="mlist in memberlist" >
            <input type="checkbox" name="" :value="mlist.userid" class="checkbox" :checked='alter3_checked(mlist.userid)'>
            <span class="username">{{mlist.username}}</span>
          </li>
        </ul>
      </div>
      <button class="submit" type="button" name="button" @click='submit'>确定</button>
    </div>
  </div>
</template>

<script>
export default{
  name:'alter3',
  props:['whichbotton','now_data'],
  data(){
    return{
      choose:[],
    }
  },
  computed:{
    memberlist:function(){
     console.log(this.$parent.memberlist);
     return this.$parent.memberlist;
   },
   msg:function(){
     return this.$parent.msg1;
   },

  },
  created: function(){
  },
  methods: {
    close: function() {
      this.$emit('isAlter3');
    },
    submit: function() {
      var that = this;
      let checkDom=this.$refs.divx.getElementsByClassName("checkbox");
      let usernameDom=this.$refs.divx.getElementsByClassName("username");
      that.choose=[];
      for (var i = 0; i < checkDom.length; i++) {
          if(checkDom[i].checked){
            console.log(selected);
            var selected={'id':checkDom[i].value,'name':usernameDom[i].innerText};
            console.log('....................');
            console.log(selected.name);
            console.log(selected);
            that.choose.push(selected);
          }
      }
      console.log(that.choose);
        return that.$emit('submitbtn',that.choose,that.whichbotton);
    },
    alter3_checked:function (value) {
      console.log(value);
      console.log(this.now_data);
      console.log(this.now_data.indexOf(value)!=-1);
      return this.now_data.indexOf(value)!=-1;
    },
  },
}

</script>

<style lang="less" scoped>
.shutter{
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

.alter3 {
  border: 1px solid gray;
  border-radius: 4px;
  position: absolute;
  top: 50px;
  right: 0px;
  bottom: 0px;
  left: 140px;
  width: 220px;
  height: 350px;
  background-color: rgb(233, 226, 255);
  .title{
    padding-left: 10px;
    background-color: rgb(27, 96, 148);
    height: 40px;
    width: 100%;
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
    height: 75%;
    border: 1px solid gray;
    margin: 10px;
    padding: 10px;
}
 .submit{
   background-color: rgb(108, 121, 255);
   margin-left: 80px;
   width:60px;
   border-radius: 4px;
 }
}
}
</style>
