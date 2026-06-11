<script setup lang="ts">
import Icon from '~/client/components/common/Icon.vue'
import { mdiPlus } from '@mdi/js'
import type { Profile } from '~/shared/dto/admin/cv/profile.dto';

const props = defineProps<{
  uuid: string,
  profile: Profile,
}>()

</script>

<template>
  <section class="cv-admin__profile-by-id">
    {{ props.uuid }}
    <div class="cv-profile__action-block">
      <a
        href="/admin/cv/profile/new"
        class="action-button text-[--primary-color-4] bg-[--primary-color-3] px-[8px] py-[4px] rounded-[6px]"
      >
        <Icon :icon="mdiPlus" :size="24"></Icon>
      </a>
    </div>
    <ul class="cv-profile__list-block">
      <!-- <li
        v-for="profile in profiles"
        :key="profile.id"
        class="profile-list-item"
      >
        <h2 class="profile-item__header">{{ profile.title }}</h2>
        <div class="text-[--text-color-3] py-[8px] px-[8px]">
          > {{ profile.summary }}
        </div>
      </li> -->
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
</style>
