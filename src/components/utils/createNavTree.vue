<template>
    <li>
        <div class="item">
          <router-link v-if='!isFolder' class="node" :to='tree.route'>{{tree.name}}</router-link>
          <span class="plus"  v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
          <label class='folder' v-if='isFolder' @click="toggle">{{tree.name}}</label>
        </div>
      <ul>
        <createNavTree v-if='isFolder' v-show='isOpen' :tree=tree :key='index' v-for='(tree,index) in tree.children'></createNavTree>
      </ul>
    </li>
</template>

<script>
export default {
  name: 'createNavTree',
  props: ['tree'],
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder: function () {
      if (this.tree.children && this.tree.children.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    toggle: function () {

      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @fontSize:18px;
  .item:hover{
    background-color: rgb(228, 228, 228);
  }
  .node:hover, .folder:hover, .plus:hover{
    color: #000;
  }
  .node{
    position: relative;
    font-size: @fontSize !important;
    line-height: @fontSize*2;
    cursor: pointer;
    color:rgb(80, 129, 200);
    left: @fontSize*3;
    text-decoration: none;
  }
  .folder, .plus{
    display: inline-block;
    position: relative;
    left: @fontSize*2-0.2;
    font-size: @fontSize;
    line-height: @fontSize*2;
    cursor: pointer;
    user-select: none;
    color:rgb(80, 129, 200);
  }
  .plus{
    width: 2rem;
  }
  ul{
    padding-left: 2rem;
  }

</style>
