<!-- eslint-disable no-undef -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
  }>(),
  {
    label: undefined,
    disabled: false,
  },
)

</script>

<template>
  <button class="button" :disabled="props.disabled">
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
</style>
