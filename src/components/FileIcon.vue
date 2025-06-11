<script setup lang="ts">
interface Props {
  src: string
  size?: number
  bg?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  bg: 'bg-primary-light-color'
})
</script>

<template>
  <div
    :class="['flex flex-none items-center justify-center rounded-full', props.bg]"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px'
    }"
  >
    <inline-svg :src="props.src" class="w-5 h-5 text-primary-color" aria-label="file-icon" />
  </div>
</template>
