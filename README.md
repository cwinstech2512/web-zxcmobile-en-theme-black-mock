# web_zxcmobile_en_theme_black

Vue 2 + webpack 3 的 H5 多入口前端專案。專案可透過環境變數切換「真實 API」與「完整本機 Mock」模式；Mock 模式不需要後端，且 Axios 不會將未覆蓋請求轉送到真實服務。

## 環境需求與安裝

- 建議 Node.js 20
- npm

這是舊版 webpack 專案，請略過已淘汰套件的安裝腳本：

```bash
npm install --ignore-scripts
```

## Mock 模式（不需要後端）

```bash
npm run dev:mock
```

預設網址為 `http://localhost:8080`，右下角會顯示 `MOCK MODE · LOCAL DATA`。

測試登入：

- 帳號：任意非空值，例如 `mockuser`
- 密碼：任意非空值，例如 `mock123`
- 圖形驗證：Mock 模式會在本機自動完成
- 簡訊／Email 驗證碼：`123456`

也可複製 `.env.example` 為 `.env`，把 `WEB_USE_MOCK` 改為 `true` 後執行 `npm run dev`。Shell 變數優先於 `.env.local` 與 `.env`。

## 真實 API 模式（預設）

```bash
npm run dev
```

開發環境保留原本 `/api` proxy；正式建置保留原本 `/data` base URL、參數、攔截器與錯誤處理。

## 建置

真實 API 正式版（預設不啟用 Mock）：

```bash
npm run build
```

純前端 Mock 展示版：

```bash
npm run build:mock
```

若正式環境只設定 `WEB_USE_MOCK=true`，建置會被阻擋；只有同時明確設定 `ALLOW_PRODUCTION_MOCK=true` 才能產生 Mock 正式包，避免誤用。

## GitHub Pages

`.github/workflows/deploy-pages.yml` 會在推送 `main` 時，以 Node.js 20 執行 API／大小寫路徑檢查、lint、建立 Mock 正式包，再部署 `dist`。production asset path 使用相對路徑，可在 repository 子路徑運作。

GitHub repository 建立後，需在 `Settings → Pages → Build and deployment` 將 Source 設為 `GitHub Actions`。

## 重設 Mock 資料

Mock 使用固定初始資料並儲存在 localStorage。瀏覽器開發者工具執行：

```js
window.__WEB_ZXC_MOCK__.state()
window.__WEB_ZXC_MOCK__.reset()
location.reload()
```

## 驗證

```bash
npm run verify:mock
npm run verify:paths
npm run lint
npm run build:mock
npm run build
```

`verify:mock` 掃描 API 字串並逐一交給 Mock adapter；未知端點會收到 `501 MOCK_NOT_IMPLEMENTED`，不會 fallback。`verify:paths` 會在 macOS 上預先檢查 Linux 大小寫敏感的 import 與 CSS asset 路徑，避免 Pages 才出現白畫面或缺圖。

完整架構、覆蓋與限制請見 [Mock API 說明](docs/MOCK_API.md)。
