<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import SelectInputUI, {
  type SelectOption,
} from '~/client/components/shared/SelectInputUI.vue'
import { _ } from '~/shared/const'
import type { Link } from '~/shared/dto/cv/link.dto'

const profileSelectItems = ref<SelectOption[]>([])
const selectedProfileId = ref<string>('')
const links = ref<Link[]>([])

async function uploadProfiles(): Promise<SelectOption[]> {
  const profiles = await CvProfileApi.getAll()
  return profiles.map((p) => {
    return {
      label: p.title,
      value: p.id,
    }
  })
}

onMounted(async () => {
  profileSelectItems.value = await uploadProfiles()
  links.value = await CvLinksApi.getListByProfileId(
    selectedProfileId.value ?? _,
  )
})
</script>

<template>
  <section class="cv-admin__links">
    <form
      class="flex flex-col gap-[24px] min-w-[460px] w-[460px]"
      @submit.prevent
    >
      <SelectInputUI
        v-model="selectedProfileId"
        :options="profileSelectItems"
        :placeholder="'Select Profile'"
      />

      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div>
        <ul>
          <li></li>
        </ul>
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
</style>
