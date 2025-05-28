<template>
  <div class="form-container">
    <h2>{{ editingInvoice ? '編輯發票' : '新增發票' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>發票號碼 *</label>
          <input type="text" v-model="form.number" required />
        </div>
        <div class="form-group">
          <label>客戶名稱 *</label>
          <input type="text" v-model="form.customerName" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>金額 *</label>
          <input type="number" v-model.number="form.amount" required min="0" />
        </div>
        <div class="form-group">
          <label>日期 *</label>
          <input type="date" v-model="form.date" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>狀態</label>
          <select v-model="form.status">
            <option value="pending">待付款</option>
            <option value="paid">已付款</option>
            <option value="overdue">過期</option>
          </select>
        </div>
        <div class="form-group">
          <label>到期日</label>
          <input type="date" v-model="form.dueDate" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" style="width: 100%;">
          <label>描述</label>
          <textarea rows="3" v-model="form.description"></textarea>
        </div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button v-if="editingInvoice" type="button" class="btn btn-danger" @click="cancelEdit">取消編輯</button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i> {{ editingInvoice ? '更新' : '儲存' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'

const props = defineProps({
  invoiceToEdit: Object,
  editingInvoice: Boolean
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  id: null,
  number: '',
  customerName: '',
  amount: 0,
  date: '',
  dueDate: '',
  status: 'pending',
  description: ''
})

// 初始化日期
form.date = new Date().toISOString().split('T')[0]

// 當有 invoiceToEdit 傳入時，自動填入表單
watch(() => props.invoiceToEdit, (newInvoice) => {
  if (newInvoice) {
    Object.assign(form, newInvoice)
  }
})

function handleSubmit() {
  const invoice = { ...form }
  if (!props.editingInvoice) {
    invoice.id = Date.now()
  }
  emit('save', invoice)
  resetForm()
}

function cancelEdit() {
  emit('cancel')
  resetForm()
}

function resetForm() {
  form.id = null
  form.number = ''
  form.customerName = ''
  form.amount = 0
  form.date = new Date().toISOString().split('T')[0]
  form.dueDate = ''
  form.status = 'pending'
  form.description = ''
}
</script>
