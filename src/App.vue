<!-- App.vue -->
<script setup lang="ts">
import { useFilesStore } from '@/stores/files'
import LoaderOverlay from '@/components/LoaderOverlay.vue'

const filesStore = useFilesStore()
</script>

<template>
  <div class="min-h-screen flex justify-center">
    <RouterView />
    <LoaderOverlay v-if="filesStore.loading" />
  </div>
</template>
