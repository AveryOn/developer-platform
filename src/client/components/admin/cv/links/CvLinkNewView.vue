<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import SelectInputUI, {
  type SelectOption,
} from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import { _ } from '~/shared/const'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'

useKeyboard({
  esc: () => { },
})

const profiles = ref<SelectOption[]>([])
const selectedProfileId = ref<string>('')

async function uploadProfiles(): Promise<SelectOption[]> {
  const profiles = await CvProfileApi.getAll()
  return profiles.map((p) => {
    return {
      label: p.title,
      value: p.id,
    }
  })
}

onBeforeMount(async () => {
  profiles.value = await uploadProfiles()
  const uploadedLinks = await CvLinksApi.getListByProfileId(
    selectedProfileId.value || _,
  )
  console.debug(uploadedLinks)
  // links.value = uploadedLinks
})
</script>

<template>
  <section class="cv-admin__links">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <SelectInputUI v-model="selectedProfileId" :options="profiles" :placeholder="'Select Profile'" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-center h-[100%] gap-[24px]">
      </div>

      <div class="w-full flex justify-center">
        <ButtonBaseUI>Save</ButtonBaseUI>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-admin__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
  padding: 24px 48px;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid var(--border-color-1);
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.link-item:hover {
  background-color: var(--primary-color-3);
  transition: all 0.3s ease;
}

.link-edit-overlay {
  padding: 10px;
}

.link-edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-edit-item {
  border-right: 1px solid var(--border-color-1);
  border-left: 1px solid var(--border-color-1);
  padding: 4px 8px;
  background-color: var(--primary-color-6);
}

.link-edit-item__value {
  width: 50%;
  margin-left: auto;
  margin-right: 16px;
  overflow: hidden;

  padding: 3px 8px;
  border-radius: 4px;

  background-color: var(--primary-color-3);
  cursor: pointer;

  white-space: nowrap;
  text-overflow: ellipsis;

  transition: all 0.3s ease;
}

.link-edit-item__value:hover {
  transition: all 0.3s ease;
  background-color: var(--primary-color-3-100);
}

.link-edit-item__actions {
  display: flex;
  align-items: center;
  margin-left: 4px;
  /* border-left: 2px solid var(--border-color-1); */
  gap: 2px;
}

.action-btn {
  cursor: pointer;
  border-radius: 4px;
  padding: 4px;
  background-color: var(--primary-color-3);
  transition: all 0.3s ease;
}

.action-btn:hover {
  transition: all 0.3s ease;
  background-color: var(--primary-color-3-100);
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

/* --------------------------------------------------- */
.links-separator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  transform: translateX(-50%);
  transform-origin: top;
  background-color: var(--primary-color-5);
}

/* Вертикальный разделитель */
.separator-enter-active,
.separator-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.separator-enter-from,
.separator-leave-to {
  opacity: 0;
  transform: translateX(-50%) scaleY(0);
}

.separator-enter-to,
.separator-leave-from {
  opacity: 1;
  transform: translateX(-50%) scaleY(1);
}

/* Панель редактирования */
.link-editor-enter-active,
.link-editor-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.link-editor-enter-from,
.link-editor-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

.link-editor-enter-to,
.link-editor-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
