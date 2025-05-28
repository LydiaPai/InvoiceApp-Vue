<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1><i class="fas fa-file-invoice-dollar"></i> 發票管理系統</h1>
        <p>專業的發票管理解決方案</p>
      </div>

      <div class="auth-tabs">
        <button class="auth-tab" :class="{ active: authMode === 'login' }" @click="authMode = 'login'; resetAuthForms()">
          <i class="fas fa-sign-in-alt"></i> 登入
        </button>
        <button class="auth-tab" :class="{ active: authMode === 'register' }" @click="authMode = 'register'; resetAuthForms()">
          <i class="fas fa-user-plus"></i> 註冊
        </button>
      </div>

      <!-- 登入表單 -->
      <form v-if="authMode === 'login'" @submit.prevent="login" class="auth-form">
        <div class="form-group">
          <label for="loginEmail">Email 帳號</label>
          <input type="email" id="loginEmail" v-model="loginForm.email" required placeholder="請輸入您的 Email" />
        </div>
        <div class="form-group">
          <label for="loginPassword">密碼</label>
          <input type="password" id="loginPassword" v-model="loginForm.password" required placeholder="請輸入密碼" />
        </div>
        <div v-if="authError" class="error-message">
          <i class="fas fa-exclamation-triangle"></i> {{ authError }}
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          <i class="fas fa-sign-in-alt"></i> 登入
        </button>
      </form>

      <!-- 註冊表單 -->
      <form v-if="authMode === 'register'" @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label for="registerName">姓名 *</label>
          <input type="text" id="registerName" v-model="registerForm.name" required placeholder="請輸入您的姓名" />
        </div>
        <div class="form-group">
          <label for="registerEmail">Email 帳號 *</label>
          <input type="email" id="registerEmail" v-model="registerForm.email" required placeholder="請輸入 Email 作為帳號" />
        </div>
        <div class="form-group">
          <label for="registerCompany">公司名稱</label>
          <input type="text" id="registerCompany" v-model="registerForm.company" placeholder="請輸入公司名稱（選填）" />
        </div>
        <div class="form-group">
          <label for="registerPassword">密碼 *</label>
          <input type="password" id="registerPassword" v-model="registerForm.password" required placeholder="密碼至少6個字元" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">確認密碼 *</label>
          <input type="password" id="confirmPassword" v-model="registerForm.confirmPassword" required placeholder="請再次輸入密碼" />
        </div>
        <div v-if="authError" class="error-message">
          <i class="fas fa-exclamation-triangle"></i> {{ authError }}
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          <i class="fas fa-user-plus"></i> 註冊帳號
        </button>
      </form>

      <div class="auth-demo">
        <p><i class="fas fa-info-circle"></i> 測試帳號：demo@example.com / password</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const authMode = ref('login')
const authError = ref('')

// 登入表單
const loginForm = reactive({
  email: '',
  password: ''
})

// 註冊表單
const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  company: ''
})

// 重置表單
function resetAuthForms() {
  authError.value = ''
  loginForm.email = ''
  loginForm.password = ''
  registerForm.name = ''
  registerForm.email = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerForm.company = ''
}

// 登入邏輯
function login() {
  authError.value = ''
  if (!loginForm.email || !loginForm.password) {
    authError.value = '請填寫所有必填欄位'
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password)

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/')
  } else {
    authError.value = '帳號或密碼錯誤'
  }
}

// 註冊邏輯
function register() {
  authError.value = ''

  if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
    authError.value = '請填寫所有必填欄位'
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    authError.value = '密碼確認不符'
    return
  }

  if (registerForm.password.length < 6) {
    authError.value = '密碼至少需要6個字元'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.email)) {
    authError.value = '請輸入有效的 Email 格式'
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (users.find(u => u.email === registerForm.email)) {
    authError.value = '此 Email 已被註冊'
    return
  }

  const newUser = {
    id: Date.now(),
    name: registerForm.name,
    email: registerForm.email,
    password: registerForm.password,
    company: registerForm.company,
    registerDate: new Date().toISOString().split('T')[0]
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(newUser))

  router.push('/')
}
</script>
