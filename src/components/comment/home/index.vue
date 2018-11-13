<template >

  <div class="global">
    <navi :menuitem=menuitem></navi>
    im home
  </div>

</template>

<script>
import navi from '../../navi/index.vue'
export default {
  name: 'home',
  components: {
    navi
  },
  data () {
    return {
    }
  },
  computed: {
    menuitem: function () {
        return this.$store.state.tree[0]
      }
    }
}
</script>
<style lang="less" scoped>

* {
  padding: 0px;
  margin: 0px;
}
html,body {
  width: 100%;
  height: 100%;
}
.global {
  height: 100%;
  width: 100%;
}
</style>
