// src/composables/useFilesFetch.ts
import { useFilesStore } from '@/stores/files'
import { fetchFilesFromFirebase } from '@/utils/fetchFilesFromFirebase'

async function useFilesFetch() {
  const filesStore = useFilesStore()
  if (filesStore.loaded) return filesStore.files
  filesStore.loading = true
  try {
    const fetched = await fetchFilesFromFirebase()
    filesStore.setFiles(fetched)
    return fetched
  } finally {
    filesStore.loading = false
  }
}

export { useFilesFetch }
