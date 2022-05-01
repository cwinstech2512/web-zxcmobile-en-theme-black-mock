import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login.vue'
import Center from '@/components/Center/center.vue'
import Error from '@/components/Center/Common/errorinfo.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // 登录页
    {
      path: '/',
      name: 'home',
      // component: Login,
      redirect: { name: 'v_home' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forget',
      name: 'forget',
      component: (resolve) => require(['@/components/Login/forget.vue'], resolve)
    },
    {
      path: '/rule',
      name: 'rule',
      component: (resolve) => require(['@/components/Login/rule.vue'], resolve)
    },
    // 主页
    {
      path: '/center',
      name: 'center',
      component: Center,
      children: [
        {
          path: 'external',
          name: 'external',
          component: (resolve) => require(['@/components/External/external.vue'], resolve)
        },
        {
          path: 'home',
          name: 'home',
          component: (resolve) => require(['@/components/Center/Home/home.vue'], resolve)
        },
        {
          path: 'wallet',
          name: 'wallet',
          component: (resolve) => require(['@/components/Center/Wallet/wallet.vue'], resolve)
        },
        {
          path: 'usdtWallet',
          name: 'usdtWallet',
          component: (resolve) => require(['@/components/Center/Wallet/usdtWallet.vue'], resolve)
        },
        {
          path: 'service',
          name: 'service',
          component: (resolve) => require(['@/components/Center/Service/service.vue'], resolve)
        },
        {
          path: 'promotion',
          name: 'promotion',
          component: (resolve) => require(['@/components/Center/Promotion/promotion.vue'], resolve)
        },
        {
          path: 'user',
          name: 'user',
          component: (resolve) => require(['@/components/Center/User/user.vue'], resolve)
        },
        {
          path: 'depositInfo',
          name: 'depositInfo',
          component: (resolve) => require(['@/components/Center/Wallet/DepositInfo/deposit-info.vue'], resolve)
        },
        {
          path: 'depositInfoTransferOut',
          name: 'depositInfoTransferOut',
          component: (resolve) => require(['@/components/Center/Wallet/DepositInfo/deposit-info-usdtTransferOut.vue'], resolve)
        },
        {
          path: 'message',
          name: 'message',
          component: (resolve) => require(['@/components/Center/User/Message/message.vue'], resolve)
        },
        {
          path: 'messageInfo',
          name: 'messageInfo',
          component: (resolve) => require(['@/components/Center/User/Message/message-Info.vue'], resolve)
        },
        {
          path: 'information',
          name: 'information',
          component: (resolve) => require(['@/components/Center/User/Information/information.vue'], resolve)
        },
        {
          path: 'password',
          name: 'password',
          component: (resolve) => require(['@/components/Center/User/Information/information-password.vue'], resolve)
        },
        {
          path: 'security',
          name: 'security',
          component: (resolve) => require(['@/components/Center/User/Information/information-security.vue'], resolve)
        },
        {
          path: 'phone',
          name: 'phone',
          component: (resolve) => require(['@/components/Center/User/user-phone.vue'], resolve)
        },
        {
          path: 'email',
          name: 'email',
          component: (resolve) => require(['@/components/Center/User/user-email.vue'], resolve)
        },
        {
          path: 'betting',
          name: 'betting',
          component: (resolve) => require(['@/components/Center/User/user-betting.vue'], resolve)
        },
        {
          path: 'transaction',
          name: 'transaction',
          component: (resolve) => require(['@/components/Center/User/Transaction/transaction.vue'], resolve)
        },
        {
          path: 'platform',
          name: 'platform',
          component: (resolve) => require(['@/components/Center/User/user-platform.vue'], resolve)
        },
        {
          path: 'select',
          name: 'select',
          component: (resolve) => require(['@/components/Center/User/user-select.vue'], resolve)
        },
        {
          path: 'bankCard',
          name: 'bankCard',
          component: (resolve) => require(['@/components/Center/User/user-bankCard.vue'], resolve)
        },
        {
          path: 'virtualWallet',
          name: 'virtualWallet',
          component: (resolve) => require(['@/components/Center/User/user-virtualWallet.vue'], resolve)
        },
        {
          path: 'bankCardAdd',
          name: 'bankCardAdd',
          component: (resolve) => require(['@/components/Center/User/user-bankCard-add.vue'], resolve)
        },
        {
          path: 'virtualWalletAdd',
          name: 'virtualWalletAdd',
          component: (resolve) => require(['@/components/Center/User/user-virtualWallet-add.vue'], resolve)
        },
        {
          path: 'gameinfo',
          name: 'gameinfo',
          component: (resolve) => require(['@/components/Center/Home/home-game-info.vue'], resolve)
        }
      ]
    },
    // 游客路由路径
    {
      path: '/visitor',
      name: 'visitor',
      component: (resolve) => require(['@/components/Visitor/visitor.vue'], resolve),
      children: [
        {
          path: 'v_home',
          name: 'v_home',
          component: (resolve) => require(['@/components/Visitor/V-Home/V-home.vue'], resolve)
        },
        {
          path: 'v_promotion',
          name: 'v_promotion',
          component: (resolve) => require(['@/components/Visitor/V-Promotion/V-promotion.vue'], resolve)
        },
        {
          path: 'v_promotionInfo',
          name: 'v_promotionInfo',
          component: (resolve) => require(['@/components/Visitor/V-Promotion/V-promotion-Info.vue'], resolve)
        },
        // 游客活动页
        {
          path: 'v_activity',
          name: 'v_activity',
          component: (resolve) => require(['@/components/Visitor/V-Common/V-activity.vue'], resolve),
          children: [
            // 嘉年华
            {
              path: 'carnivals',
              name: 'carnivals',
              component: (resolve) => require(['@/components/External/Activity/Carnivals/carnivals.vue'], resolve)
            }
          ]
        }

      ]
    },
    {
      path: '*',
      name: 'Errorinfo',
      component: Error
    }
  ]
})
// 404错误页
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/errorinfo') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next() // 如果匹配到正确跳转
  }
})
// 偶尔出现Loading chunk {n} failed的报错
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
export default router
