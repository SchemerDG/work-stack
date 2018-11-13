import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: r => require.ensure([], () => r(require('../components/pages/login/login')), 'login')
    },
    {
      path: '/workstack',
      name: 'workstack',
      component: r => require.ensure([], () => r(require('../components/pages/workstack/workstack')), 'workstack'),
      children: [
        {
          path: '',
          name: 'home',
          component: r => require.ensure([], () => r(require('../components/comment/home/index')), 'home')
        },
        {
          path: 'settings',
          name: 'settings',
          component: r => require.ensure([], () => r(require('../components/comment/Settings/index')), 'settings'),
          children: [
            {
              path: 'taxonomy',
              name: 'taxonomy',
              component: r => require.ensure([], () => r(require('../components/comment/Settings/taxonomy')), 'taxonomy')
            },
            // {
            //   path: 'prodesign',
            //   name: 'prodesign',
            //   component: r => require.ensure([], () => r(require('../components/comment/Settings/proDesign')), 'proDesign')
            // },
            {
              path: 'engDesign',
              name: 'engDesign',
              component: r => require.ensure([], () => r(require('../components/comment/Settings/engDesign')), 'engDesign')
            },
            {
              path: 'engApproval',
              name: 'engApproval',
              component: r => require.ensure([], () => r(require('../components/comment/Settings/engApproval')), 'engApproval')
            },
          ]
        },
        {
          path: 'sysarc',
          name: 'sysarc',
          component: r => require.ensure([], () => r(require('../components/comment/SysArc/index')), 'sysarc')
        },
        {
          path: 'usermana',
          name: 'usermana',
          component: r => require.ensure([], () => r(require('../components/comment/UserMana/index')), 'usermana')
        },
        {
          path: 'SysConfig',
          name: 'SysConfig',
          component: r => require.ensure([], () => r(require('../components/comment/SysConfig/index')), 'SysConfig'),
          children: [
            {
              path: 'CoreConfig',
              name: 'CoreConfig',
              component: r => require.ensure([], () => r(require('../components/comment/SysConfig/CoreConfig')), 'CoreConfig')
            },
            {
              path: 'VisitControl',
              name: 'VisitControl',
              component: r => require.ensure([], () => r(require('../components/comment/SysConfig/VisitControl')), 'VisitControl')
            },
            {
              path: 'SafeConfig',
              name: 'SafeConfig',
              component: r => require.ensure([], () => r(require('../components/comment/SysConfig/SafeConfig')), 'SafeConfig')
            },

          ]
        },
      ]
    }
  ],
}
)
