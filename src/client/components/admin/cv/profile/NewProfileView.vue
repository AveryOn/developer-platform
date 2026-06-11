<script setup lang="ts">
import { reactive, ref } from 'vue'
import CheckboxUI from '~/client/components/shared/CheckboxUI.vue'
import EmailInputUI from '~/client/components/shared/EmailInputUI.vue'
import InputUI from '~/client/components/shared/InputUI.vue'
import PhoneInputUI from '~/client/components/shared/PhoneInputUI.vue'
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue'
import TextareaUI from '~/client/components/shared/TextareaUI.vue'
import { ProfileLanguage } from '~/shared/types'

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
  <section class="cv-admin__profile-new py-[24px]">
    <h2 class="text-[24px]">CREATE NEW PROFILE</h2>
    <form class="profile-new-form relative" @submit.prevent>
      <div class="flex flex-col w-[50%] gap-[18px]">
        <!-- TITLE -->
        <InputUI
          v-model="formData.title"
          type="text"
          label="Profile Title"
          placeholder="The coolest profile!"
        />
        <!-- FIRST NAME -->
        <InputUI
          v-model="formData.firstName"
          type="text"
          label="First Name"
          placeholder="Alex"
        />
         <!-- LAST NAME -->
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
          label="Profile Language"
        />
        <!-- LOCATION -->
        <InputUI
          id="location"
          v-model="formData.location"
          label="Location"
          placeholder="Tbilisi, Georgia"
        />
      </div>

      <div class="px-[4px] bg-[--primary-color-5] top-0 bottom-0"></div>

      <div class="flex flex-col w-[50%] gap-[18px]">
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
          label="Phone Number"
          placeholder="+33 6 12 34 56 78"
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
      </div>
    </form>
  </section>
</template>

<style scoped>
.cv-admin__profile-new {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 60vh;
  flex-direction: column;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
}

.profile-new-form {
  display: flex;
  justify-content: center;
  gap: 32px;
  background-color: var(--primary-color-6);
  width: 800px;
  padding: 12px 20px;
}
</style>
