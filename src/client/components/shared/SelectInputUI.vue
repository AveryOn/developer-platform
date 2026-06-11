<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

const model = defineModel<string>({
  default: '',
})

const props = withDefaults(
  defineProps<{
    id?: string
    label?: string
    placeholder?: string
    disabled?: boolean
    error?: string
    throttleMs?: number
    options: SelectOption[]
  }>(),
  {
    id: undefined,
    label: undefined,
    placeholder: undefined,
    disabled: false,
    error: undefined,
    throttleMs: 0,
  },
)

const emit = defineEmits<{
  input: [value: string]
  throttledInput: [value: string]
}>()

const innerValue = ref(model.value)

let timer: ReturnType<typeof setTimeout> | null = null
let lastValue = innerValue.value

watch(model, (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value
  }
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value

  innerValue.value = value
  lastValue = value

  emit('input', value)

  if (props.throttleMs <= 0) {
    model.value = value
    emit('throttledInput', value)
    return
  }

  if (timer) {
    return
  }

  timer = setTimeout(() => {
    model.value = lastValue
    emit('throttledInput', lastValue)
    timer = null
  }, props.throttleMs)
}

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <div class="app-select">
    <label v-if="props.label" :for="props.id" class="app-select__label">
      {{ props.label }}
    </label>

    <div class="app-select__control">
      <select
        :id="props.id"
        :value="innerValue"
        class="app-select__field"
        :disabled="props.disabled"
        @change="handleChange"
      >
        <option v-if="props.placeholder" value="" disabled>
          {{ props.placeholder }}
        </option>

        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="app-select__arrow">⌄</span>
    </div>

    <p v-if="props.error" class="app-select__error">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.app-select__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-color-1);
}

.app-select__control {
  position: relative;
  width: 100%;
}

.app-select__field {
  width: 100%;
  min-height: 44px;
  height: 100%;

  padding: 0 42px 0 14px;

  border: 1px solid var(--border-color-1);
  border-radius: 10px;

  background: var(--primary-color-2);
  color: white;

  font-size: 16px;
  line-height: 1;
  font-family: inherit;

  outline: none;
  appearance: none;

  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

.app-select__field:focus {
  border-color: var(--primary-color-1);
  box-shadow: 0 0 0 3px var(--primary-color-3);
}

.app-select__field:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.app-select__field option {
  background: var(--primary-color-2);
  color: white;
}

.app-select__arrow {
  position: absolute;
  top: 50%;
  right: 14px;

  transform: translateY(-55%);

  color: var(--primary-color-1);
  font-size: 18px;
  line-height: 1;

  pointer-events: none;
}

.app-select__error {
  margin: 0;
  font-size: 13px;
  color: #d66a6a;
}
</style>
