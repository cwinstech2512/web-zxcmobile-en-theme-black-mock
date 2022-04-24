import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/actPopup',
      name: 'actPopup',
      component: (resolve) => require(['@/components/External/Popup/popup-activity.vue'], resolve)
    },
    {
      path: '/redPopup',
      name: 'redPopup',
      component: (resolve) => require(['@/components/External/Popup/popup-red.vue'], resolve)
    },
    {
      path: '/footballreback',
      name: 'footballreback',
      component: (resolve) => require(['@/components/External/Activity/FootballReback/FootballReback.vue'], resolve)
    },
    {
      path: '/junepassion',
      name: 'junepassion',
      component: (resolve) => require(['@/components/External/Activity/JunePassion/JunePassion.vue'], resolve)
    },
    // 全平台流水大作战
    {
      path: '/recordfightall',
      name: 'recordfightall',
      component: (resolve) => require(['@/components/External/Activity/RecordFightAll/RecordFightAll.vue'], resolve)
    }
    // 签到吧兄弟
    // {
    //   path: '/signinbrother',
    //   name: 'signinbrother',
    //   component: (resolve) => require(['@/components/External/Activity/SignInBrother/SignInBrother.vue'], resolve)
    // }
  ]
})
