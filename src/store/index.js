import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  treeCheckedArr: [],
  tree: [
    {
    id: 0,
    name: '我的首页',
    route: '/workstack',
  }, {
    id: 1,
    name: '用户管理',
    route: '/workstack/usermana',
  }, {
    id: 2,
    name: '系统架构',
    route: '/workstack/sysarc'
  }, {
    id: 3,
    name: '工程设置',
  //  route: '/workstack/settings',
    children: [{
      id: 4,
      name: '分类设置',
      route: '/workstack/settings/taxonomy',
    }, {
      id: 5,
      name: '工程执行',
      route: '/workstack/settings',
    },
     {
      id: 6,
      name: '工程设计',
      route: '/workstack/settings/engDesign',

    },
     {
      id: 7,
      name: '工程审批',
      route: '/workstack/settings/engApproval',
    }, {
      id: 8,
      name: '工程管理',
      route: '/workstack/settings',
    }
    ]
  },
  {
    id:9,
    name:'系统设置',
    children:[
      {
        id:10,
        name:'核心设置',
        route:'/workstack/SysConfig/CoreConfig',
      },
      {
        id:11,
        name:'访问控制',
        route:'/workstack/SysConfig/CoreConfig',
      },
      {
        id:12,
        name:'安全设置',
        route:'/workstack/SysConfig/CoreConfig',
      },
      {
        id:13,
        name:'系统账套',
        route:'/workstack/SysConfig/CoreConfig',
      },
    ]
  }
],
  lists: [{
    id: 0,
    name: '我的首页',
    route: '/workstack'
  }],
  active: 0,
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
