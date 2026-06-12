<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import type { Profile } from '~/shared/dto/cv/profile.dto'
// import { CvLinksApi } from '~/client/api/admin/cv/links.api'

const profiles = ref<Profile[]>([])
// const selectedProfileId = ref<string | null>(null)

// function getProfileList() {

// }

// function loadLinks() {
//   if(!selectedProfileId.value) return
//   CvLinksApi.getListByProfileId()
// }

onMounted(async () => {
  profiles.value = await CvProfileApi.getAll()
})
</script>

<template>
  <section class="cv-admin__links">
    <div class="cv-links__main-block">
      <div class="profiles-selector-block">
      </div>

      <div class="px-[4px] bg-[--primary-color-5] top-0 bottom-0 my-[14px]"></div>

      <div class="w-[50%]">
        <h1>HELLO</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-admin__links {
  display: flex;
  min-height: 60vh;
  flex-direction: column;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
}

.action-button:hover {
  background-color: var(--primary-color-3-hover);
  transition: all 0.3s ease;
}

.cv-links__main-block {
  position: relative;
  display: flex;
  border: 1px solid red;
}
</style>
