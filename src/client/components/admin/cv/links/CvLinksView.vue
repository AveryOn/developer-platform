<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import SelectInputUI, {
  type SelectOption,
} from '~/client/components/shared/SelectInputUI.vue'
// import { CvLinksApi } from '~/client/api/admin/cv/links.api'

const profileSelectItems = ref<SelectOption[]>([])
// const selectedProfileId = ref<string | null>(null)

// function getProfileList() {

// }

// function loadLinks() {
//   if(!selectedProfileId.value) return
//   CvLinksApi.getListByProfileId()
// }

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
})
</script>

<template>
  <section class="cv-admin__links">
    <form
      class="flex flex-col gap-[24px] min-w-[460px] w-[460px]"
      @submit.prevent
    >
      <SelectInputUI
        :options="profileSelectItems"
        :placeholder="'Select Profile'"
      ></SelectInputUI>

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
