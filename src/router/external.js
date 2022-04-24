import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/VIPoffer',
      name: 'VIPoffer',
      component: (resolve) => require(['@/components/External/VIPoffer/VIPoffer.vue'], resolve)
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: (resolve) => require(['@/components/External/Feedback/feedback.vue'], resolve)
    },
    {
      path: '/selfHelp',
      name: 'selfHelp',
      component: (resolve) => require(['@/components/External/SelfHelp/selfHelp.vue'], resolve)
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: (resolve) => require(['@/components/External/SelfHelp/exchange.vue'], resolve)
    },
    {
      path: '/call',
      name: 'call',
      component: (resolve) => require(['@/components/External/Callback/callback.vue'], resolve)
    },
    {
      path: '/promotionInfo',
      name: 'promotionInfo',
      component: (resolve) => require(['@/components/External/PromotionInfo/promotion-Info.vue'], resolve)
    },
    // 活动页
    // VIP会员
    {
      path: '/VIPmember',
      name: 'VIPmember',
      component: (resolve) => require(['@/components/External/Activity/VIPmember/VIPmember.vue'], resolve)
    },
    // 成就系统
    // {
    //   path: '/achievement',
    //   name: 'achievement',
    //   component: (resolve) => require(['@/components/External/Activity/Achievement/achievement.vue'], resolve)
    // },
    // 嘉年华
    {
      path: '/carnivals',
      name: 'carnivals',
      component: (resolve) => require(['@/components/External/Activity/Carnivals/carnivals.vue'], resolve)
    },
    // 体育保单
    {
      path: '/sportspolicy',
      name: 'sportspolicy',
      component: (resolve) => require(['@/components/External/Activity/SportsPolicy/sportspolicy.vue'], resolve)
    },
    // 助力欧洲杯
    {
      path: '/AISportFreeMatch2',
      name: 'AISportFreeMatch2',
      component: (resolve) => require(['@/components/External/Activity/EuroCup2020/EuroCup2020.vue'], resolve)
    },
    { // 元旦转盘
      path: '/zodiac',
      name: 'zodiac',
      component: (resolve) => require(['@/components/External/Activity/ZodiacRotate/zodiac.vue'], resolve)
    },
    // NBA幸运8+8
    {
      path: '/competitionnba',
      name: 'competitionnba',
      component: (resolve) => require(['@/components/External/Activity/Competitionnba/competitionnba.vue'], resolve)
    },
    // 限时大酬宾
    {
      path: '/flashsale',
      name: 'flashsale',
      component: (resolve) => require(['@/components/External/Activity/FlashSale/flashsale.vue'], resolve)
    },
    // OG
    {
      path: '/ogexpegold',
      name: 'ogexpegold',
      component: (resolve) => require(['@/components/External/Activity/OgExpeGold/ogexpegold.vue'], resolve)
    },
    // 爱心接力
    {
      path: '/loverelay',
      name: 'loverelay',
      component: (resolve) => require(['@/components/External/Activity/Loverelay/Loverelay.vue'], resolve)
    },
    // 众鑫流水王
    {
      path: '/betrecordking',
      name: 'betrecordking',
      component: (resolve) => require(['@/components/External/Activity/BetRecordKing/betrecordking.vue'], resolve)
    },
    // 再战绿茵
    {
      path: '/footballreback',
      name: 'footballreback',
      component: (resolve) => require(['@/components/External/Activity/FootballReback/FootballReback.vue'], resolve)
    },
    // 彩票大狂欢
    {
      path: '/lotterycarnival',
      name: 'lotterycarnival',
      component: (resolve) => require(['@/components/External/Activity/LotteryCarnival/LotteryCarnival.vue'], resolve)
    },
    // 六月激情赛场
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
    },
    // Iphone 12
    // {
    //   path: '/iphone12',
    //   name: 'iphone12',
    //   component: (resolve) => require(['@/components/External/Activity/Iphone12/Iphone12.vue'], resolve)
    // },
    // 百家乐注单奖励
    // {
    //   path: '/baccaratZDJL',
    //   name: 'baccaratZDJL',
    //   component: (resolve) => require(['@/components/External/Activity/BaccaratZDJL/BaccaratZDJL.vue'], resolve)
    // },
    { // 奖池瓜分活动
      path: '/kgjuejin',
      name: 'kgjuejin',
      component: (resolve) => require(['@/components/External/Activity/Kgjuejin/Kgjuejin.vue'], resolve)
    },
    { // LB周周返现，最高返现11888元!
      path: '/lBweekstake',
      name: 'lBweekstake',
      component: (resolve) => require(['@/components/External/Activity/LBweekstake/LBweekstake.vue'], resolve)
    },
    { // 首存豪礼
      path: '/firstDeposit',
      name: 'firstDeposit',
      component: (resolve) => require(['@/components/External/Activity/FirstDeposit/FirstDeposit.vue'], resolve)
    },
    // 签到吧兄弟
    {
      path: '/signinbrother',
      name: 'signinbrother',
      component: (resolve) => require(['@/components/External/Activity/SignInBrother/SignInBrother.vue'], resolve)
    },
    { // 虛擬幣免費體驗金
      path: '/USDTexperience',
      name: 'USDTexperience',
      component: (resolve) => require(['@/components/External/Activity/USDTexperience/USDTexperience.vue'], resolve)
    }
  ]
})
