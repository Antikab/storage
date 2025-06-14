import { createRouter, createWebHistory } from 'vue-router'
import { useFilesFetch } from '@/composables/useFilesFetch'
import { useFilesStore } from '@/stores/files'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/UploadPage.vue')
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('@/pages/FilesPage.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const filesStore = useFilesStore()

  if (!filesStore.loaded && (to.name === 'home' || to.name === 'files')) {
    await useFilesFetch()
  }

  if (to.name === 'home' && filesStore.files.length) {
    return { name: 'files' }
  }

  if (to.name === 'files' && !filesStore.files.length) {
    return { name: 'home' }
  }
})

export default router
