<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less">
* {
  padding: 0px;
  margin: 0px;
}
html,body {
  width: 100%;
  height: 100%;
}
.leftside{
  padding: 0;
}
.navi{
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
