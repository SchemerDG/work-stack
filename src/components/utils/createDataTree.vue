<template>
  <div>
    <li>
        <div class="item">
          <span class="plus"  v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
          <input v-if="tree.hascheckbox ===true && isFolder" type="checkbox" v-model="tree.checked">
          <input v-if="tree.hascheckbox ===true && !isFolder" type="checkbox" v-model="treeCheckedArr">
          <label v-if="!isFolder" class="node">{{tree.name}}</label>
          <label class='folder' v-if='isFolder' @click="toggle">{{tree.name}}</label>
        </div>
      <ul>
        <createDataTree v-if='isFolder' v-show='isOpen' :tree=tree :key='index' v-for='(tree,index) in tree.children'></createDataTree>
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: "createDataTree",
  props: ['tree'],
  data () {
    return {
      isOpen: false,
      treeCheckedArr: []
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
  @fontSize: 1.8rem;
  .item:hover{
    background-color: rgb(228, 228, 228);
  }
  .node:hover, .folder:hover, .plus:hover{
    color:rgb(80, 129, 200);
  }
  .node{
    position: relative;
    font-size: @fontSize !important;
    line-height: @fontSize+1;
    cursor: pointer;
    color: #000;
    text-decoration: none;
  }
  .folder, .plus{
    display: inline-block;
    position: relative;
    font-size: @fontSize;
    cursor: pointer;
    user-select: none;
    color: #000;
  }
  .plus{
    width: @fontSize;
  }
  ul{
    padding-left: @fontSize+2;
  }
  label{
    text-align: center;
  }
  input[type='checkbox']{
    position: relative;
    top: 2px;
  }

</style>
