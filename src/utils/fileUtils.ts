import IconDefault from '/icons/icon-file.svg'
import IconImage from '/icons/icon-image.svg'
import IconVideo from '/icons/icon-video.svg'
import IconAudio from '/icons/icon-audio.svg'
import IconText from '/icons/icon-text.svg'
import IconArch from '/icons/icon-arch.svg'
import IconFig from '/icons/icon-fig.svg'
import IconFram from '/icons/icon-fram.svg'
import IconDesign from '/icons/icon-design.svg'

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
    if (file.type.startsWith('video/')) return IconVideo // Видео
    if (file.type.startsWith('audio/')) return IconAudio // Аудио
    if (file.type === 'application/pdf') return IconDesign // PDF
    if (
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
      return IconText // Word
    if (
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      return IconText // Excel
    if (
      file.type === 'application/vnd.ms-powerpoint' ||
      file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )
      return IconDesign // PowerPoint
    if (
      file.type === 'application/zip' ||
      file.type === 'application/x-rar-compressed' ||
      file.type === 'application/x-7z-compressed' ||
      file.type === 'application/x-tar' ||
      file.type === 'application/gzip'
    )
      return IconArch // Архив
    // Дизайн-файлы (figma, psd и др)
    if (
      file.type === 'application/vnd.figma.document' ||
      (file.type === 'application/octet-stream' && /\.(framerx)$/i.test(file.name))
    )
      return IconFram // Дизайн framerx
    if (
      file.type === 'application/vnd.figma.document' ||
      (file.type === 'application/octet-stream' && /\.(fig)$/i.test(file.name))
    )
      return IconFig // Дизайн фигма
    if (
      file.type === 'application/vnd.figma.document' ||
      (file.type === 'application/octet-stream' && /\.(sketch|psd|xd|ai)$/i.test(file.name))
    )
      return IconDesign // Дизайн
    if (file.type === 'application/json' || file.type === 'application/xml') return IconText // Данные
    if (file.type === 'text/plain' || file.type === 'text/csv') return IconText // Текст
  }

  // 2. Если тип не помог — проверяем расширение
  const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
  if (/\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)$/i.test(ext)) return IconImage // Картинка
  if (/\.(mp4|mov|avi|webm|mkv|mpeg)$/i.test(ext)) return IconVideo // Видео
  if (/\.(mp3|wav|ogg)$/i.test(ext)) return IconAudio // Аудио
  if (/\.(zip|rar|7z|tar|gz)$/i.test(ext)) return IconArch // Архив
  if (/\.(sketch|psd|xd|ai)$/i.test(ext)) return IconDesign // Дизайн
  if (/\.(fig)$/i.test(ext)) return IconFig // Дизайн фигма
  if (/\.(framerx)$/i.test(ext)) return IconFram // Дизайн framerx
  if (/\.(csv|json|xml)$/i.test(ext)) return IconText // Данные
  if (/\.(txt|rtf)$/i.test(ext)) return IconText // Текст
  if (/\.(pdf)$/i.test(ext)) return IconDesign // PDF
  if (/\.(doc|docx)$/i.test(ext)) return IconText // Word
  if (/\.(xls|xlsx)$/i.test(ext)) return IconText // Excel
  if (/\.(ppt|pptx)$/i.test(ext)) return IconDesign // PowerPoint
  // 3. Если ничего не подошло — папка/файл по умолчанию
  return IconDefault
}

export { formatDate, formatSize, getFileIcon }
