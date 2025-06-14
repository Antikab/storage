import IconDefault from '/icons/icon-file.svg'
import IconImage from '/icons/icon-image.svg'

// Преобразует дату
function formatDate(date?: string): string {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

// Форматирует размер файла в удобный вид: B, KB, MB или GB
function formatSize(size?: number): string {
  if (!size || size === 0) return '—'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
  if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + ' MB'
  return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

// Возвращает иконку для файла по его MIME-типу или расширению
function getFileIcon(file: { name: string; type?: string }) {
  // 1. Проверяем MIME-тип (contentType) — это надёжнее
  if (file.type) {
    if (file.type.startsWith('image/')) return IconImage // Картинка
    if (file.type.startsWith('video/')) return IconImage // Видео
    if (file.type.startsWith('audio/')) return IconImage // Аудио
    if (file.type === 'application/pdf') return '📄' // PDF
    if (
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
      return IconImage // Word
    if (
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      return IconImage // Excel
    if (
      file.type === 'application/vnd.ms-powerpoint' ||
      file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )
      return IconImage // PowerPoint
    if (
      file.type === 'application/zip' ||
      file.type === 'application/x-rar-compressed' ||
      file.type === 'application/x-7z-compressed' ||
      file.type === 'application/x-tar' ||
      file.type === 'application/gzip'
    )
      return IconImage // Архив
    // Дизайн-файлы (figma, psd и др)
    if (
      file.type === 'application/vnd.figma.document' ||
      (file.type === 'application/octet-stream' &&
        /\.(fig|framerx|sketch|psd|xd|ai)$/i.test(file.name))
    )
      return IconImage
    if (file.type === 'application/json' || file.type === 'application/xml') return IconImage // Data
    if (file.type === 'text/plain' || file.type === 'text/csv') return IconImage // Текст
  }

  // 2. Если тип не помог — проверяем расширение
  const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
  if (/\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)$/i.test(ext)) return IconImage // Картинка
  if (/\.(mp4|mov|avi|webm|mkv|mpeg)$/i.test(ext)) return IconImage // Видео
  if (/\.(mp3|wav|ogg)$/i.test(ext)) return IconImage // Аудио
  if (/\.(zip|rar|7z|tar|gz)$/i.test(ext)) return IconImage // Архив
  if (/\.(fig|framerx|sketch|psd|xd|ai)$/i.test(ext)) return IconImage // Дизайн
  if (/\.(csv|json|xml)$/i.test(ext)) return IconImage // Данные
  if (/\.(txt|rtf)$/i.test(ext)) return IconImage // Текст
  if (/\.(pdf)$/i.test(ext)) return IconImage // PDF
  if (/\.(doc|docx)$/i.test(ext)) return IconImage // Word
  if (/\.(xls|xlsx)$/i.test(ext)) return IconImage // Excel
  if (/\.(ppt|pptx)$/i.test(ext)) return IconImage // PowerPoint
  // 3. Если ничего не подошло — папка/файл по умолчанию
  return IconDefault
}

export { formatDate, formatSize, getFileIcon }
