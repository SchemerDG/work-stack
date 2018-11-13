<template>
  <div id="navi">
      <ul>
        <li v-for="(list,index) in lists" @click='changeActive(index)' :class="{active:active === index}" :key="list.key">
        <router-link :to="list.route">{{list.name}}</router-link></li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'navi',
  props: ['menuitem'],
  data: () => ({
  }),
  methods: {
    changeActive(index){
      this.$store.commit('CHANGE_ACTIVE',index)
    }
  },
  computed: {
    lists: function () {
      return this.$store.state.lists
    },
    active: function () {
      return this.$store.state.active
    }
  },
  created() {
    this.$store.commit('GET_LIST',this.menuitem)
  }
}
</script>
<style lang="less" scoped>
  #navi{
    height: 45px;
    background-color: rgb(69, 146, 207);
  }
  ul{
    height: 40px;
    margin: 0;
    padding: 5px 0 0 4px;
  }
  ul li{
    width: 180px;
    height: 40px;
    margin: 0 auto;
    display: inline-block;
    background-color: rgb(59,124,187);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    color: #fff;
  }
  li a{
    display: block;
    text-decoration: none;
    font-size: 22px;
    line-height: 35px;
    text-align: center;
    color: inherit;
  }
  .active{
    background-color: #fff;
    color: rgb(81,131,148);
  }
</style>
