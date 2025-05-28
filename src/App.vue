<template>
  <router-view />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  if (!user && route.path !== '/login') {
    router.push('/login')
  }
})

watch(
  () => route.path,
  (newPath) => {
    const user = localStorage.getItem('currentUser')
    if (!user && newPath !== '/login') {
      router.push('/login')
    }
  }
)
</script>


<style>
/* 可放基礎 layout，或全部交給 styles.css 處理 */
body {
  font-family: 'Microsoft JhengHei', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  margin: 0;
}
</style>
