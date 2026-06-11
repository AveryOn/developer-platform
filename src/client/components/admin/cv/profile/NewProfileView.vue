<script setup lang="ts">
import { reactive, ref } from 'vue'
import z from 'zod'
import { CvProfileApi } from '~/client/api/admin/cv/profile.api'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import CheckboxUI from '~/client/components/shared/CheckboxUI.vue'
import EmailInputUI from '~/client/components/shared/EmailInputUI.vue'
import InputUI from '~/client/components/shared/InputUI.vue'
import PhoneInputUI from '~/client/components/shared/PhoneInputUI.vue'
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue'
import TextareaUI from '~/client/components/shared/TextareaUI.vue'
import { createCvProfileDto } from '~/shared/dto/admin/cv/profile.dto'
import { ProfileLanguage } from '~/shared/types'

const formData = reactive({
  title: '',
  firstName: '',
  lasName: '',
  language: ProfileLanguage.en,
  location: '',
  summary: '',
  email: undefined,
  phone: undefined,
  isActive: false,
})

const errors = reactive({
  title: '',
  firstName: '',
  lasName: '',
  language: '',
  location: '',
  summary: '',
  email: '',
  phone: '',
  isActive: '',
})

function setErrors(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any
) {
  Object.keys(errors).forEach((k) => {
    const key = k as keyof typeof errors
    errors[key] = details.properties?.[key]?.errors[0] ?? ''
  })
}

const isSubmitLoading = ref(false)

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

async function submit() {
  try {
    isSubmitLoading.value = true
    const data = createCvProfileDto.safeParse(formData)
    console.debug(formData)
    if(!data.success) {
      const details = z.treeifyError(data.error)
      setErrors(details)
      throw new Error('INVALID DATA')
    }
    const newProfile = await CvProfileApi.create({
      firstName: formData.firstName,
      isActive: formData.isActive,
      language: formData.language,
      lastName: formData.lasName,
      summary: formData.summary,
      title: formData.title,
      email: formData.email,
      location: formData.location,
      phone: formData.phone,
    })
    console.debug('CREATE NEW PROFILE', { newProfile })
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isSubmitLoading.value = false
  }
}

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
          :error="errors.title"
          label="Profile Title"
          placeholder="The coolest profile!"
        />
        <!-- FIRST NAME -->
        <InputUI
          v-model="formData.firstName"
          type="text"
          :error="errors.firstName"
          label="First Name"
          placeholder="Alex"
        />
         <!-- LAST NAME -->
        <InputUI
          v-model="formData.lasName"
          type="text"
          :error="errors.lasName"
          label="Last Name"
          placeholder="Mercer"
        />
        <!-- LANGUAGE -->
        <SelectInputUI
          v-model="formData.language"
          :error="errors.language"
          :options="languageOptions"
          label="Profile Language"
        />
        <!-- LOCATION -->
        <InputUI
          id="location"
          v-model="formData.location"
          :error="errors.location"
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
          :error="errors.isActive"
          label="Active profile"
        />
        <!-- PHONE NUMBER -->
        <PhoneInputUI
          id="profile-phone"
          v-model="formData.phone"
          label="Phone Number"
          placeholder="+33 6 12 34 56 78"
          default-country="FR"
          :error="errors.phone"
          @phone-change="(payload) => console.log(payload)"
        />
        <!-- EMAIL -->
        <EmailInputUI
          id="profile-email"
          v-model="formData.email"
          label="Email"
          placeholder="your@email.com"
          hint="Used as contact email in CV profile."
          :error="errors.email"
          :required="false"
          @email-change="(payload) => console.log(payload)"
        />
        <!-- SUMMARY -->
        <TextareaUI
          id="summary"
          v-model="formData.summary"
          :error="errors.summary"
          placeholder="Write profile summary..."
          label="Summary"
          description="Short professional summary that will be shown in your CV profile."
        />
      </div>
    </form>
    <ButtonBaseUI
        class="w-[30%]"
        type="submit"
        variant="primary"
        :loading="isSubmitLoading"
        @click="submit"
      >Save profile</ButtonBaseUI>
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
