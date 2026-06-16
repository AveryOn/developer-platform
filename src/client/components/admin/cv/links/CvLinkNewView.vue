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
})
</script>

<template>
  <section class="cv-admin__links_new">
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
.cv-admin__links_new {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
  padding: 24px 48px;
}
</style>
