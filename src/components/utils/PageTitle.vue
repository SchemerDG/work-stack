<template>
  <div class="title">
      {{pageTitle}}
  </div>
</template>
<script>
export default {
  name: "pagetitle",
  props: ['pageTitle'],
  data: () => ({

  })
}
</script>
<style lang="less" scoped>
.title{
  padding-left: 5px;
  height: 3rem;
  background: -webkit-linear-gradient(rgb(240, 240, 240), rgb(215, 215, 215)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(240, 240, 240), rgb(215, 215, 215)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(240, 240, 240), rgb(215, 215, 215)); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(240, 240, 240), rgb(215, 215, 215)); /* 标准的语法（必须放在最后） */
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  line-height: 3rem;
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
