import { createRouter, createWebHistory } from 'vue-router'
import { useFilesFetch } from '@/composables/useFilesFetch'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/UploadForm.vue'),
      async beforeEnter() {
        try {
          const files = await useFilesFetch()
          if (files.length > 0) {
            return { name: 'files' }
          }
        } catch (error) {
          console.error('Ошибка проверки наличия файлов:', error)
        }
      }
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('@/components/FilesList.vue'),
      async beforeEnter() {
        try {
          const files = await useFilesFetch()
          if (files.length === 0) {
            return { name: 'home' }
          }
        } catch (error) {
          console.error('Ошибка при получении списка файлов из Firebase:', error)
          return { name: 'home' }
        }
      }
    }
  ]
})

export default router
