import { clone, read, write, reset } from './state'

const MOCK_TOKEN = 'mock-mobile-token-local-only'
const CAPTCHA = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function ok (result, message) {
  return {
    Success: true,
    success: true,
    Message: message || '',
    Status: 'Success',
    Result: typeof result === 'undefined' ? {} : result
  }
}

function fail (message, status) {
  return {
    Success: false,
    success: false,
    Message: message,
    Status: status || 'MockError',
    Result: null
  }
}

function parseData (data) {
  if (!data) return {}
  if (typeof data === 'object') return data
  try {
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

function normalizePath (url) {
  let path = String(url || '').split('?')[0]
  path = path.replace(/^https?:\/\/[^/]+/i, '')
  path = '/' + path.replace(/^\/+/, '')
  path = path.replace(/^\/mock-api\/api\//i, '/api/')
  path = path.replace(/^\/api\/api\//i, '/api/')
  path = path.replace(/^\/data\/api\//i, '/api/')
  path = path.replace(/^\/data\//i, '/api/')
  if (path.indexOf('/api/') !== 0) path = '/api/' + path.replace(/^\/+/, '')
  return path.toLowerCase().replace(/\/+$/, '')
}

function paginate (items, params) {
  const pageSize = Math.max(1, Number(params.PageSize || params.pageSize || 8))
  const pageIndex = Math.max(1, Number(params.PageIndex || params.pageIndex || 1))
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const start = (pageIndex - 1) * pageSize
  return { List: items.slice(start, start + pageSize), PageCount: pageCount, TotalCount: items.length }
}

function activityResult () {
  return {
    Active: true,
    AvailableTimes: 3,
    FreeTimes: 3,
    BetAmount: 8888,
    DepAmount: 2888,
    TotalTimes: 5,
    RankNo: 8,
    CharmCount: 12,
    Amount: 100,
    Tims: 2,
    BonusType: 'Cash bonus',
    BonusValue: 88,
    History: [],
    Rank: [],
    Historys: [],
    Count: 1,
    Code: 'MOCK88',
    Text: 'Mock reward',
    LevelNum: 50,
    LevelName: 'Gold Member',
    ProcessBar: 65,
    ShowFirst: true,
    ShowSecond: true,
    MatchName: 'Mock Match',
    MatchHome: 'Home',
    MatchCustomer: 'Away',
    MatchTime: '2026-10-01 20:00',
    LinkUrl: '#mock-activity',
    MatchHomeUrl: '',
    MatchCustomerUrl: '',
    Categorys: [],
    ExtraCategorys: []
  }
}

function addRecord (state, typeCode, type, amount, notes) {
  state.records.unshift({
    Id: state.nextId++,
    TypeCode: String(typeCode),
    CreateTime: '2026-09-30 12:00:00',
    Type: type,
    Amount: Number(amount || 0).toFixed(2),
    State: 'Success',
    Notes: notes || 'Mock operation',
    PromCode: '-',
    ValidDate: '-',
    Plat: 'ZXC',
    BetMultiple: 1
  })
}

function banners () {
  return {
    Notice: [
      { name: 'Mock mode', Name: 'Mock mode', content: 'All business data is local to this browser.', Content: 'All business data is local to this browser.' },
      { name: 'Demo account', Name: 'Demo account', content: 'Use mockuser / mock123 to sign in.', Content: 'Use mockuser / mock123 to sign in.' }
    ],
    // Empty keeps the component's bundled banner placeholder visible and avoids
    // any backend/CDN image request in the standalone build.
    Banner: []
  }
}

function platformList (state) {
  return Object.keys(state.balances).filter(item => item !== 'ZXC' && item !== 'ZXING').map((item, index) => ({
    Id: index + 1,
    Plat: item,
    PlatName: item,
    Name: item,
    GameName: item + ' Games',
    GameType: index % 4 === 0 ? 'Fish' : (index % 3 === 0 ? 'Live' : 'Slots'),
    GameCategory: index % 4 === 0 ? 'Fish' : (index % 3 === 0 ? 'Live' : 'Slots'),
    Status: true
  }))
}

function games () {
  return [
    { Id: 1, GameCode: 'mock-fortune', GameName: 'Mock Fortune', Category: 'Hot', GameCategory: 'Slots', Plat: 'PG', PicName: 'mock-fortune.jpg', ImgUrl: '', DemoUrl: '#mock-game' },
    { Id: 2, GameCode: 'mock-mahjong', GameName: 'Mock Mahjong', Category: 'Table', GameCategory: 'Slots', Plat: 'JILI', PicName: 'mock-mahjong.jpg', ImgUrl: '', DemoUrl: '#mock-game' },
    { Id: 3, GameCode: 'mock-dragon', GameName: 'Mock Dragon', Category: 'Jackpot', GameCategory: 'Slots', Plat: 'CQ9', PicName: 'mock-dragon.jpg', ImgUrl: '', DemoUrl: '#mock-game' }
  ]
}

function sidebar () {
  return [
    { MenuName: 'DAILY CHECK IN', MenuUrl: '#/center/external?routename=checkIn', IconUrl: '' },
    { MenuName: 'VIP BENEFITS', MenuUrl: '#/center/external?routename=VIPoffer', IconUrl: '' },
    { MenuName: 'LUCKY DRAW', MenuUrl: '#/center/external?routename=LuckyDrawBonus', IconUrl: '' }
  ]
}

function centerMenu () {
  return {
    CenterMenu: [
      { Code: 'feedback', Name: 'Rebate Offer', LinkUrl: '', IconUrl: '' },
      { Code: 'checkIn', Name: 'Daily Check In', LinkUrl: '', IconUrl: '' },
      { Code: 'VIPoffer', Name: 'VIP Benefits', LinkUrl: '', IconUrl: '' }
    ],
    TopMenu: [
      { Code: 'promotion', Name: 'Mock Promotion', LinkUrl: '', IconUrl: '' }
    ]
  }
}

function loginResult (state, params) {
  const account = params.Account || params.UserName || params.account || 'mockuser'
  state.user.Account = account
  write(state)
  return ok({ Token: MOCK_TOKEN, Balance: state.balances.ZXC, LastLoginTime: '2026-09-30 10:00:00' }, 'Login successful')
}

function handle (config) {
  const path = normalizePath(config.url)
  const params = Object.assign({}, config.params || {}, parseData(config.data))
  const state = read()

  if (path === '/api/other/check') return ok({ Status: 200, IP: '127.0.0.1', Scode: params.SCode || 'MOCK', Limit: 0 })
  if (path === '/api/other/qq') return '84071236'
  if (path === '/api/bannernotice/get' || path === '/api/banner/get') return ok(banners())
  if (path === '/api/popup/dialog') return ok({ Popup: { Bit: false, PromoUrl: '' }, Redpkg: { Bit: false, Msg: '', Amount: '0.00' }, Toasts: [] })
  if (path === '/api/reg/vcode') return ok({ Img: CAPTCHA, Key: 'mock-captcha-key' })
  // Axios parses one JSON layer before the legacy page calls JSON.parse again.
  if (path === '/api/geetest/initgeetest') return JSON.stringify(JSON.stringify({ success: 0, gt: 'mock-gt', challenge: 'mock-challenge', new_captcha: true }))

  const loginPaths = [
    '/api/login/login', '/api/login/loginbyslidepicture', '/api/login/ipdifflogincheckcode',
    '/api/login/fbloginbyslidepicture'
  ]
  if (loginPaths.indexOf(path) >= 0) return loginResult(state, params)
  if (path === '/api/login/fbloginstep3') {
    const response = loginResult(state, params)
    response.Message = JSON.stringify({ name: 'Mock Player', email: 'mock@example.com', id: 'mock-fb-id' })
    response.UserName = state.user.Account
    response.isReg = true
    return response
  }
  if (path === '/api/login/ipdifflogincheckcode1step') return ok({ cellPhone: state.user.CellPhone })
  if (/^\/api\/login\/[^/]+$/.test(path)) return ok('#mock-game', 'Mock mode does not open a real game provider')

  const registerPaths = [
    '/api/reg/phone', '/api/reg/username', '/api/reg/usernamebyslidepicture',
    '/api/reg/accountbygeetest', '/api/register/fbregister'
  ]
  if (registerPaths.indexOf(path) >= 0) return loginResult(state, params)
  if (path.indexOf('/api/sendsmscode/') === 0 || path.indexOf('/api/sendemailcode/') === 0 || path === '/api/recaptchav3/sendcode') {
    return ok({ VCode: '123456' }, 'Verification code: 123456')
  }
  if (path === '/api/forgotpwd/step1' || path === '/api/forgotpwd/step1bygeetest' || path === '/api/account/unbind') {
    return ok({ Token: 'mock-reset-token', QAData: [{ Question: 'Mock security question 1?' }, { Question: 'Mock security question 2?' }] })
  }
  if (path.indexOf('/api/forgotpwd/') === 0 || path === '/api/account/unbindverify' || path === '/api/account/emailauth') {
    return ok({ VCode: '123456' }, 'Verification successful')
  }

  if (path === '/api/account/getinfo') {
    state.user.Balance = Number(state.balances.ZXC).toFixed(2)
    return ok(clone(state.user))
  }
  if (path === '/api/account/saveinfo') {
    Object.keys(params).forEach(key => { state.user[key] = params[key] })
    write(state)
    return ok(clone(state.user), 'Profile updated')
  }
  if (path === '/api/account/verifyrealname') {
    state.user.RealName = params.RealName || params.Name || state.user.RealName
    state.user.VerifyRealName = state.user.RealName
    write(state)
    return ok(state.user.VerifyRealName, 'Identity verified')
  }
  if (path === '/api/account/verifyphone') {
    state.user.Phone = params.Phone || params.CellPhone || state.user.Phone
    state.user.VerifyPhone = state.user.Phone
    write(state)
    return ok(state.user.VerifyPhone, 'Phone verified')
  }
  if (path === '/api/account/verifyemail') {
    state.user.Email = params.Email || state.user.Email
    state.user.VerifyEmail = state.user.Email
    write(state)
    return ok(state.user.VerifyEmail, 'Email verified')
  }
  if (path === '/api/account/checkverifyphone') return ok({ Status: Boolean(state.user.VerifyPhone) })
  if (path === '/api/account/modifyuserpwd' || path === '/api/account/savesafequestanswer' || path === '/api/account/createplatpwd') return ok({}, 'Saved')

  if (path === '/api/other/getavatar') return ok([1, 2, 3, 4, 5, 6].map(item => ({ Id: item, Key: item, Avatar: item, value: '' })))
  if (path === '/api/other/saveavatar') {
    state.user.Avatar = Number(params.Avatar || params.Key || params.Id || 1)
    write(state)
    return ok(state.user.Avatar, 'Avatar updated')
  }
  if (path === '/api/mobile/getsidebar') return ok(sidebar())
  if (path === '/api/mobile/getcentermenu') return ok(centerMenu())

  if (path === '/api/balance/get') {
    const plat = String(params.Plat || 'ZXC').toUpperCase()
    return ok(Number(state.balances[plat] || 0).toFixed(2))
  }
  if (path === '/api/gameplat/get' || path === '/api/gameplat/homeplat') return ok(platformList(state))
  if (path === '/api/transfer/post') {
    const from = String(params.FromPlat || params.OutPlat || params.OutGame || params.From || 'ZXC').toUpperCase()
    const to = String(params.ToPlat || params.InPlat || params.InGame || params.To || 'PG').toUpperCase()
    const amount = Number(params.Amount || 0)
    if (amount <= 0 || Number(state.balances[from] || 0) < amount) return fail('Invalid amount or insufficient balance', 'BalanceError')
    state.balances[from] -= amount
    state.balances[to] = Number(state.balances[to] || 0) + amount
    addRecord(state, 3, from + ' → ' + to, amount, 'Mock transfer')
    write(state)
    return ok({}, 'Transfer successful')
  }
  if (path === '/api/transfer/all') {
    Object.keys(state.balances).forEach(plat => {
      if (plat !== 'ZXC' && plat !== 'ZXING') {
        state.balances.ZXC += Number(state.balances[plat] || 0)
        state.balances[plat] = 0
      }
    })
    write(state)
    return ok({}, 'All balances collected')
  }

  if (path === '/api/message/getlist') {
    const page = paginate(state.messages, params)
    return ok({ List: page.List, Data: page.List, PageCount: page.PageCount, TotalCount: page.TotalCount })
  }
  if (/^\/api\/message\/get\/\d+$/.test(path)) {
    const id = Number(path.split('/').pop())
    const message = state.messages.find(item => Number(item.Id) === id)
    if (!message) return fail('Message not found', 'NotFound')
    message.IsRead = true
    write(state)
    return ok(clone(message))
  }
  if (path === '/api/toast/message') return ok({ Title: 'Mock notice', Time: '2026-09-30 12:00:00', Content: 'This is a local notification.' })
  if (path === '/api/toast/check') return ok(false)

  if (/^\/api\/slots\/[^/]+$/.test(path)) {
    let filtered = games()
    const category = String(params.Category || '').toLowerCase()
    const search = String(params.GameName || '').toLowerCase()
    if (category) filtered = filtered.filter(item => item.Category.toLowerCase().indexOf(category) >= 0)
    if (search) filtered = filtered.filter(item => item.GameName.toLowerCase().indexOf(search) >= 0)
    const page = paginate(filtered, params)
    return ok({ Category: [{ Code: '', Name: 'All' }, { Code: 'Hot', Name: 'Hot' }, { Code: 'Table', Name: 'Table' }], PageCount: page.PageCount, Data: page.List, List: page.List, Status: 'Logged' })
  }
  if (/^\/api\/(slots|live|fish|sports|lotto)\/[^/]+(login)?$/.test(path)) return ok('#mock-game', 'Mock mode does not open a real game provider')
  if (path === '/api/promo/list') {
    const list = [{ Id: 1, Title: 'Mock Welcome Bonus', Summary: 'Front-end demo only', Pic: '', Url: '#mock-promo' }]
    return ok({ Category: [{ Id: 1, Name: 'All Promotions' }], Data: list, List: list, PageCount: 1 })
  }

  if (path === '/api/withdrawal/getdrawcard') return ok({ Data: clone(state.cards), List: clone(state.cards), Name: state.user.Name, BankList: ['Mock Bank', 'Demo Bank'] })
  if (path === '/api/withdrawal/getvirtualacc') return ok({ Data: clone(state.wallets), List: clone(state.wallets), Name: state.user.Name, BankList: [] })
  if (path === '/api/withdrawal/binddrawcard') {
    state.cards.push({ Id: 'card-' + state.nextId++, BankName: params.BankName || 'Mock Bank', CardNumber: params.BankCardNo, BankCardNo: params.BankCardNo, Branch: params.Branch, Name: params.Name || state.user.Name })
    write(state)
    return ok({}, 'Bank card added')
  }
  if (path === '/api/withdrawal/bindvirtualwallet') {
    state.wallets.push({ Id: 'wallet-' + state.nextId++, ChainName: params.chainname || params.ChainName, chainname: params.chainname || params.ChainName, WalletAddr: params.walletaddr || params.WalletAddr, walletaddr: params.walletaddr || params.WalletAddr, Exange: params.Exange })
    write(state)
    return ok({}, 'Wallet added')
  }
  if (path === '/api/withdrawal/getinfo') return ok({ BankCards: clone(state.cards), RemainDrawCount: 3, MaxLimit: '50,000.00', MinLimit: '100.00', DrawCount: '5', DrawSum: '100,000.00', RemainDrawSum: '80,000.00', Balance: Number(state.balances.ZXC).toFixed(2) })
  if (path === '/api/withdrawal/withdraw' || path === '/api/withdrawal/usdtwithdraw') {
    const amount = Number(params.Amount || params.CNY || 0)
    if (amount <= 0 || state.balances.ZXC < amount) return fail('Invalid amount or insufficient balance', 'BalanceError')
    state.balances.ZXC -= amount
    addRecord(state, 2, path.indexOf('usdt') >= 0 ? 'USDT withdrawal' : 'Bank withdrawal', amount, 'Mock withdrawal')
    write(state)
    return ok({}, 'Withdrawal request submitted')
  }

  if (path === '/api/deposit/getrechargetype') {
    return ok({
      Methods: [
        { TypeCode: 'onlineTransfer', Name: 'Online Transfer', GroupList: [], TransferPropety: { BankNames: ['Mock Bank'], MinAmount: 100, MaxAmount: 50000 } },
        { TypeCode: 'usdtTransfer', Name: 'USDT Transfer', GroupList: [], TransferPropety: { BankNames: ['TRC20'], MinAmount: 20, MaxAmount: 8000 } }
      ],
      DepositUrl: []
    })
  }
  if (path === '/api/deposit/getusdtrate') return ok({ Rate: 7.2 })
  if (path === '/api/deposit/getwechatrate') return ok({ Rate: 1 })
  if (path === '/api/deposit/createorder' || path === '/api/deposit/createusdtorder') {
    const amount = Number(params.Amount || params.CNY || 1000)
    addRecord(state, 1, 'Mock deposit', amount, 'Local demo order')
    write(state)
    return ok({ ID: state.nextId++, BankName: 'Mock Bank', Name: 'Mock Receiver', CardNumber: '6222 0000 0000 8888', WalletAddr: 'TMockDepositAddress111111111111111', ChainName: 'TRC20', Amount: amount, Code: 'MOCK' + state.nextId })
  }
  if (path === '/api/deposit/createolorder') return ok('#mock-payment', 'Mock mode does not open a real payment provider')
  if (path === '/api/deposit/wechatpaysk') return ok({ QRCode: 'MOCK-QR-CODE', Amount: Number(params.Amount || 100) })
  if (path === '/api/deposit/getproceed') return ok({ BankName: 'Mock Bank', Name: 'Mock Receiver', CardNumber: '6222 0000 0000 8888', Amount: Number(params.Amount || 1000), Code: 'MOCK88' })

  if (path === '/api/record/get') {
    let items = state.records.slice()
    if (typeof params.Type !== 'undefined' && params.Type !== '') items = items.filter(item => String(item.TypeCode) === String(params.Type))
    const search = String(params.Keyword || params.Search || '').toLowerCase()
    if (search) items = items.filter(item => JSON.stringify(item).toLowerCase().indexOf(search) >= 0)
    const page = paginate(items, params)
    return ok({ List: page.List, Data: page.List, PageCount: page.PageCount, TotalCount: page.TotalCount })
  }
  if (path === '/api/batstat/get') return ok({ TotalDepAmount: '10,000.00', TotalBetAmount: '8,888.00', TableList: [{ Plat: 'PG', BetAmount: '5,000.00', ValidBetAmount: '4,500.00' }] })
  if (path === '/api/backwater/info') return ok({ Categorys: [{ Id: 1, Name: 'Slots rebate', Amount: 18.8 }], ExtraCategorys: [{ Id: 2, Name: 'Extra rebate', Amount: 8.8 }] })
  if (path === '/api/backwater/get' || path === '/api/backwater/extra') return ok({}, 'Claimed')

  if (path === '/api/vip/freeinfo' || path === '/api/vip/forwardinfo' || path === '/api/vip/feedinfo') return ok({ Categorys: [{ Id: 1, Name: 'Mock VIP reward', Amount: 88, CanGet: true }] })
  if (path === '/api/vip/info') return ok(activityResult())
  if (path === '/api/self/chipdata') return ok({ Integral: state.user.Integral, Products: [{ Id: 1, Name: '188 Mock Chips', Amount: 188, Integral: 12933, Price: 12933 }] })
  if (path === '/api/self/slotsget' || path === '/api/self/slotsdata') return ok({ List: [], Data: [], PageCount: 1, Categorys: [] })
  if (path === '/api/brandday/top50list') return ok([{ Rank: 1, Account: 'mock***', BetAmount: 88888, Amount: 888 }, { Rank: 2, Account: 'demo***', BetAmount: 66666, Amount: 666 }])

  if (path === '/api/freedraw/info') return ok(Object.assign(activityResult(), { FreeTimes: 3, TotalTimes: 3 }))
  if (path === '/api/freedraw/winnerlist') return ok([{ Account: 'mock***', PrizeAmount: 88, CreateTime: '2026-09-30 12:00:00' }])
  if (path === '/api/freedraw/history') return ok([{ PrizeAmount: 88, CreateTime: '2026-09-30 12:00:00' }])
  if (path === '/api/freedraw/freespins') return ok([{ PrizeAmount: 88 }], 'Mock prize awarded')
  if (path === '/api/freedraw/getbonus') return ok(activityResult(), 'Mock bonus claimed')

  const infoPaths = [
    '/api/allplatbet/info', '/api/betmatch/info', '/api/carnival/info', '/api/charmtree/info',
    '/api/depsign/info', '/api/fightsport/info', '/api/flashsale/info', '/api/nba/info',
    '/api/ogexpegold/info', '/api/policy/info', '/api/signin/info', '/api/zodiac/info',
    '/api/loverelay/info', '/api/europeancup/info'
  ]
  if (infoPaths.indexOf(path) >= 0) return ok(activityResult())

  const historyPaths = ['/api/charmtree/history', '/api/charmtree/rank', '/api/fightsport/history', '/api/fightsport/poolhistory', '/api/fightsport/rank', '/api/zodiac/history']
  if (historyPaths.indexOf(path) >= 0) return ok([{ Id: 1, Account: 'mock***', Amount: 88, Time: '2026-09-30 12:00:00', Rank: 1 }])

  const actionPaths = [
    '/api/allplatbet/get', '/api/betmatch/forward', '/api/callback/post', '/api/carnival/bet',
    '/api/carnival/dep', '/api/charmtree/extchange', '/api/charmtree/refresh', '/api/charmtree/shake',
    '/api/depsign/get', '/api/fightsport/apply', '/api/fightsport/change', '/api/fightsport/open',
    '/api/fightsport/pool', '/api/fightsport/refresh', '/api/firstdepositpromo/firstdepositpromostep1',
    '/api/firstdepositpromo/firstdepositpromostep2', '/api/flashsale/getfirst', '/api/flashsale/getsecond',
    '/api/loverelay/getbonus', '/api/loverelay/turnplate', '/api/nba/apply', '/api/newitem/getbonus',
    '/api/ogexpegold/get', '/api/self/chipcash', '/api/signin/signin', '/api/unionpay/apply',
    '/api/vip/feedget', '/api/vip/forwardget', '/api/vip/freeget', '/api/vip/lucky',
    '/api/vip/rotate', '/api/zodiac/apply'
  ]
  if (actionPaths.indexOf(path) >= 0) {
    state.claims[path] = Number(state.claims[path] || 0) + 1
    write(state)
    return ok(Object.assign(activityResult(), { Code: 'MOCK-' + state.claims[path] }), 'Mock operation successful')
  }

  const error = new Error('[Mock API] Unhandled request: ' + String(config.method || 'get').toUpperCase() + ' ' + path)
  error.code = 'MOCK_NOT_IMPLEMENTED'
  error.response = {
    status: 501,
    statusText: 'Mock Not Implemented',
    data: fail(error.message, 'MOCK_NOT_IMPLEMENTED'),
    headers: { 'x-mock-api': 'true' },
    config: config
  }
  console.error(error.message)
  throw error
}

function createMockAdapter () {
  const delay = Math.max(0, Number(process.env.WEB_MOCK_DELAY || 0))
  return function mockAdapter (config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({
            data: clone(handle(config)),
            status: 200,
            statusText: 'OK',
            headers: { 'x-mock-api': 'true' },
            config: config,
            request: { mock: true }
          })
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

function installGeetestShim () {
  if (typeof window === 'undefined') return
  window.initGeetest = function (config, callback) {
    let readyHandler = function () {}
    let successHandler = function () {}
    const captcha = {
      onReady: function (handler) { readyHandler = handler; setTimeout(readyHandler, 0); return captcha },
      onSuccess: function (handler) { successHandler = handler; return captcha },
      onError: function () { return captcha },
      onClose: function () { return captcha },
      verify: function () { setTimeout(successHandler, 0) },
      reset: function () {},
      getValidate: function () { return { geetest_seccode: 'mock|jordan', geetest_validate: 'mock-validate', geetest_challenge: 'mock-challenge' } }
    }
    callback(captcha)
  }
}

function installMockApi (axios) {
  axios.defaults.adapter = createMockAdapter()
  axios.defaults.baseURL = '/mock-api'
  installGeetestShim()
  if (typeof window !== 'undefined') {
    window.__WEB_ZXC_MOCK__ = {
      enabled: true,
      reset: function () {
        const state = reset()
        console.info('[Mock API] Data reset. Reload the page to restore the initial UI.')
        return state
      },
      state: function () { return clone(read()) }
    }
  }
  console.info('[Mock API] Enabled. Axios cannot reach the real backend.')
}

export { createMockAdapter, installMockApi, handle, normalizePath }
