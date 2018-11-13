<template>
  <div id="model">
    <fieldset class="-version">
      <legend class="title">控制器</legend>
      <div class="content">
        <div class="item">

          <span>硬件型号<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.model">

          <span>序 列 号<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.series">

          <span>硬件版本<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.version">

          <span>系统软件<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.systemSoft">

          <span>应用软件<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.excuteSoft">

          <span>设备自检<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.status">

          <span>启用日期<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.startDate">

          <span>工作时长<span class="colon">:</span></span>
          <input type="text" disabled='true' v-model="controller.workingDuring">

          <span>设备信息<span class="colon">:</span></span>
          <textarea type="text" disabled='true'  v-model='controller.information'></textarea>


        </div>
        <div class="item_right">
          <div class="R_Top">

          </div>
          <div class="item_R_left">
            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>过冲上限</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>上限电流</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>实测电流</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>下限电流</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>功率上限</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>电源开关</span>

            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">
            <span><span class="colon">:</span>电流检测</span>
          </div>
          <div class="item_R_right">
            <span>过冲上限<span class="colon">:</span></span>
            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">

            <span>上限电压<span class="colon">:</span></span>
            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">

            <span>实测电压<span class="colon">:</span></span>
            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">

            <span>下限电压<span class="colon">:</span></span>
            <input type="text" class='input_short' disabled='true' v-model="controller.excuteSoft">

            <button type="button" class="btn"></button>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  name: "model",
  props:['unit_data1'],
  computed: {
    controller: function(){
      return this.unit_data1.controller;
    },
  },
  data: () => ({
  })
}
</script>
<style lang="less" scoped>
  #model{
    margin-top: 12px;
    fieldset{
      padding: 15px 5px;
      border: 1px solid rgb(213,215,216);
      .title{
        display: inline-block;
        font-size: 1.6rem;
        margin: 0 15px;
        width: auto;
        font-weight: bold;
      }
      .content{
        letter-spacing: 1px;

        .item{
          font-size: 1.3rem;
          width: 49%;
          float: left;
          line-height: 2.5rem;
          .listname{
            font-size: 1.5rem;
            letter-spacing: 4px;
            font-weight: bold;
          }
          textarea {
            resize:none;
            width: 80%;
            height: 60px;
            line-height: 25px;
            overflow-y:scroll;
            box-sizing: border-box;
            border: 1px solid #c8cccf;
            margin-top: 3px;
            box-shadow:1px 1px 1px #aaaaaa;
          }
          span{
            font-size: inherit;
            display: inline-block;
            width: 19%;
            text-align: center;
          }

          input[type='text']{
            width: 80%;
            height: 20px;
            line-height: 25px;
            overflow-x: hidden;
            box-sizing: border-box;
            border: 1px solid #c8cccf;
            margin-top: 3px;
            float: right;
            box-shadow:1px 1px 1px #aaaaaa;
          }
          .colon{
            width: 0;
            float: right;
            margin-right: 1rem;
          }
        }
        .item_right{
          font-size: 1.3rem;
          width: 47%;
          float: right;
          margin-right:5px;
          overflow:auto;
          line-height: 2.5rem;
          .listname{
            font-size: 1.5rem;
            letter-spacing: 4px;
            font-weight: bold;
          }
          span{
            font-size: inherit;
            display: inline-block;
            overflow:hidden;
            width: 19%;
            text-align: center;
          }
          .R_Top{
            width: 100%;
            height: 10%;
          }
          input[type='text']{
            width: 60%;
            height: 20px;
            line-height: 25px;
            overflow-x: hidden;
            box-sizing: border-box;
            border: 1px solid #c8cccf;
            margin-top: 3px;
            float: right;
            box-shadow:1px 1px 1px #aaaaaa;
          }
          .colon{
            width: 0;
            float: right;
            overflow:visible;
            margin-right: 1rem;
          }
          .item_R_left{
            font-size: 1.3rem;
            width: 45%;
            float: left;
            margin-left:5px;
            line-height: 2.5rem;
            .listname{
              font-size: 1.5rem;
              letter-spacing: 4px;
              font-weight: bold;
            }
            span{
              font-size: inherit;
              display: inline-block;
              white-space: nowrap;
              width: 40%;
              text-align: center;
            }
            .R_Top{
              width: 100%;
              height: 10%;
            }
            input[type='text']{
              width: 55%;
              height: 20px;
              line-height: 25px;
              overflow-x: hidden;
              box-sizing: border-box;
              border: 1px solid #c8cccf;
              float: left;
              box-shadow:1px 1px 1px #aaaaaa;
            }
            .colon{
              width: 0;
              float: left;
              overflow:visible;
              white-space: normal;
              margin-left: 10px;
              margin-right: 2px;
            }
          }
          .item_R_right{
            font-size: 1.3rem;
            width: 45%;
            float: right;
            margin-right:5px;
            line-height: 2.5rem;
            .listname{
              font-size: 1.5rem;
              letter-spacing: 4px;
              font-weight: bold;
            }
            span{
              font-size: inherit;
              display: inline-block;
              white-space: nowrap;
              width: 40%;
              text-align: center;
            }
            .R_Top{
              width: 100%;
              height: 10%;
            }
            input[type='text']{
              width: 55%;
              height: 20px;
              line-height: 25px;
              overflow-x: hidden;
              box-sizing: border-box;
              border: 1px solid #c8cccf;
              float: right;
              box-shadow:1px 1px 1px #aaaaaa;
            }
            .colon{
              width: 0;
              float: right;
              white-space: normal;
              margin-left: 2px;
              margin-right: 10px;
            }
            .btn{
              width:60%;
              height:60px;
              margin: 2px;
              float: right;
              background-image: url("../../../../icons/1.png");
              background-size:100% 100%;
            }
          }
        }
      }
    }
  }

</style>
