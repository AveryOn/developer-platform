<script setup lang="ts">
import { mdiConsole } from '@mdi/js'
import { onMounted } from 'vue'
import { useAppStore } from '~/client/stores/app.store'
import Icon from './Icon.vue'

const appStore = useAppStore()

onMounted(() => {
  appStore.initTheme()
})
</script>

<template>
  <div class="my-[24px] flex justify-start items-center">
    <Icon :icon="mdiConsole" :size="42"></Icon>
    <h1 class="text-[36px] select-none">Everi Vladislav</h1>
  </div>
</template>
