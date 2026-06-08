<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { plural } from '~/client/plugins/i18n'

const { t: $t } = useI18n()

const count = 101
</script>

<template>
  <div class="main">
    MAIN
    <div>
      <p>{{ $t('Hello World!') }}</p>
      <p>{{ $t('Example 123') }}</p>
      <p>{{ plural('Project', count) }}</p>
      <p>{{ plural('You have {count} project', count) }}</p>
    </div>
    lorem1000
  </div>
</template>

<style scoped></style>
