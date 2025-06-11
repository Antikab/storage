// src/composables/useFilesUploaderFirebase.ts
// composable для загрузки файлов в Firebase Storage и обновления Pinia store.

import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useFilesStore } from '@/stores/files'
import { storage } from '@/firebase'

function useFilesUploaderFirebase() {
  const filesStore = useFilesStore()

  async function uploadFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return
    filesStore.loading = true
    try {
      for (const file of selectedFiles) {
        const fileRef = storageRef(storage, `uploads/${file.name}`)
        await uploadBytes(fileRef, file)
        const url = await getDownloadURL(fileRef)
        filesStore.addFile({
          id: fileRef.fullPath,
          name: file.name,
          size: file.size,
          url,
          date: new Date().toISOString(),
          type: file.type
        })
      }
    } catch (e) {
      alert('Ошибка при загрузке файла')
      console.log(e)
    } finally {
      filesStore.loading = false
    }
  }
  return {
    uploadFiles
  }
}

export { useFilesUploaderFirebase }
