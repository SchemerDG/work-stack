<template>
  <div id="log">
    <fieldset class="workinglog">
      <legend class="title">对象工作日志</legend>
      <div class="controller">
        <div class="listname">
          系统日志
        </div>
        <div class="datashow">
          <div class="date">
            <div class="sub-title">日期时间</div>
            <span v-for="log in logs" >{{log.date}}</span>
          </div>
          <div class="operation">
            <div class="sub-title">分类事项</div>
            <span v-for="log in logs" >{{log.operation}}</span>
          </div>
          <div class="result">
            <div class="sub-title">日志内容</div>
            <span v-for="log in logs" >{{log.result}}</span>
          </div>
          <div class="operator">
            <div class="sub-title">操作人</div>
            <span v-for="log in logs" >{{log.operator}}</span>
          </div>
        </div>
      </div>
      <div class="performer">
        <div class="listname">
          设备日志
        </div>
        <div class="datashow">
          <div class="date">
            <div class="sub-title">日期时间</div>
            <span v-for="device_log in device_logs" >{{device_log.date}}</span>
          </div>
          <div class="operation">
            <div class="sub-title">分类事项</div>
            <span v-for="device_log in device_logs">{{device_log.operation}}</span>
          </div>
          <div class="result">
            <div class="sub-title">日志内容</div>
            <span v-for="device_log in device_logs">{{device_log.result}}</span>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  name: "log",
  props:['log_data'],
  computed: {
    logs: function(){
      //return [];
      if(this.log_data.length>0)
      return [this.log_data[0]];
      else
      return [{
        date: '',
        operation: '',
        result: '',
        operator: '',
      }];
    },
    device_logs:function(){
      return this.log_data;
    }
  },
  data: () => ({
  })
}
</script>
<style lang="less" scoped>
  #log{
    margin-top: 12px;
    .workinglog{
      border: 1px solid #c8cccf;
      height: 29rem;
      overflow: scroll;
      .title{
        display: inline-block;
        font-size: 1.6rem;
        margin-left: 10px;
        width: auto;
        font-weight: bold;
      }
      .controller, .performer{
        margin-left: 10px;
        width: 48%;
        box-sizing: border-box;
        display: inline-block;
        overflow: auto;
        .datashow{
          height: 23rem;
          border: 1px solid #c8cccf;
        }
        .listname{
          width: 9rem;
          height: 2rem;
          background-color: rgb(128, 128, 128);
          text-align: center;
          letter-spacing: 4px;
          line-height: 2rem;
          color: #fff;
          font-weight: bold;
        }
        .date, .operation, .result, .operator{
          text-align: center;
          display: inline-block;
          .sub-title{
            background-color: rgb(241, 241, 241);
            border: 1px solid #c8cccf;
            margin-right: -3px;
            margin_top:1px;
          }
        }
        .date{
          min-width:10%;
            max-width:22%;
          width: auto;
        }
        .operation{
          min-width:10%;
            max-width:22%;
          width: auto;
        }
        .result{
          min-width:10%;
          max-width:22%;
          width: auto;
        }
        .operator{
          min-width:10%;
          max-width:22%;
          width: auto;
        }
        span{
          display: block;
          font-size: 11px;
          line-height: 15px;
          text-align: left;
          color: rgb(160, 160, 160);
        }
      }
    }
}
</style>
