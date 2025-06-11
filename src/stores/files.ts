// files.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchFilesFromFirebase } from '@/utils/fetchFilesFromFirebase'
import type { UploadedFile } from '@/types'

const useFilesStore = defineStore('files', () => {
  const files = ref<UploadedFile[]>([])
  const loading = ref(false)
  const loaded = ref(false)

  async function fetchFilesIfNeeded() {
    if (loaded.value) return files.value
    loading.value = true
    try {
      const fetched = await fetchFilesFromFirebase()
      setFiles(fetched)
      return fetched
    } finally {
      loading.value = false
    }
  }

  function setFiles(newFiles: UploadedFile[]) {
    files.value = newFiles
    loaded.value = true
  }
  function addFile(file: UploadedFile) {
    files.value.push(file)
  }
  function removeFile(id: string) {
    files.value = files.value.filter((f) => f.id !== id)
  }

  return { files, loading, loaded, fetchFilesIfNeeded, setFiles, addFile, removeFile }
})

export { type UploadedFile, useFilesStore }
