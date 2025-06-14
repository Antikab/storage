// Файл useFileUpload.ts реализует логику drag’n’drop и открытия диалога выбора файлов с передачей выбранных файлов в функцию загрузки.
import { ref } from 'vue'

function useFileUpload(uploadFiles: (files: FileList | null) => void) {
  const inputRef = ref<HTMLInputElement | null>(null)
  const isDragOver = ref(false)

  function openFileDialog() {
    inputRef.value?.click()
  }

  function onFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files
    uploadFiles(files)
  }

  function onDrop(e: DragEvent) {
    isDragOver.value = false
    if (!e.dataTransfer?.files) return
    uploadFiles(e.dataTransfer.files)
  }
  function onDragOver() {
    isDragOver.value = true
  }
  function onDragLeave() {
    isDragOver.value = false
  }

  return {
    inputRef,
    isDragOver,
    openFileDialog,
    onFileChange,
    onDrop,
    onDragOver,
    onDragLeave
  }
}

export { useFileUpload }
