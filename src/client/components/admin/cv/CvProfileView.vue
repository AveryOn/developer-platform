<script setup lang="ts">
import type { Profile } from '~/shared/dto/admin/cv/profile.dto';
import { ProfileLanguage } from '~/shared/types';

const profiles: Profile[] = [
  {
    id: 'b7f3a8c2-2f4e-4b1a-9f6d-8a2e3c1d5f10',
    language: ProfileLanguage.en,
    firstName: 'Vladislav',
    lastName: 'Everi',
    title: 'Backend Engineer',
    location: 'Tbilisi, Georgia',
    summary: 'Backend engineer focused on Node.js, TypeScript, API design, authentication, billing systems, and database architecture.',
    email: 'vladislav@example.com',
    phone: '+995 555 123 456',
    isActive: true,
    createdAt: '2026-06-01T10:00:00.000Z',
    updatedAt: '2026-06-05T14:30:00.000Z',
    deletedAt: null,
  },
  {
    id: 'd3a91f77-4b9c-4e8d-a6a7-6d23c7f4a901',
    language: ProfileLanguage.ru,
    firstName: 'Владислав',
    lastName: 'Эвери',
    title: 'Backend-разработчик',
    location: 'Тбилиси, Грузия',
    summary: 'Backend-разработчик с опытом работы с Node.js, TypeScript, REST API, авторизацией, биллингом и реляционными базами данных.',
    email: 'vladislav@example.com',
    phone: '+995 555 123 456',
    isActive: false,
    createdAt: '2026-06-02T09:15:00.000Z',
    updatedAt: '2026-06-06T11:20:00.000Z',
    deletedAt: null,
  },
  {
    id: '8c1e43b6-fbb2-43d2-9a2e-7fd9d94c3a5b',
    language: ProfileLanguage.en,
    firstName: 'Vlad',
    lastName: 'Everi',
    title: 'Fullstack Developer',
    location: null,
    summary: 'Fullstack developer working with Astro, Vue, Node.js, SQLite, Drizzle ORM, and server-side application architecture.',
    email: null,
    phone: null,
    isActive: false,
    createdAt: '2026-06-03T12:45:00.000Z',
    updatedAt: '2026-06-07T16:10:00.000Z',
    deletedAt: null,
  },
]


</script>

<template>
  <section class="cv-admin__profile">
    <div class="cv-profile__action-block"></div>
    <ul class="cv-profile__list-block">
      <li v-for="profile in profiles" :key="profile.id" class="profile-list-item">
        <h2 class="profile-item__header">{{ profile.title }}</h2>
        <div class="text-[--text-color-3] py-[8px] px-[8px]">> {{ profile.summary }}</div>
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
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: 1px dotted var(--border-color-1);
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
  transition: all 0.5s ease;
}
.profile-list-item:hover {
  transition: all 0.5s ease;
  background-color: var(--primary-color-1);
}

.profile-item__header {
  padding-bottom: 6px;
  padding-left: 4px;
  border-bottom: 1px solid var(--border-color-1);
}
</style>
