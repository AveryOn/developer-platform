<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiConsole } from '@mdi/js';
</script>

<template>
  <div class="my-[24px] flex justify-start items-center">
    <svg-icon class="w-[40px] h-[40px] mr-[8px]" type="mdi" :path="mdiConsole"></svg-icon>
    <h1 class="text-[36px] select-none">
      Everi Vladislav
    </h1>
  </div>
</template>
