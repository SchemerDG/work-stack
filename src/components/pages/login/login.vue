<template>
    <div class="login">
      <div class="centerlogin">
        <div class="title">
          <h2>欢迎登陆</h2>
        </div>
        <form class=""  method="post">
          <div class="user">
            <span>账号：</span>
             <input type="text" name="userName" v-model = 'userName' id="userName" placeholder="请输入账号">
          </div>
         <div class="password">
           <span>密码：</span>
           <input type="password" name="passWord" v-model = 'passWord' id="passWord" placeholder="请输入密码">
         </div>
         <div class="submit-btn">
          <input type="submit" name="submit" value="登陆" @click.prevent='to'>
         </div>
        </form>
      </div>
    </div>

</template>
<script>
 export default {
   name: 'login',
   data(){
     return {
       userName: '',
       passWord: ''
     }
   },
   components: {

   },
   computed: {

   },
   methods: {

     to: function () {
       console.log('OK');
        var userName =$("#userName").val();
        var passWord =$("#passWord").val();
        // var passWords = this.$md5(passWord);
        var that = this;
         $.ajax({
           url: "/login.php",
           type:'POST',
           dataType:'json',
           data: {
             "userName": userName,
             "passWord": passWord
           },
           success: function(data){
               // (this.userName=='zyd')&&(this.passWord=='123')
                 console.log(data);
               if(data.login_status=="true"){
                 that.$router.push({
                   name: 'workstack',
                   params: {loginUser: data}
                 });
                 console.log('欢迎'+that.userName+'登陆成功');
               }else {
                 console.log('账号或密码错误，请重新登陆！');
               }
           }
         })
     }
   },
   }
</script>
<style scoped lang="less">
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(226, 225, 239);
    .centerlogin {
      position: absolute;
      top: 40%;
      left: 50%;
      width: 500px;
      height: 300px;
      margin-top: -150px;
      margin-left: -250px;
      border: 1px solid white;
      border-radius: 4px;
      h2{
        margin: 30px 0;
        text-align: center;
        align-items: center;
        font-size: 20px;
      }
      .user {
        text-align: center;
        margin-top: 15px;
        height: 50px;
         input {
           height: 25px;
           width: 200px;
           border-radius: 4px;
         }
      }
      .password {
        text-align: center;
        margin-top: 10px;
        height: 50px;
         input {
           height: 25px;
           width: 200px;
           border-radius: 4px;
         }
      }
      .submit-btn {
        width: 100%;
        height: 35px;
        margin: 0 auto;
        input[type='submit']{
          display: block;
          width: 20%;
          height: 100%;
          margin: 20px auto;
          box-sizing: border-box;
          border: 1px solid black;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      }
  }
</style>
