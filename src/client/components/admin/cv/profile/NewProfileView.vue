<script setup lang="ts">
import { reactive } from 'vue';
import InputUI from '~/client/components/shared/InputUI.vue';
import { ProfileLanguage } from '~/shared/types';

// export const createCvProfileDto = z.object({
//   language: z.enum(ProfileLanguages),
//   firstName: z.string().trim().min(1),
//   lastName: z.string().trim().min(1),
//   title: z.string().trim().min(1),
//   location: z.string().trim().optional().nullable(),
//   summary: z.string().trim().min(1),
//   email: z.email().optional().nullable(),
//   phone: z.string().trim().optional().nullable(),
//   isActive: z.boolean().optional().default(false),
// })

const formData = reactive({
  title: '',
  firstName: '',
  lasName: '',
  language: ProfileLanguage.en,
  location: null,
  summary: '',
  email: null,
  phone: null,
  isActive: false,
})
</script>

<template>
  <section class="cv-admin__profile-new">
    <form class="profile-new-form" @submit.prevent>
      <InputUI v-model="formData.title" type="text" placeholder="Title"></InputUI>
    </form>
  </section>
</template>

<style scoped>
.cv-admin__profile-new {
  display: flex;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
}

.profile-new-form {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  width: 420px;
  padding: 12px 20px;
}
</style>
