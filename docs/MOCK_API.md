# H5 Mock API 實作說明

## 架構

`src/api/https.js` 保留原本 Axios defaults、Authorization、response/error interceptor 與 `fetchPost`／`fetchGet`。只有 `WEB_USE_MOCK=true` 時，`src/mock/adapter.js` 才會替換 Axios adapter，所以舊頁面直接使用 Axios 的請求也一併被隔離。

Mock adapter 沒有真實 API fallback。未覆蓋端點會 reject，HTTP 語意為 `501 Mock Not Implemented`，錯誤碼為 `MOCK_NOT_IMPLEMENTED`。

`src/mock/state.js` 提供可重現初始資料與 localStorage persistence；轉帳、提款、新增卡片／錢包、修改會員、頭像、訊息已讀與活動領取會同步更新狀態。

## 覆蓋範圍

- 初始化與首頁：代理檢查、公告、輪播、彈窗、通知、H5 平台與選單
- 身分：一般／Facebook 登入與註冊、Geetest 本機 shim、圖形／簡訊／Email 驗證、忘記密碼
- 會員與權限：會員資料、實名、手機、Email、密碼、安全問題、頭像
- 遊戲：平台列表、餘額、分類／搜尋／分頁、動態遊戲登入 placeholder
- 帳務：平台轉帳、一鍵回收、充值方式與訂單、銀行／USDT 提款、匯率
- 綁定：銀行卡、GCash 類卡片、虛擬錢包新增與列表同步
- 查詢：訊息／詳情、交易紀錄分頁與搜尋、投注統計、返水、VIP
- 活動：現有 info、申請／領取、抽獎、刷新、排行榜、歷史、免費抽獎與兌換端點
- 客服／金流／遊戲供應商：以本機提示或 `#mock-*` placeholder 模擬，不載入真實客服、驗證或 Facebook SDK

## 網路隔離

- Axios base URL 會切到 `/mock-api`，且 adapter 在送出任何網路請求前直接回應。
- 未覆蓋端點直接 501，不會靜默回到 `/api` 或 `/data`。
- Mock 登入使用固定本機 token，與真實驗證完全隔離。
- H5 avatar 改用 bundle 內既有圖片，避免 `<img>`／CSS 再請求 `/data/Image/...`。
- 靜態圖片、字型與 chunk 仍由目前網站來源讀取；這些不是後端 API。

## 已知限制

- 不模擬真實金流、遊戲供應商、Facebook 或線上客服服務本身。
- 專案目前未找到 WebSocket、SSE、檔案上傳或檔案下載 API；未來新增端點會先被 501 阻擋，需再增加 handler。
- 假資料僅用於前端開發與展示，不具真實交易意義。
- 真實模式已驗證可 lint 與 build，但因沒有可用後端，本次不宣稱完成真實 API 端到端驗證。
