<!-- FileRowDesktop -->
<script setup lang="ts">
import FileIcon from '@/components/FileIcon.vue'
import { formatDate, formatSize, getFileIcon } from '@/utils/fileUtils'
import { useFilesStore } from '@/stores/files'
import { useFileDelete } from '@/composables/useFileDelete'

const filesStore = useFilesStore()
const { deletingId, deleteFile } = useFileDelete()
</script>

<template>
  <div class="w-full flex flex-col">
    <div
      class="hidden lg:grid lg:grid-cols-[1fr_176px_176px_68px] lg:items-center py-[13px] text-xs font-medium border-b border-b-light-gray-color"
    >
      <div class="px-6 text-nowrap">File name</div>
      <div class="px-6 text-nowrap">File size</div>
      <div class="px-6 text-nowrap">Date uploaded</div>
      <div></div>
    </div>
    <div
      v-for="file in filesStore.files"
      :key="file.id"
      class="flex flex-col lg:grid lg:grid-cols-[1fr_176px_176px_68px] items-start lg:items-center even:bg-light-gray-color-2 border-b-2 last:border-b lg:border-b border-b-light-gray-color hover:bg-primary-color-hover/5 active:bg-primary-color-hover/5 transition-colors duration-300"
    >
      <div
        class="w-full lg:w-fit flex items-center gap-3 px-6 py-4 border-t border-t-light-gray-color lg:border-none shadow-xs lg:shadow-none mb-2 lg:m-0"
      >
        <FileIcon :src="getFileIcon(file)" />
        <div class="flex flex-col">
          <div class="text-sm font-medium text-black-color break-words">
            {{ file.name }}
          </div>
          <div class="hidden lg:flex font-medium text-sm">{{ formatSize(file.size) }}</div>
        </div>
      </div>

      <div class="w-full flex justify-between gap-2 lg:contents">
        <div class="flex flex-row-reverse lg:contents">
          <div class="flex flex-col lg:contents">
            <div class="flex lg:hidden px-6 text-xs font-medium text-nowrap">File size</div>
            <div class="flex px-6 py-4 text-sm text-nowrap">{{ formatSize(file.size) }}</div>
          </div>
          <div class="flex flex-col sm:pl-13 lg:contents">
            <div class="flex lg:hidden px-6 text-xs font-medium text-nowrap">Date uploaded</div>
            <div class="px-6 py-4 text-sm text-nowrap">{{ formatDate(file.date) }}</div>
          </div>
        </div>
        <div class="flex flex-col items-start justify-center gap-2 text-sm pr-6 pb-4 lg:p-0">
          <a
            :href="file.url"
            target="_blank"
            class="text-primary-color-hover hover:text-primary-color active:text-primary-color"
          >
            Download
          </a>
          <button
            :class="[
              'font-medium transition',
              deletingId === file.id
                ? 'cursor-not-allowed'
                : 'text-rose-400 hover:text-rose-600 active:text-rose-600'
            ]"
            @click="deleteFile(file.id)"
            :disabled="deletingId === file.id"
          >
            {{ deletingId === file.id ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="!filesStore.files.length" class="px-6 py-4 text-center text-lg">
      No files uploaded yet
    </div>
  </div>
</template>
