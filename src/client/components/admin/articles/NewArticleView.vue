<script setup lang="ts">
import TextareaUI from '~/client/components/shared/TextareaUI.vue';
import { UseI18n } from '~/client/composables/useI18n';

const { $t } = UseI18n()
</script>

<template>
  <div class="new-article-viewer">
    <div class="viewer-input-block">
      <TextareaUI :placeholder="$t('Input Here')" :rows="20"></TextareaUI>
    </div>
    <div class="viewer-preview-block">
      <p>ТУТ БУДЕТ MARKDOWN TEMPLATE</p>
    </div>
  </div>
</template>

<style scoped>
.new-article-viewer {
  width: 100%;
  height: max-content;
  display: flex;
  border: 1px dashed rgba(128, 128, 128, 0.205);
  padding: 24px 8px;
  gap: 12px;
}

.viewer-input-block {
  width: 50%;
}

.viewer-preview-block {
  width: 50%;
  background-color: var(--primary-color-2);
  border-radius: 10px;
  border: 1px solid var(--border-color-1);
}
</style>
