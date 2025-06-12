// src/composables/useFileDelete.ts
import { ref as vueRef } from 'vue'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFilesStore } from '@/stores/files'
import { useRouter } from 'vue-router'
import { storage } from '@/firebase'

function useFileDelete() {
  const deletingId = vueRef<string | null>(null)
  const filesStore = useFilesStore()
  const router = useRouter()

  async function deleteFile(fileId: string) {
    deletingId.value = fileId
    try {
      const fileRef = storageRef(storage, fileId)
      await deleteObject(fileRef)
      filesStore.removeFile(fileId)
      if (filesStore.files.length === 0) {
        router.replace({ name: 'home' })
      }
    } catch (e) {
      alert('Error deleting file')
      console.log(e)
    } finally {
      deletingId.value = null
    }
  }

  return { deletingId, deleteFile }
}

export { useFileDelete }
