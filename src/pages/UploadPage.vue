<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useFilesStore } from '@/stores/files'
import { useFileUpload } from '@/composables/useFileUpload'
import { useFilesUploaderFirebase } from '@/composables/useFilesUploaderFirebase'
import BtnUpload from '@/components/BtnUpload.vue'
import iconUploadDnd from '@/assets/icons/icon-upload-dnd.svg'
import iconUploadDndActive from '@/assets/icons/icon-upload-dnd-active.svg'

const router = useRouter()
const { uploadFiles } = useFilesUploaderFirebase()
const { inputRef, isDragOver, openFileDialog, onFileChange, onDrop, onDragOver, onDragLeave } =
  useFileUpload(async (selectedFiles) => {
    await uploadFiles(selectedFiles)
    router.replace({ name: 'files' })
  })
const filesStore = useFilesStore()
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full text-lg font-medium text-black-color px-6 py-5">My projects</div>

    <div class="w-full border-b border-b-light-gray-color"></div>

    <div class="flex flex-col justify-center grow">
      <div v-if="filesStore.loading || filesStore.files.length" class="mt-10">
        Uploading files to storage, please wait...
      </div>
      <div v-else class="w-[352px] flex flex-col gap-6">
        <div
          class="flex flex-col gap-4 text-center"
          @drop.prevent="onDrop"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
        >
          <div class="relative h-[120px] w-[152px] m-auto">
            <inline-svg
              :src="iconUploadDnd"
              class="absolute inset-0 transition-opacity duration-400"
              :class="isDragOver ? 'opacity-0' : 'opacity-100'"
              aria-label="icon upload dnd"
              role="img"
            />
            <inline-svg
              :src="iconUploadDndActive"
              class="absolute inset-0 transition-opacity duration-400"
              :class="isDragOver ? 'opacity-100' : 'opacity-0'"
              aria-label="icon upload dnd"
              role="img"
            />
          </div>

          <div>
            <p
              :class="isDragOver ? 'text-primary-color-hover' : 'text-black-color'"
              class="font-medium mb-1 transition-colors duration-500"
            >
              Start by uploading a file
            </p>
            <p
              :class="isDragOver ? 'text-primary-color-hover' : 'text-gray-color'"
              class="text-sm font-light transition-colors duration-500"
            >
              Any assets used in projects will live here. <br />
              Start creating by uploading your files.
            </p>
          </div>
        </div>
        <BtnUpload class="w-full" @click="openFileDialog" />
        <input ref="inputRef" type="file" multiple class="hidden" @change="onFileChange" />
      </div>
    </div>
  </div>
</template>
