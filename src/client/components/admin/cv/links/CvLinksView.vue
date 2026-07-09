<script setup lang="ts">
import { mdiChevronDownBoxOutline, mdiChevronUpBoxOutline, mdiHandOkay, mdiPen, mdiUndo } from '@mdi/js'
import { computed, onBeforeMount, ref } from 'vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import Icon from '~/client/components/common/Icon.vue'
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import { _ } from '~/shared/const'
import type { Link, PatchCvLinkDto } from '~/shared/dto/cv/link.dto'
import { SocialNetworks } from '~/shared/types'
import type { LinkInput } from '~/shared/dto/cv/link.dto';
import InputUI from '~/client/components/shared/InputUI.vue'
import { sleep } from '~/shared/async'
import CheckboxUI from '~/client/components/shared/CheckboxUI.vue'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import { AppRoutes } from '~/shared/router'
import { useProfiles } from '~/client/composables/useProfiles'
import { useToast } from '~/client/composables/useToast'

useKeyboard({
  esc: resetSelection,
})
const toast = useToast()
const {
  profiles,
  selectedProfileId
} = useProfiles({ setFirstAsSelect: true })

interface LinkOrderItem {
  id: string
  order: number
  label?: string
}

const links = ref<Link[]>([])
const linksOrder = ref<LinkOrderItem[]>([])
const isSaveReorderLoading = ref(false)
const isSubmitFormChangesLoading = ref(false)

/** true - если порядок ссылок изменен */
const linksAreReordered = computed(() => {
  for (let i = 0; i < links.value.length; i++) {
    const link = links.value[i];
    if (linksOrder.value[i].order !== link.order) {
      return true
    }
  }
  return false
})

const linksByProfileId = computed(() => {
  if (!selectedProfileId.value) return links.value
  return links.value.filter(v => (v.profileId === selectedProfileId.value))
})
const selectedLink = ref<Link | null>(null)

type LinkEditData = Partial<Record<keyof LinkInput, {
  oldValue: LinkInput[keyof LinkInput]
  newValue: LinkInput[keyof LinkInput]
  focused: boolean,
  loading: boolean,
}>>
type LinkEditBody = Partial<Record<keyof LinkInput, LinkInput[keyof LinkInput]>>

const editLinkFormData = ref<LinkEditData>({
  isVisible: { newValue: _, oldValue: _, focused: false, loading: false },
  label: { newValue: _, oldValue: _, focused: false, loading: false },
  order: { newValue: _, oldValue: _, focused: false, loading: false },
  profileId: { newValue: _, oldValue: _, focused: false, loading: false },
  type: { newValue: _, oldValue: _, focused: false, loading: false },
  url: { newValue: _, oldValue: _, focused: false, loading: false },
})

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
  resetChangesOrder()
}

/** Обновляет исходный массив ссылок после изменений */
function refreshSource(body: LinkEditBody) {
  links.value = links.value.map((l) => {
    if (l.id === selectedLink.value?.id) {
      return { ...l, ...body as Link }
    }
    return l
  })
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

/** Есть ли хотя бы одно изменение сущности link */
const someChange = computed(() => {
  return Object
    .values(editLinkFormData.value)
    .some((v) => v.newValue !== v.oldValue)
})

/** Подтвердить изменение поля */
async function confirmUpdateField(field: keyof LinkInput) {
  try {
    if (!selectedLink.value) return
    if (!hasChanges(field)) return
    editLinkFormData.value[field]!.loading = true

    const body = { [field]: editLinkFormData.value[field]?.newValue }
    const result = await CvLinksApi.patch(selectedLink.value.id, body)
    if (!result) throw _;

    //  Зафиксировать изменение в исходном массиве
    refreshSource(body)
    resetFocus(field)
    resetSelection()

    toast.success('Ссылка изменена', { duration: 3000, title: 'Success!' })
  }
  catch (err) {
    console.error(err)
    toast.error('Произошла ошибка при обновлении поля', {
      duration: 3000,
      title: 'Ошибка',
    })
  }
  finally {
    editLinkFormData.value[field]!.loading = false
  }
}

function resetFormChanges() {
  for (const k of Object.keys(editLinkFormData.value)) {
    undoChanges(k as keyof LinkInput)
  }
}

async function submitFormChanges() {
  try {
    isSubmitFormChangesLoading.value = true

    if (!selectedLink.value) return
    // Если изменений форме ссылки нет, тогда выход
    if (!someChange.value) return

    // Собираем объект измененных полей ссылки
    const body: LinkEditBody = {}
    for (const [k, v] of Object.entries(editLinkFormData.value)) {
      if (hasChanges(k as keyof LinkInput)) {
        body[k as keyof LinkInput] = v.newValue
      }
    }
    const result = await CvLinksApi.patch(selectedLink.value?.id, body as PatchCvLinkDto)
    if (!result) throw _

    //  Зафиксировать изменение в исходном массиве
    refreshSource(body)
    resetSelection()
    toast.success('Ссылка изменена', { duration: 3000, title: 'Success!' })
  } catch (err) {
    console.error(err)
    toast.error('Произошла ошибка при изменении данных ссылки', {
      duration: 3000,
      title: 'Ошибка',
    })
  }
  finally {
    isSubmitFormChangesLoading.value = false
  }

}

async function saveNewOrder() {
  try {
    isSaveReorderLoading.value = true

    const success = await CvLinksApi.reorder({
      linksOrder: linksOrder.value,
      profileId: selectedProfileId.value,
    })

    if (success) {
      // Обновление ссылок для сброса состояния
      await uploadLinks()
    }
  } catch (err) {
    console.error(err)
    toast.error('Произошла ошибка при изменении порядка ссылок', {
      duration: 3000,
      title: 'Ошибка',
    })
  }
  finally {
    isSaveReorderLoading.value = false
  }
}

function moveLink(direction: 'up' | 'down') {
  const selectedId = selectedLink.value?.id
  if (!selectedId) return

  const idx = links.value.findIndex((link) => link.id === selectedId)
  // MOVE UP
  if (direction === 'up') {
    if (idx <= 0) {
      return
    }
    ;[links.value[idx - 1], links.value[idx]] = [links.value[idx], links.value[idx - 1]]
  }
  // MOVE DOWNs
  else if (direction === 'down') {
    if (idx === -1 || idx === links.value.length - 1) {
      return
    }
    ;[links.value[idx], links.value[idx + 1]] = [links.value[idx + 1], links.value[idx]]
  }
  for (let i = 0; i < links.value.length; i++) {
    const link = links.value[i]

    linksOrder.value[i] = {
      id: link.id,
      order: i + 1,
      label: link.label,
    }
  }
}

function resetChangesOrder() {
  linksOrder.value = links.value
    .sort((a, b) => a.order - b.order)
    .map((v) => ({
      id: v.id,
      order: v.order,
      label: v.label
    }))
}

function goToNewLinkPage() {
  window.location.href = AppRoutes.admin.CvLinksNew
}

async function uploadLinks(options?: { resetSelection?: boolean }) {
  // Если Нужно сбросить прошлое состояние формы перед рендерингом нового списка ссылок
  if (options?.resetSelection) {
    resetSelection()
  }

  links.value = await CvLinksApi.getListByProfileId(
    selectedProfileId.value || _,
  )
  linksOrder.value = links.value.map((v) => ({ id: v.id, order: v.order, label: v.label }))
}

onBeforeMount(async () => {
  await uploadLinks({ resetSelection: true })
})
</script>

<template>
  <section class="cv-admin__links">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <SelectInputUI v-model="selectedProfileId" :options="profiles" :placeholder="'Select Profile'"
        @input="() => uploadLinks({ resetSelection: true })" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-center h-[100%] gap-[24px]">
        <div v-if="selectedLink" class="absolute left-[-36px] top-0 bottom-0 flex flex-col justify-between">
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronUpBoxOutline" @click="() => moveLink('up')"></Icon>
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronDownBoxOutline" @click="moveLink('down')">
          </Icon>
        </div>

        <TransitionGroup tag="ul" name="links-list" class="flex flex-col gap-[10px] w-[50%]">
          <li v-for="link in linksByProfileId" :key="link.id" class="link-item"
            :class="{ 'bg-[--primary-color-3-100]': link.id === selectedLink?.id }" @click="() => selectLink(link)">
            <span>{{ link.label }}</span>

            <div class="link-item__actions">
              <Icon :icon="mdiPen" :size="16" />
            </div>
          </li>
        </TransitionGroup>

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

                  <SelectInputUI v-if="editLinkFormData['profileId']?.focused"
                    v-model="editLinkFormData['profileId']!.newValue! as string" class="w-[50%]!" :options="profiles"
                    size="xsmall">
                  </SelectInputUI>
                  <p v-else class="link-edit-item__value" @click="editLinkFormData['profileId']!.focused = true">
                    {{profiles.find(v => v.value === editLinkFormData.profileId?.oldValue)?.label}}
                  </p>

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('profileId')" />
                    <span v-if="editLinkFormData!['profileId']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('profileId')" />
                  </div>
                </div>
              </div>

              <!-- TYPE FIELD -->
              <div class="link-edit-item">
                <div class="flex items-center justify-between">
                  <p class="link-edit-item__key">Type:</p>

                  <SelectInputUI v-if="editLinkFormData['type']?.focused"
                    v-model="editLinkFormData['type']!.newValue! as string" class="w-[50%]!"
                    :options="SocialNetworks.map(v => ({ label: v, value: v }))" size="xsmall">
                  </SelectInputUI>
                  <p v-else class="link-edit-item__value" @click="editLinkFormData['type']!.focused = true">
                    {{ editLinkFormData.type?.oldValue }}
                  </p>

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('type')" />
                    <span v-if="editLinkFormData!['type']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('type')" />
                  </div>
                </div>
              </div>

              <!-- URL FIELD -->
              <div class="link-edit-item">
                <div class="flex items-center justify-between">
                  <p class="link-edit-item__key">URL:</p>

                  <InputUI v-if="editLinkFormData['url']?.focused"
                    v-model="editLinkFormData['url']!.newValue! as string" size="xsmall" class="w-[50%]!"
                    placeholder="URL">
                  </InputUI>
                  <p v-else class="link-edit-item__value" @click="editLinkFormData['url']!.focused = true">
                    {{ editLinkFormData.url?.oldValue }}
                  </p>

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('url')" />
                    <span v-if="editLinkFormData!['url']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('url')" />
                  </div>
                </div>
              </div>

              <!-- IS_VISIBLE FIELD -->
              <div class="link-edit-item">
                <div class="flex items-center justify-between">
                  <p class="link-edit-item__key">Visible:</p>

                  <CheckboxUI v-model="editLinkFormData['isVisible']!.newValue! as boolean" />

                  <div class="link-edit-item__actions">
                    <Icon class="action-btn" :icon="mdiUndo" :size="26" @click="() => undoChanges('isVisible')" />
                    <span v-if="editLinkFormData!['isVisible']?.loading" class="base-button__loader" />
                    <Icon v-else class="action-btn" :icon="mdiHandOkay" :size="26"
                      @click="() => confirmUpdateField('isVisible')" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Transition>

      </div>

      <TransitionGroup tag="div" name="link-actions" class="w-full flex justify-center gap-[14px]">
        <ButtonBaseUI v-if="linksAreReordered" key="save-order" :loading="isSaveReorderLoading" @click="saveNewOrder">
          Save New Order
        </ButtonBaseUI>

        <ButtonBaseUI v-if="linksAreReordered" key="reset-order" :variant="'secondary'" @click="resetChangesOrder">
          Reset Order
        </ButtonBaseUI>

        <ButtonBaseUI key="create-new" @click="goToNewLinkPage">
          * Create New *
        </ButtonBaseUI>

        <ButtonBaseUI v-if="someChange" key="commit-changes" @click="submitFormChanges">
          Commit Changes
        </ButtonBaseUI>

        <ButtonBaseUI v-if="someChange" key="reset-changes" :variant="'secondary'" @click="resetFormChanges">
          Reset Changes
        </ButtonBaseUI>
      </TransitionGroup>
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

.move-link-btn {
  color: var(--primary-color-4);
  transition: all ease 0.2s;
  cursor: pointer;
}

.move-link-btn:hover {
  color: var(--primary-color-1);
  transition: all ease 0.2s;
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
  user-select: none;
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

/*--------------------------------------------------- */
.links-list-move {
  transition: transform 0.25s ease;
}

.links-list-enter-active,
.links-list-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.links-list-enter-from,
.links-list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ----------------------------------------------------- */
.link-actions-move {
  transition: transform 0.25s ease;
}

.link-actions-enter-active,
.link-actions-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.link-actions-enter-from,
.link-actions-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.link-actions-enter-to,
.link-actions-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
