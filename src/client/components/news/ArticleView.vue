<script setup lang="ts">
const props = defineProps<{
  uuid: string
  html: string
}>()
</script>

<template>
  <div>
    <h1> Article View {{ props.uuid }}</h1>
    <div class="markdown-body" v-html="props.html"></div>
  </div>
</template>

<style scoped></style>
