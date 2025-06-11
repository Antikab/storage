import { createRouter, createWebHistory } from 'vue-router'
import { useFilesStore } from '@/stores/files'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/UploadForm.vue'),
      async beforeEnter() {
        const filesStore = useFilesStore()
        try {
          const files = await filesStore.fetchFilesIfNeeded()
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
        const filesStore = useFilesStore()
        try {
          const files = await filesStore.fetchFilesIfNeeded()
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
