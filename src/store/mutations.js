const GET_LIST = 'GET_LIST'
const CHANGE_ACTIVE = 'CHANGE_ACTIVE'
const GETTREECHECKEDARR = 'GETTREECHECKEDARR'
export default {
  [GET_LIST] (state, obj) {
    if (state.lists.length === 1 && obj.id !== state.lists[0].id) { //  导航元素只有一个，并且点击的不是主页，增加一个导航元素
      state.lists.push(obj)
    }
    if (state.lists.length === 2 && obj.id !== state.lists[1].id && obj.id !== state.lists[0].id) { //  导航元素有两个，并且点击的不是前两个，增加一个导航元素
      state.lists.push(obj)
    }
    if (state.lists.length === 3 && obj.id !== state.lists[0].id && obj.id !== state.lists[1].id && obj.id !== state.lists[2].id) { //  导航元素有三个，并且点击的不是前三个，增加一个导航元素
      state.lists.push(obj)
      state.lists.splice(1, 1)
    }

    //  改变动态样式active
    if (obj.id === state.lists[0].id) {
      state.active = 0
    }
    if (state.lists[1] && obj.id === state.lists[1].id) {
      state.active = 1
    }
    if (state.lists[2] && obj.id === state.lists[2].id) {
      state.active = 2
    }
  },
  [CHANGE_ACTIVE] (state, index) {
    state.active = index
  },
  [GETTREECHECKEDARR] (state, arr) {
    state.treeCheckedArr = arr
  }
}
