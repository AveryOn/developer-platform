<script setup lang="ts">
const props = defineProps<{
  uuid: string
  html: string
}>()
</script>

<template>
  <div :id="`markdown-block-${props.uuid}`" class="markdown-body border-red border border-[2px]" v-html="props.html">
  </div>
</template>

<style scoped></style>
