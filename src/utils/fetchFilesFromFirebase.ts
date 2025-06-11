// fetchFilesFromFirebase
// Утилита для получения файлов из Firebase Storage.
import { ref as storageRef, listAll, getDownloadURL, getMetadata } from 'firebase/storage'

import type { UploadedFile } from '@/types'
import { storage } from '@/firebase'

async function fetchFilesFromFirebase(): Promise<UploadedFile[]> {
  const folderRef = storageRef(storage, 'uploads')
  const res = await listAll(folderRef)
  return Promise.all(
    res.items.map(async (item) => {
      const url = await getDownloadURL(item)
      const meta = await getMetadata(item)
      return {
        id: meta.fullPath,
        name: meta.name,
        size: meta.size,
        url,
        date: meta.timeCreated,
        type: meta.contentType || ''
      }
    })
  )
}

export { fetchFilesFromFirebase }
