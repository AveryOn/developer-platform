<script setup lang="ts">
import { ref } from 'vue';
import TextareaUI from '~/client/components/shared/TextareaUI.vue';
import { UseI18n } from '~/client/composables/useI18n';
import { renderMarkdown } from '~/shared/utils/markdown/renderMarkdown';
import MarkdownBody from '~/client/components/shared/MarkdownBody.vue';

const rawValue = ref('')
const html = ref('')

const { $t } = UseI18n()
async function handlerInput(input: string) {
  html.value = await renderMarkdown(input)
}
</script>

<template>
  <div class="new-article-viewer">
    <div class="viewer-input-block">
      <TextareaUI v-model="rawValue" :placeholder="$t('Input Here')" :rows="20" :throttle-ms="800"
        @throttled-input="handlerInput">
      </TextareaUI>
    </div>
    <div class="viewer-preview-block">
      <MarkdownBody :html="html" :uuid="'none'" />
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
