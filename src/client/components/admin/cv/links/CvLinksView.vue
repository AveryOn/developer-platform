<script setup lang="ts">
import { mdiPen } from '@mdi/js'
import { onMounted, reactive, ref } from 'vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import Icon from '~/client/components/common/Icon.vue'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import InputUI from '~/client/components/shared/InputUI.vue'
import SelectInputUI, {
  type SelectOption,
} from '~/client/components/shared/SelectInputUI.vue'
import { _ } from '~/shared/const'
import type { Link } from '~/shared/dto/cv/link.dto'
import type { SocialNetwork } from '~/shared/types'

const profileSelectItems = ref<SelectOption[]>([])
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
const editLinksMap = reactive<Record<string, boolean>>({})
const newLinkLabel = ref('')

async function uploadProfiles(): Promise<SelectOption[]> {
  const profiles = await CvProfileApi.getAll()
  return profiles.map((p) => {
    return {
      label: p.title,
      value: p.id,
    }
  })
}

function toggleLinkForEditing(link: Link) {
  const isEditing = !editLinksMap[link.id]
  editLinksMap[link.id] = isEditing
  if (isEditing === true) {
    newLinkLabel.value = link.label
  }
  Object
    .keys(editLinksMap)
    .forEach((l) => {
      if (l === link.id) {
        return
      }
      editLinksMap[l] = false
    })
}

onMounted(async () => {
  profileSelectItems.value = await uploadProfiles()
  const links = await CvLinksApi.getListByProfileId(
    selectedProfileId.value ?? _,
  )
  links.forEach((l) => {
    editLinksMap[l.id] = false
  })
})
</script>

<template>
  <section class="cv-admin__links">
    <form class="flex flex-col gap-[24px] min-w-[480px] w-[460px]" @submit.prevent>
      <SelectInputUI v-model="selectedProfileId" :options="profileSelectItems" :placeholder="'Select Profile'" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-between h-[100%] gap-[24px]">
        <ul class="flex flex-col gap-[10px] w-[50%]">
          <li v-for="link in links" :key="link.id" class="link-item">
            <div v-if="editLinksMap[link.id]" class="flex items-center gap-[8px]">
              <InputUI v-model="newLinkLabel" size="xsmall" @click.stop />
              <ButtonBaseUI size="xsmall">Confirm</ButtonBaseUI>
            </div>
            <span v-else @click="toggleLinkForEditing(link)">{{ link.label }}</span>
            <div class="link-item__actions">
              <Icon :icon="mdiPen" :size="16"></Icon>
            </div>
          </li>
        </ul>

        <!-- SEPARATOR -->
        <div class="absolute top-0 left-[50%] transform-translate-x-[-50%] bottom-0 w-[10px] bg-[--primary-color-5]">
        </div>

        <div class="w-[50%] flex flex-col bg-[primary-colo-4] link-edit-block"></div>

      </div>
    </form>
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

.link-edit-block {
  border: 1px solid red;
  padding: 10px;
}
</style>
