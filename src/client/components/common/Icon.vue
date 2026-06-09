<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'


const props = defineProps<{
  icon: string
}>()

</script>

<template>
  <svg-icon class="w-[40px] h-[40px] mr-[8px]" type="mdi" :path="props.icon"></svg-icon>
</template>
