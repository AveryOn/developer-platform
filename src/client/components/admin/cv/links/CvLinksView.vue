<script setup lang="ts">
import { mdiHandOkay, mdiPen, mdiUndo } from '@mdi/js'
import { onBeforeMount, ref } from 'vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import Icon from '~/client/components/common/Icon.vue'
import SelectInputUI, {
  type SelectOption,
} from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import { _ } from '~/shared/const'
import type { Link } from '~/shared/dto/cv/link.dto'
import type { SocialNetwork } from '~/shared/types'
import type { LinkInput } from '~/shared/dto/cv/link.dto';
import InputUI from '~/client/components/shared/InputUI.vue'
import { sleep } from '~/shared/async'

useKeyboard({
  esc: resetSelection,
})

const profiles = ref<SelectOption[]>([])
const selectedProfileId = ref<string>('')
const links = ref<Link[]>([
  {
    id: 'link_1',
    label: 'GitHub',
    createdAt: '2026-06-11T10:00:00.000Z',
    updatedAt: '2026-06-11T10:00:00.000Z',
    profileId: 'profile_1',
    type: 'github' as SocialNetwork,
    url: 'https://github.com/example-user',
    order: 1,
    isVisible: true,
  },
  {
    id: 'link_2',
    label: 'LinkedIn',
    createdAt: '2026-06-11T10:05:00.000Z',
    updatedAt: '2026-06-11T10:05:00.000Z',
    profileId: 'profile_1',
    type: 'linkedin' as SocialNetwork,
    url: 'https://linkedin.com/in/example-user',
    order: 2,
    isVisible: true,
  },
  {
    id: 'link_3',
    label: 'Portfolio',
    createdAt: '2026-06-11T10:10:00.000Z',
    updatedAt: '2026-06-11T10:10:00.000Z',
    profileId: 'profile_1',
    type: 'website' as SocialNetwork,
    url: 'https://example.dev',
    order: 3,
    isVisible: false,
  },
])
const selectedLink = ref<Link | null>(null)

type LinkEditData = Partial<Record<keyof LinkInput, {
  oldValue: LinkInput[keyof LinkInput]
  newValue: LinkInput[keyof LinkInput]
  focused: boolean,
  loading: boolean,
}>>
const editLinkFormData = ref<LinkEditData>({
  isVisible: { newValue: _, oldValue: _, focused: false, loading: false },
  label: { newValue: _, oldValue: _, focused: false, loading: false },
  order: { newValue: _, oldValue: _, focused: false, loading: false },
  profileId: { newValue: _, oldValue: _, focused: false, loading: false },
  type: { newValue: _, oldValue: _, focused: false, loading: false },
  url: { newValue: _, oldValue: _, focused: false, loading: false },
})

async function uploadProfiles(): Promise<SelectOption[]> {
  const profiles = await CvProfileApi.getAll()
  return profiles.map((p) => {
    return {
      label: p.title,
      value: p.id,
    }
  })
}

function selectLink(link: Link) {
  selectedLink.value = link
  for (const key of Object.keys(link)) {
    const k = key as keyof typeof link
    editLinkFormData.value[k] = {
      newValue: link[k],
      oldValue: link[k],
      focused: false,
      loading: false
    }
  }
}

function resetSelection() {
  selectedLink.value = null
  Object.values(editLinkFormData.value).forEach((v) => {
    v.newValue = _
    v.oldValue = _
    v.focused = false
    v.loading = false
  })
}

/** Зафиксировать изменения в поле */
function commitChange(field: keyof LinkInput) {
  editLinkFormData.value[field]!.oldValue = editLinkFormData.value[field]!.newValue
}

/** Отменить изменения в поле */
function undoChanges(field: keyof LinkInput) {
  editLinkFormData.value[field]!.newValue = editLinkFormData.value[field]?.oldValue
  resetFocus(field)
}

/** Проверка есть ли изменения в поле */
function hasChanges(field: keyof LinkInput) {
  return editLinkFormData.value[field]!.newValue !== editLinkFormData.value[field]?.oldValue
}

/** Сбросить фокус на поле */
function resetFocus(field: keyof LinkInput) {
  editLinkFormData.value[field]!.focused = false
}

/** Подтвердить изменение поля */
async function confirmUpdateField(field: keyof LinkInput) {
  try {
    if (!hasChanges(field)) return
    editLinkFormData.value[field]!.loading = true

    await sleep(1000)
    resetFocus(field)
    commitChange(field)
  }
  finally {
    editLinkFormData.value[field]!.loading = false
  }
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
        <ul class="flex flex-col gap-[10px] w-[50%]">
          <li v-for="link in links" :key="link.id" class="link-item"
            :class="{ 'bg-[--primary-color-3-100]': link.id === selectedLink?.id }" @click="() => selectLink(link)">
            <span>{{ link.label }}</span>
            <div class="link-item__actions">
              <Icon :icon="mdiPen" :size="16"></Icon>
            </div>
          </li>
        </ul>

        <!-- SEPARATOR -->
        <Transition name="separator">
          <div v-if="selectedLink" class="links-separator"></div>
        </Transition>

        <Transition name="link-editor">
          <div v-if="selectedLink" class="w-[50%] link-edit-overlay">
            <form class="link-edit-form" @submit.prevent>

              <!-- LABEL FIELD -->
              <div class="link-edit-item">
                <div class="flex items-center justify-between">
                  <p class="link-edit-item__key">Label:</p>

                  <InputUI v-if="editLinkFormData['label']?.focused"
                    v-model="editLinkFormData['label']!.newValue! as string" size="xsmall" class="w-[50%]!"
                    placeholder="Label">
                  </InputUI>
                  <p v-else class="link-edit-item__value" @click="editLinkFormData['label']!.focused = true">
                    {{ editLinkFormData.label?.oldValue }}
                  </p>

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('label')" />
                    <span v-if="editLinkFormData!['label']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('label')" />
                  </div>
                </div>
              </div>

              <!-- PROFILE_ID FIELD -->
              <div class="link-edit-item">
                <div class="flex items-center justify-between">
                  <p class="link-edit-item__key">Profile:</p>

                  <!-- <InputUI v-if="editLinkFormData['label']?.focused"
                    v-model="editLinkFormData['label']!.newValue! as string" size="xsmall" class="w-[50%]!"
                    placeholder="Label">
                  </InputUI> -->
                  <SelectInputUI v-if="editLinkFormData['profileId']?.focused" :options="profiles"></SelectInputUI>
                  <p v-else class="link-edit-item__value" @click="editLinkFormData['profileId']!.focused = true">
                    {{ editLinkFormData.profileId?.oldValue }}
                  </p>

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('profileId')" />
                    <span v-if="editLinkFormData!['profileId']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('profileId')" />
                  </div>
                </div>
              </div>

            </form>
          </div>
        </Transition>

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
  cursor: pointer;
  background-color: var(--primary-color-3);
  transition: all 0.3s ease;
  padding: 3px 8px;
  border-radius: 4px;
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
