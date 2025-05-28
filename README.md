# 🧾 Vue 發票管理系統 Invoice Manager

本專案為一套前端專用的發票管理系統，使用 Vue 3 + Vite 打造，模擬企業開立與管理發票的完整流程，包含使用者帳號管理、發票 CRUD、儀表板統計資訊等功能。所有資料均保存在瀏覽器 `localStorage` 中，無需後端即可體驗。

---

## 📌 功能總覽

### 🧑‍💼 使用者系統
- 使用者註冊（姓名、Email、密碼、公司）
- 使用者登入 / 登出
- 登入狀態驗證與保護（未登入者強制導向登入頁）
- 使用者資料儲存在 localStorage（users、currentUser）

### 🧾 發票管理
- 建立發票（發票號碼、客戶、金額、日期、狀態、描述）
- 編輯發票（點選後自動填入表單）
- 刪除發票（帶確認框）
- 自動儲存在 localStorage 以 user ID 區分
- 儲存成功後自動跳轉至 Dashboard

### 📊 儀表板統計
- 顯示登入者歡迎詞
- 顯示：
  - 總發票數
  - 發票總金額
  - 已付款筆數
  - 待付款筆數

### 🌐 路由設計（使用 Vue Router）
| 頁面名稱   | 路徑         | 說明                     |
|------------|--------------|--------------------------|
| 登入頁     | `/login`     | 登入 / 註冊切換畫面     |
| 儀表板     | `/`          | 顯示登入者統計資料     |
| 發票管理   | `/invoices`  | 發票列表與新增/編輯表單 |

---

## 🛠 技術架構

| 技術         | 用途                             |
|--------------|----------------------------------|
| Vue 3        | 前端框架，使用 Composition API   |
| Vite         | 快速建構工具                     |
| Vue Router   | 單頁應用程式路由管理             |
| localStorage | 暫存登入資訊與發票資料           |
| FontAwesome  | 圖標樣式                         |

---

## 📂 專案結構

```
src/
├── assets/             # 靜態樣式（CSS）
│   └── styles.css
├── components/         # 可重用元件
│   ├── InvoiceForm.vue     # 新增/編輯發票表單
│   └── InvoiceTable.vue    # 顯示發票清單表格
├── views/              # 路由頁面元件
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   └── InvoicesView.vue
├── router/             # Vue Router 設定
│   └── index.js
├── App.vue             # 根元件
└── main.js             # 程式進入點
```

---

## 🚀 開始使用

```
# 安裝依賴
npm install

# 本機啟動
npm run dev

```


---

## 🧪 使用教學

### 1. 註冊帳號
- 首次進入畫面 `/login` → 點選「註冊」
- 填寫姓名、Email、密碼（6 字元以上）並註冊
- 註冊成功後自動登入並跳轉至儀表板 `/`

### 2. 管理發票
- 點選「前往發票管理」或手動進入 `/invoices`
- 輸入發票資料並點「儲存」
- 可點「編輯」修改資料，或「刪除」移除發票
- 每位使用者的發票獨立存在 localStorage 中

### 3. 查看統計資訊
- 回到 `/` 儀表板即可看到統計卡片
- 總收入與發票數會即時更新

---

## 💡 常見問題

### Q1：忘記密碼怎麼辦？
本專案為練習用途，密碼保存在 localStorage。  
可開啟瀏覽器 DevTools Console 手動修改：

\`\`\`js
let users = JSON.parse(localStorage.getItem('users'))
users[0].password = 'newpassword123'
localStorage.setItem('users', JSON.stringify(users))
\`\`\`

或清除全部登入資料：

\`\`\`js
localStorage.clear()
\`\`\`

---

## 🔧 待辦與進階功能（建議延伸）

- [ ] 支援搜尋發票（依照客戶、狀態、號碼）
- [ ] 匯出為 PDF、Excel (`jspdf`, `xlsx`)
- [ ] 加入 Firebase 作為後端
- [ ] 加入登入狀態全域管理（Pinia）
- [ ] 支援多語言切換（i18n）
- [ ] RWD 響應式設計與深色模式切換

---


