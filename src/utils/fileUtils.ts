import IconDefault from '/icons/icon-file.svg'
import IconImage from '/icons/icon-image.svg'
import IconPdf from '/icons/icon-pdf.svg'
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
  const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
  const name = file.name.toLowerCase()
  const type = file.type || ''
  const isFigmaType = type === 'application/vnd.figma.document'
  // 1. По MIME-типу
  if (type.startsWith('image/')) return IconImage
  if (type.startsWith('video/')) return IconVideo
  if (type.startsWith('audio/')) return IconAudio
  if (type === 'application/pdf') return IconPdf

  if (
    type === 'application/msword' ||
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return IconText

  if (
    type === 'application/vnd.ms-excel' ||
    type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return IconText

  if (
    type === 'application/vnd.ms-powerpoint' ||
    type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
    return IconDesign

  if (
    [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip'
    ].includes(type)
  )
    return IconArch

  // Figma, Framer, Sketch и др.
  if (
    type === 'application/x-figma' ||
    isFigmaType ||
    (type === 'application/octet-stream' && name.endsWith('.fig'))
  )
    return IconFig

  if (type === 'application/octet-stream' && name.endsWith('.framerx')) return IconFram

  if (isFigmaType || (type === 'application/octet-stream' && /\.(sketch|psd|xd|ai)$/.test(name)))
    return IconDesign

  if (
    ['application/json', 'application/xml'].includes(type) ||
    ['text/plain', 'text/csv'].includes(type)
  )
    return IconText

  // 2. По расширению
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp', 'tiff'].includes(ext)) return IconImage
  if (['mp4', 'mov', 'avi', 'webm', 'mkv', 'mpeg'].includes(ext)) return IconVideo
  if (['mp3', 'wav', 'ogg'].includes(ext)) return IconAudio
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return IconArch
  if (['sketch', 'psd', 'xd', 'ai'].includes(ext)) return IconDesign
  if (ext === 'fig') return IconFig
  if (ext === 'framerx') return IconFram
  if (['csv', 'json', 'xml'].includes(ext)) return IconText
  if (['txt', 'rtf'].includes(ext)) return IconText
  if (ext === 'pdf') return IconPdf
  if (['doc', 'docx'].includes(ext)) return IconText
  if (['xls', 'xlsx'].includes(ext)) return IconText
  if (['ppt', 'pptx'].includes(ext)) return IconDesign

  // 3. По умолчанию
  return IconDefault
}

export { formatDate, formatSize, getFileIcon }
