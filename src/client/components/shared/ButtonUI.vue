<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import Icon from '../common/Icon.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    label: undefined,
    disabled: false,
    loading: false,
  },
)
</script>

<template>
  <button class="button" :disabled="props.disabled">
    <Icon
      v-if="props.loading"
      class="loading-ui__spinner"
      :icon="mdiLoading"
      :size="30"
    ></Icon>
    <slot name="default">{{ props.label ?? $slots }}</slot>
  </button>
</template>

<style scoped>
.button {
  align-self: start;

  height: 100%;
  background-color: var(--button-color-1);
  border-radius: 10px;
  padding: 8px;
  margin: 0 6px;
  transition: all 0.4s ease;
}
.button:hover {
  background-color: var(--button-color-1-hover);
  margin: 0;
}

.button:disabled {
  background-color: gray;
  margin: 0;
}

.loading-ui__spinner {
  display: inline-block;

  border: 3px solid var(--primary-color-3);
  border-top-color: var(--primary-color-1);
  border-radius: 50%;

  animation: loading-spin 0.8s linear infinite;
}

@keyframes loading-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
