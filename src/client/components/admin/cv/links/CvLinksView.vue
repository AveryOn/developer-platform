<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import type { Profile } from '~/shared/dto/cv/profile.dto'
import Icon from '~/client/components/common/Icon.vue'
import { mdiPlus } from '@mdi/js'
import ProfileActiveBadge from '~/client/components/shared/ProfileActiveBadge.vue'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'

const profiles = ref<Profile[]>([])
const selectedProfileId = ref<string | null>(null)

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
    <div class="cv-links__action-block">
      <a href="/admin/cv/profile/new"
        class="action-button text-[--primary-color-4] bg-[--primary-color-3] px-[8px] py-[4px] rounded-[6px]">
        <Icon :icon="mdiPlus" :size="24"></Icon>
      </a>
    </div>
    <div class="cv-links__main-block">
      <ul class="profiles-list">
        <li v-for="profile in profiles" :key="profile.id" class="profile-list-item">
          <a @click="">
            <div class="flex w-full justify-between">
              <h2 class="profile-item__header w-full">
                {{ profile.title }}
              </h2>
              <ProfileActiveBadge :is-active="profile.isActive" />
            </div>
            <div class="flex items-center gap-[14px] w-full text-[--text-color-3] py-[8px] px-[8px]">
              <div class="bg-[--primary-color-3-100] px-[8px] py-[4px] rounded-[4px] font-bold">
                {{
                  `${profile.firstName}
                ${profile.lastName}`
                }}
              </div>
              <div>
                {{ profile.summary }}
              </div>
            </div>
          </a>
        </li>
      </ul>

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

.cv-links__action-block {
  display: flex;
  justify-content: end;
  width: 100%;
  height: 50px;
  padding: 10px 24px;
  border-bottom: 1px dotted var(--border-color-1);
}

.action-button {
  transition: all 0.3s ease;
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

.profiles-list {
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 12px 24px;
  gap: 8px;
}

.profile-list-item {
  padding: 12px;
  background-color: var(--primary-color-3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-list-item:hover {
  transition: all 0.3s ease;
  background-color: var(--primary-color-3-hover);
}

.profile-item__header {
  padding-bottom: 6px;
  padding-left: 4px;
  border-bottom: 1px solid var(--border-color-1);
}
</style>
