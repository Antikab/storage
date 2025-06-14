// useFilesFetch - загружает список файлов из Firebase Storage и сохраняет его в Pinia, если он ещё не был загружен.
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
  } catch (e) {
    alert('Error getting file list')
    console.log(e)
  } finally {
    filesStore.loading = false
  }
}

export { useFilesFetch }
