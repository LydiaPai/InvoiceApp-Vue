import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InvoicesView from '../views/InvoicesView.vue' // ✅ 加這行

const routes = [
  { path: '/', component: DashboardView },
  { path: '/login', component: LoginView },
  { path: '/invoices', component: InvoicesView } // ✅ 加這行
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
