<template>
  <div class="container">
    <div class="header">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1><i class="fas fa-file-invoice-dollar"></i> 發票管理系統</h1>
          <p>歡迎回來，{{ currentUser.name }}！</p>
        </div>
        <button class="btn btn-danger" @click="logout">
          <i class="fas fa-sign-out-alt"></i> 登出
        </button>
      </div>
    </div>

    <router-link to="/invoices" class="btn btn-primary" style="margin-top: 20px;">
  <i class="fas fa-file-invoice"></i> 前往發票管理
</router-link>
    <div class="stats-grid">
      <div class="stat-card">
        <i class="fas fa-file-invoice"></i>
        <h3>總發票數</h3>
        <p>{{ invoices.length }}</p>
      </div>
      <div class="stat-card">
        <i class="fas fa-dollar-sign"></i>
        <h3>總收入</h3>
        <p>NT$ {{ totalRevenue.toLocaleString() }}</p>
      </div>
      <div class="stat-card">
        <i class="fas fa-check-circle"></i>
        <h3>已付款</h3>
        <p>{{ paidInvoices }}</p>
      </div>
      <div class="stat-card">
        <i class="fas fa-clock"></i>
        <h3>待付款</h3>
        <p>{{ pendingInvoices }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 模擬載入使用者與發票資料
const currentUser = ref({})
const invoices = ref([])

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const invoiceData = JSON.parse(localStorage.getItem(`invoices_${user.id}`) || '[]')
  currentUser.value = user
  invoices.value = invoiceData
})

const totalRevenue = computed(() => {
  return invoices.value.reduce((sum, invoice) => sum + Number(invoice.amount), 0)
})

const paidInvoices = computed(() => {
  return invoices.value.filter(inv => inv.status === 'paid').length
})

const pendingInvoices = computed(() => {
  return invoices.value.filter(inv => inv.status === 'pending').length
})
function logout() {
  localStorage.removeItem('currentUser')
  window.location.href = '/login' // 導回登入頁
}

</script>
