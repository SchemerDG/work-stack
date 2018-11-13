<template>
  <div class="buttons clear">
      <button type="button" class="btn btn-primary" @click='refresh'>
          <span class="glyphicon glyphicon-refresh" style="color: rgb(255, 140, 60);"> 刷新</span>
      </button>
      <button type="button" class="btn btn-primary" @click='dele'>
          <span class="glyphicon glyphicon-trash" style="color: rgb(255, 140, 60);"> 删除</span>
      </button>
      <button type="button" class="btn btn-primary" @click='add'>
          <span class="glyphicon glyphicon-plus" style="color: rgb(255, 140, 60);"> 添加</span>
      </button>
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: "buttons",
  data: () => ({

  }),
  methods: {
      addressing: function() {
        console.log("敬请期待......");
      },
      add: function() {
              console.log("敬请期待......");
      },
      dele: function() {
              console.log("敬请期待......");
      },
      refresh: function() {
              console.log("敬请期待......");
      }
   }
}

</script>
<style lang="less" scoped>
  button{
    padding: 6px;
    margin: 2px;
    float: right;
  }
</style>
