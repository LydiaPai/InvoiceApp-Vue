<template>
  <div class="container">
    <div class="header">
      <h1><i class="fas fa-file-invoice"></i> 發票管理</h1>
      <p>共 {{ invoices.length }} 張發票</p>
    </div>

    <!-- 發票清單 -->
    <div v-if="invoices.length === 0" class="empty-state">
      <i class="fas fa-inbox"></i>
      <h3>尚無發票資料</h3>
      <p>點擊「新增發票」開始建立您的第一張發票</p>
    </div>
    <div v-else>
      <InvoiceTable
        :invoices="invoices"
        @edit="editInvoice"
        @delete="deleteInvoice"
      />
    </div>

    <hr />
    <h2>{{ editingInvoice ? '編輯發票' : '新增發票' }}</h2>
    <InvoiceForm
      :invoiceToEdit="invoiceToEdit"
      :editingInvoice="editingInvoice"
      @save="saveInvoice"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InvoiceTable from '../components/InvoiceTable.vue'
import InvoiceForm from '../components/InvoiceForm.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const invoices = ref([])

const editingInvoice = ref(false)
const invoiceToEdit = ref(null)

onMounted(() => {
  const saved = localStorage.getItem(`invoices_${currentUser.id}`)
  invoices.value = saved ? JSON.parse(saved) : []
})

function editInvoice(invoice) {
  invoiceToEdit.value = { ...invoice }
  editingInvoice.value = true
}

function cancelEdit() {
  invoiceToEdit.value = null
  editingInvoice.value = false
}

function saveInvoice(invoice) {
  const index = invoices.value.findIndex(inv => inv.id === invoice.id)

  if (index !== -1) {
    invoices.value[index] = invoice
  } else {
    invoices.value.push(invoice)
  }

  localStorage.setItem(`invoices_${currentUser.id}`, JSON.stringify(invoices.value))
  editingInvoice.value = false
  invoiceToEdit.value = null

  // ✅ 儲存完成後自動跳轉回 Dashboard
  router.push('/')
}


function deleteInvoice(id) {
  if (confirm('確定要刪除這張發票嗎？')) {
    invoices.value = invoices.value.filter(inv => inv.id !== id)
    localStorage.setItem(`invoices_${currentUser.id}`, JSON.stringify(invoices.value))
  }
}
</script>
