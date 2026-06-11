<script setup lang="ts">
import { reactive, ref } from 'vue'
import CheckboxUI from '~/client/components/shared/CheckboxUI.vue'
import EmailInputUI from '~/client/components/shared/EmailInputUI.vue'
import InputUI from '~/client/components/shared/InputUI.vue'
import PhoneInputUI from '~/client/components/shared/PhoneInputUI.vue'
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue'
import TextareaUI from '~/client/components/shared/TextareaUI.vue'
import { ProfileLanguage } from '~/shared/types'

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
  location: '',
  summary: '',
  email: '',
  phone: '',
  isActive: false,
})

const phoneError = ref('')
const emailError = ref('')

const languageOptions = [
  {
    label: 'English',
    value: ProfileLanguage.en,
  },
  {
    label: 'Russian',
    value: ProfileLanguage.ru,
  },
  {
    label: 'French',
    value: ProfileLanguage.fr,
  },
]
</script>

<template>
  <section class="cv-admin__profile-new">
    <form class="profile-new-form" @submit.prevent>
      <!-- TITLE -->
      <InputUI
        v-model="formData.title"
        type="text"
        label="Profile Title"
        placeholder="Title"
      />
      <InputUI
        v-model="formData.firstName"
        type="text"
        label="First Name"
        placeholder="Alex"
      />
      <InputUI
        v-model="formData.lasName"
        type="text"
        label="Last Name"
        placeholder="Mercer"
      />

      <!-- LANGUAGE -->
      <SelectInputUI
        v-model="formData.language"
        :options="languageOptions"
      ></SelectInputUI>

      <InputUI
        id="location"
        v-model="formData.location"
        label="Location"
        placeholder="Tbilisi, Georgia"
      />

      <!-- IS ACTIVE PROFILE -->
      <CheckboxUI
        id="profile-is-active"
        v-model="formData.isActive"
        label="Active profile"
      />

      <!-- PHONE NUMBER -->
      <PhoneInputUI
        id="profile-phone"
        v-model="formData.phone"
        label="Phone"
        default-country="FR"
        :error="phoneError"
        @phone-change="(payload) => console.log(payload)"
      />

      <!-- EMAIL -->
      <EmailInputUI
        id="profile-email"
        v-model="formData.email"
        label="Email"
        placeholder="your@email.com"
        hint="Used as contact email in CV profile."
        :error="emailError"
        required
        @email-change="(payload) => console.log(payload)"
      />

      <!-- SUMMARY -->
      <TextareaUI
        id="summary"
        v-model="formData.summary"
        placeholder="Write profile summary..."
        label="Summary"
        description="Short professional summary that will be shown in your CV profile."
      />
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
