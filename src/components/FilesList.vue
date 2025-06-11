<!-- FilesList.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ref as storageRef, deleteObject } from 'firebase/storage'

import { formatDate, formatSize, getFileIcon } from '@/utils/fileUtils'
import { useFilesStore } from '@/stores/files'
import { useFileUpload } from '@/composables/useFileUpload'
import { useFilesUploaderFirebase } from '@/composables/useFilesUploaderFirebase'
import { storage } from '@/firebase'
import BtnUpload from '@/components/BtnUpload.vue'
import FileIcon from '@/components/FileIcon.vue'

const router = useRouter()
const { uploadFiles } = useFilesUploaderFirebase()
const { inputRef, openFileDialog, onFileChange } = useFileUpload(uploadFiles)
const filesStore = useFilesStore()
const deletingId = ref<string | null>(null)

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
    alert('Ошибка при удалении файла')
    console.log(e)
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full flex justify-between items-center px-6 py-5">
      <div class="text-lg font-medium text-black-color">Files uploaded</div>
      <BtnUpload @click="openFileDialog" />
      <input ref="inputRef" type="file" multiple class="hidden" @change="onFileChange" />
    </div>
    <div v-if="filesStore.loading" class="text-gray-400 text-center py-8">Загрузка...</div>

    <table v-else class="w-full bg-white hidden sm:table">
      <thead
        class="text-left text-xs text-gray-color font-medium border-b border-b-light-gray-color"
      >
        <tr>
          <th class="py-4 px-6 font-medium">File name</th>
          <th class="py-4 px-6 font-medium">File size</th>
          <th class="py-4 px-6 font-medium">Date uploaded</th>
          <th class="py-4 px-6"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="file in filesStore.files"
          :key="file.id"
          class="hover:bg-primary-color-hover/5 transition odd:bg-light-gray-color-2 border-b border-b-light-gray-color"
        >
          <td class="py-4 px-6 flex items-center gap-3">
            <FileIcon :src="getFileIcon(file)" />
            <span class="font-medium text-black-color">{{ file.name }}</span>
          </td>
          <td class="py-4 px-6 text-black-color">{{ formatSize(file.size) }}</td>
          <td class="py-4 px-6 text-black-color">{{ formatDate(file.date) }}</td>
          <td class="py-4 px-6 flex gap-2 justify-end">
            <a :href="file.url" target="_blank" class="text-violet-600 hover:underline font-medium">
              Open
            </a>
            <button
              :class="[
                'ml-1 px-2 font-medium transition rounded',
                deletingId === file.id ? 'cursor-not-allowed' : 'text-red-500 hover:bg-red-50'
              ]"
              @click="deleteFile(file.id)"
              :disabled="deletingId === file.id"
            >
              {{ deletingId === file.id ? 'Deleting...' : 'Delete' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Мобилки -->
    <div class="w-full flex flex-col sm:hidden">
      <div
        v-for="file in filesStore.files"
        :key="file.id"
        class="flex justify-between items-center gap-4 px-6 py-4 hover:bg-primary-color-hover/5 transition odd:bg-light-gray-color-2 border-t border-t-light-gray-color border-b border-b-light-gray-color"
      >
        <div>
          <div class="flex items-center gap-3">
            <FileIcon :src="getFileIcon(file)" />
            <span class="font-medium text-black-color break-all">{{ file.name }}</span>
          </div>
          <div class="flex-wrap gap-x-4 text-sm gap-y-1">
            <div>
              <span class="font-medium">Size:</span>
              <span class="uppercase">{{ formatSize(file.size) }} </span>
            </div>
            <div><span class="font-medium">Uploaded:</span> {{ formatDate(file.date) }}</div>
          </div>
        </div>
        <div class="flex flex-col items-start justify-center gap-2">
          <a :href="file.url" target="_blank" class="text-black-color">Download </a>
          <button
            :class="[
              'font-medium transition',
              deletingId === file.id ? 'cursor-not-allowed' : 'text-black-color'
            ]"
            @click="deleteFile(file.id)"
            :disabled="deletingId === file.id"
          >
            {{ deletingId === file.id ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="!filesStore.files.length" class="py-10 text-center text-lg">
      No files uploaded yet
    </div>
  </div>
</template>
