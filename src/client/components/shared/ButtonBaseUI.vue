<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--disabled': disabled,
        'base-button--loading': loading,
        'base-button--full-width': fullWidth,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="base-button__loader"
      aria-hidden="true"
    />

    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-family: inherit;
  font-weight: 600;
  line-height: 1;

  cursor: pointer;
  user-select: none;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    opacity 0.15s ease,
    transform 0.15s ease;
}

.base-button:active:not(:disabled) {
  transform: translateY(1px);
}

.base-button:disabled {
  cursor: not-allowed;
}

.base-button--sm {
  min-height: 34px;
  padding: 0 12px;
  font-size: 13px;
}

.base-button--md {
  min-height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.base-button--lg {
  min-height: 46px;
  padding: 0 20px;
  font-size: 15px;
}

.base-button--full-width {
  width: 100%;
}

.base-button--primary {
  background: #111827;
  border-color: #111827;
  color: #ffffff;
}

.base-button--primary:hover:not(:disabled) {
  background: #1f2937;
  border-color: #1f2937;
}

.base-button--secondary {
  background: #ffffff;
  border-color: #d1d5db;
  color: #111827;
}

.base-button--secondary:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.base-button--ghost {
  background: transparent;
  border-color: transparent;
  color: #374151;
}

.base-button--ghost:hover:not(:disabled) {
  background: #f3f4f6;
}

.base-button--danger {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}

.base-button--danger:hover:not(:disabled) {
  background: #b91c1c;
  border-color: #b91c1c;
}

.base-button--disabled,
.base-button--loading {
  opacity: 0.6;
}

.base-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-button__loader {
  width: 14px;
  height: 14px;

  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 999px;

  animation: base-button-spin 0.7s linear infinite;
}

@keyframes base-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
