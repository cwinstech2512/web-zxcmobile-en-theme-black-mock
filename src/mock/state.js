const STORAGE_KEY = 'web_zxcmobile_en_theme_black_mock_state_v1'

function initialState () {
  return {
    version: 1,
    nextId: 100,
    user: {
      Account: 'mockuser',
      Name: 'Mock Player',
      RealName: 'Mock Player',
      VerifyRealName: 'Mock Player',
      NickName: 'Mock Player',
      Phone: '0912345678',
      VerifyPhone: '0912345678',
      VerifyEmail: 'mock@example.com',
      Email: 'mock@example.com',
      CellPhone: '0912345678',
      QQ: '12345678',
      VipName: 'GOLD MEMBER',
      VipLevel: 50,
      VipFlag: true,
      BirthDay: '1990-01-01',
      Birthday: '1990-01-01',
      Gender: '1',
      Sex: 'M',
      Integral: 18888,
      Avatar: 1,
      UnbindMsg: '',
      UnbindToken: 'mock-unbind-token',
      Balance: '12,500.00'
    },
    balances: {
      ZXC: 12500,
      ZXING: 680,
      JILI: 128,
      PG: 156,
      CQ9: 320,
      AE: 88,
      KA: 45,
      JDB: 210,
      RICH88: 66,
      FC: 36,
      BNG: 72,
      EVO: 95
    },
    cards: [
      { Id: 'card-1', BankName: 'Mock Bank', CardNumber: '6222 **** **** 8888', BankCardNo: '6222 **** **** 8888', Branch: 'Demo Branch', Name: 'Mock Player' }
    ],
    wallets: [
      { Id: 'wallet-1', ChainName: 'TRC20', chainname: 'TRC20', WalletAddr: 'TMockWalletAddress11111111111111111', walletaddr: 'TMockWalletAddress11111111111111111', Exange: 'Mock Exchange' }
    ],
    messages: [
      { Id: 1, Title: 'Welcome to Mock mode', Time: '2026-09-30 10:00:00', CreateTime: '2026-09-30 10:00:00', Content: 'All business data is stored in this browser. No backend connection is required.', IsRead: false },
      { Id: 2, Title: 'Reset local data', Time: '2026-09-29 09:30:00', CreateTime: '2026-09-29 09:30:00', Content: 'Run window.__WEB_ZXC_MOCK__.reset() in DevTools.', IsRead: true }
    ],
    records: [
      { Id: 1, TypeCode: '1', CreateTime: '2026-09-29 12:10:00', Type: 'Online transfer', Amount: '1,000.00', State: 'Success', Notes: 'Mock deposit', PromCode: '-', ValidDate: '-', Plat: 'ZXC', BetMultiple: 1 },
      { Id: 2, TypeCode: '2', CreateTime: '2026-09-28 15:45:00', Type: 'Bank withdrawal', Amount: '500.00', State: 'Success', Notes: 'Mock withdrawal', PromCode: '-', ValidDate: '-', Plat: 'ZXC', BetMultiple: 1 },
      { Id: 3, TypeCode: '3', CreateTime: '2026-09-27 18:20:00', Type: 'ZXC → PG', Amount: '200.00', State: 'Success', Notes: 'Mock transfer', PromCode: '-', ValidDate: '-', Plat: 'PG', BetMultiple: 1 },
      { Id: 4, TypeCode: '4', CreateTime: '2026-09-26 08:00:00', Type: 'Promotion', Amount: '88.00', State: 'Claimed', Notes: 'Mock daily reward', PromCode: 'MOCK88', ValidDate: '2026-12-31', Plat: 'ZXC', BetMultiple: 1 }
    ],
    claims: {},
    signedDates: []
  }
}

function clone (value) {
  return JSON.parse(JSON.stringify(value))
}

function read () {
  if (typeof window === 'undefined' || !window.localStorage) return initialState()
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    if (stored && stored.version === 1) return stored
  } catch (error) {
    console.warn('[Mock API] Invalid stored state; resetting.', error)
  }
  const state = initialState()
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  return state
}

function write (state) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
  return state
}

function reset () {
  const state = initialState()
  write(state)
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('account')
    if (window.sessionStorage) {
      window.sessionStorage.clear()
    }
  }
  return clone(state)
}

export { clone, initialState, read, write, reset, STORAGE_KEY }
