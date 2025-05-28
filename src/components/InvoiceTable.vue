<template>
  <table class="invoice-table">
    <thead>
      <tr>
        <th>發票號碼</th>
        <th>客戶名稱</th>
        <th>金額</th>
        <th>日期</th>
        <th>狀態</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.number }}</td>
        <td>{{ invoice.customerName }}</td>
        <td>NT$ {{ invoice.amount.toLocaleString() }}</td>
        <td>{{ invoice.date }}</td>
        <td>
          <span class="status-badge" :class="'status-' + invoice.status">
            {{ getStatusText(invoice.status) }}
          </span>
        </td>
        <td>
          <button class="btn btn-warning" @click="$emit('edit', invoice)">
            <i class="fas fa-edit"></i> 編輯
          </button>
          <button class="btn btn-danger" @click="$emit('delete', invoice.id)">
            <i class="fas fa-trash"></i> 刪除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['invoices'])

function getStatusText(status) {
  const map = {
    paid: '已付款',
    pending: '待付款',
    overdue: '過期'
  }
  return map[status] || status
}
</script>
