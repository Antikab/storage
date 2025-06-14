<script setup lang="ts">
import BtnUpload from '@/components/BtnUpload.vue'
import FileRow from '@/components/FileRow.vue'
import { useFilesStore } from '@/stores/files'
import { useFilesUploaderFirebase } from '@/composables/useFilesUploaderFirebase'
import { useFileUpload } from '@/composables/useFileUpload'

const filesStore = useFilesStore()
const { uploadFiles } = useFilesUploaderFirebase()
const { inputRef, openFileDialog, onFileChange } = useFileUpload(uploadFiles)
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full flex justify-between items-center px-6 py-5">
      <div class="text-lg font-medium text-black-color">Files uploaded</div>
      <BtnUpload @click="openFileDialog" />
      <input ref="inputRef" type="file" multiple class="hidden" @change="onFileChange" />
    </div>

    <div v-if="filesStore.loading" class="text-gray-400 text-center py-8">
      Loading files, please wait...
    </div>
    <FileRow v-else />
  </div>
</template>
