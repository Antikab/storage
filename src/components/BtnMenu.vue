<script setup lang="ts">
import { ref } from 'vue'

import { useFileDelete } from '@/composables/useFileDelete'
import iconDots from '@/assets/icons/icon-dots.svg'
import type { UploadedFile } from '@/types'

interface Props {
  file: UploadedFile
}

const props = defineProps<Props>()
const isOpen = ref(false)
const { deletingId, deleteFile } = useFileDelete()

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

async function onDelete() {
  await deleteFile(props.file.id)
  close()
}
</script>

<template>
  <div class="relative flex justify-center items-center" @keyup.esc="close">
    <button
      type="button"
      class="p-2 rounded-full hover:text-primary-color-hover active:text-primary-color-hover hover:bg-primary-light-color active:bg-primary-light-color focus:outline-none cursor-pointer transition-colors duration-250"
      @click="toggle"
    >
      <inline-svg :src="iconDots" class="size-5 pointer-events-none" aria-label="btn menu" />
    </button>
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        role="menu"
        :aria-expanded="isOpen"
        class="absolute top-[30px] right-[15px] lg:top-[30px] lg:right-[30px] z-20 w-28 rounded-lg border border-light-gray-color bg-white shadow-lg select-none"
      >
        <div class="flex flex-col justify-center items-center text-sm">
          <a
            :href="file.url"
            target="_blank"
            class="w-full text-center px-4 py-2 hover:bg-primary-light-color active:bg-primary-light-color text-primary-color-hover hover:text-primary-color active:text-primary-color cursor-pointer transition-colors duration-250"
            @click="close"
          >
            Download
          </a>
          <button
            :class="[
              'w-full px-4 py-2 hover:bg-rose-50 active:bg-rose-50 font-medium cursor-pointer transition-colors duration-250',
              deletingId === file.id
                ? 'cursor-not-allowed'
                : 'text-rose-400 hover:text-rose-600 active:text-rose-600'
            ]"
            :disabled="deletingId === file.id"
            @click="onDelete"
          >
            {{ deletingId === file.id ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </Transition>
    <div v-if="isOpen" class="fixed inset-0 z-10" @click="close"></div>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

.dropdown-enter-active,
.dropdown-leave-active {
  @apply origin-top-right transition duration-250 transform;
}
.dropdown-enter-from {
  @apply opacity-0 scale-50 -translate-y-2;
}
.dropdown-enter-to {
  @apply opacity-100 scale-100 translate-y-0;
}
.dropdown-leave-from {
  @apply opacity-100 scale-100 translate-y-0;
}
.dropdown-leave-to {
  @apply opacity-0 scale-75 -translate-y-2;
}
</style>
