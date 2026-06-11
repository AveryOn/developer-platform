<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import type { Profile } from '~/shared/dto/admin/cv/profile.dto'
import Icon from '~/client/components/common/Icon.vue'
import { mdiCheckCircleOutline, mdiPlus } from '@mdi/js'
import { AppRoutes } from '~/shared/router'

// import type { Profile } from '~/shared/dto/admin/cv/profile.dto';
// import { ProfileLanguage } from '~/shared/types';

// const profiles: Profile[] = [
//   {
//     id: 'b7f3a8c2-2f4e-4b1a-9f6d-8a2e3c1d5f10',
//     language: ProfileLanguage.en,
//     firstName: 'Vladislav',
//     lastName: 'Everi',
//     title: 'Backend Engineer',
//     location: 'Tbilisi, Georgia',
//     summary: 'Backend engineer focused on Node.js, TypeScript, API design, authentication, billing systems, and database architecture.',
//     email: 'vladislav@example.com',
//     phone: '+995 555 123 456',
//     isActive: true,
//     createdAt: '2026-06-01T10:00:00.000Z',
//     updatedAt: '2026-06-05T14:30:00.000Z',
//     deletedAt: null,
//   },
//   {
//     id: 'd3a91f77-4b9c-4e8d-a6a7-6d23c7f4a901',
//     language: ProfileLanguage.ru,
//     firstName: 'Владислав',
//     lastName: 'Эвери',
//     title: 'Backend-разработчик',
//     location: 'Тбилиси, Грузия',
//     summary: 'Backend-разработчик с опытом работы с Node.js, TypeScript, REST API, авторизацией, биллингом и реляционными базами данных.',
//     email: 'vladislav@example.com',
//     phone: '+995 555 123 456',
//     isActive: false,
//     createdAt: '2026-06-02T09:15:00.000Z',
//     updatedAt: '2026-06-06T11:20:00.000Z',
//     deletedAt: null,
//   },
//   {
//     id: '8c1e43b6-fbb2-43d2-9a2e-7fd9d94c3a5b',
//     language: ProfileLanguage.en,
//     firstName: 'Vlad',
//     lastName: 'Everi',
//     title: 'Fullstack Developer',
//     location: null,
//     summary: 'Fullstack developer working with Astro, Vue, Node.js, SQLite, Drizzle ORM, and server-side application architecture.',
//     email: null,
//     phone: null,
//     isActive: false,
//     createdAt: '2026-06-03T12:45:00.000Z',
//     updatedAt: '2026-06-07T16:10:00.000Z',
//     deletedAt: null,
//   },
// ]

const profiles = ref<Profile[]>([])

onMounted(async () => {
  profiles.value = await CvProfileApi.getAll()
})
</script>

<template>
  <section class="cv-admin__profile">
    <div class="cv-profile__action-block">
      <a href="/admin/cv/profile/new"
        class="action-button text-[--primary-color-4] bg-[--primary-color-3] px-[8px] py-[4px] rounded-[6px]">
        <Icon :icon="mdiPlus" :size="24"></Icon>
      </a>
    </div>
    <ul class="cv-profile__list-block">
      <li v-for="profile in profiles" :key="profile.id" class="profile-list-item">
        <a :href="AppRoutes.admin.CvProfileById(profile.id)">
          <div class="flex w-full justify-between">
            <h2 class="profile-item__header w-full">
              {{ profile.title }}
            </h2>
            <span class="cv-profile-by-id__status" :class="{
              'cv-profile-by-id__status--active': profile.isActive,
              'cv-profile-by-id__status--inactive': !profile.isActive,
            }">
              <Icon :icon="mdiCheckCircleOutline" :size="16" />
              {{ profile.isActive ? 'Active' : 'Inactive' }}
            </span>
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
  </section>
</template>

<style scoped>
.cv-admin__profile {
  display: flex;
  min-height: 60vh;
  flex-direction: column;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
}

.cv-profile__action-block {
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

.cv-profile__list-block {
  display: flex;
  flex-direction: column;
  height: 100%;
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

.cv-profile-by-id__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  min-height: 34px;
  padding: 0 10px;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;
}

.cv-profile-by-id__status--active {
  background-color: rgb(22 163 74 / 12%);
  color: #16a34a;
}

.cv-profile-by-id__status--inactive {
  background-color: rgb(107 114 128 / 12%);
  color: var(--text-color-3);
}
</style>
