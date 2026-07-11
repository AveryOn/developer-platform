<script setup lang="ts">
import SelectInputUI, {
} from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import { useProfiles } from '~/client/composables/useProfiles'
import { useFormValidator } from '~/client/composables/useFormValidator'
import { computed, reactive, ref } from 'vue'
import { SocialNetwork } from '~/shared/types'
import { useToast } from '~/client/composables/useToast'
import { sleep } from '~/shared/async'
import { AppRoutes } from '~/shared/router'
import InputUI from '~/client/components/shared/InputUI.vue'
import { createCvExperienceDto, type CreateExperienceDto } from '~/shared/dto/cv/experience.dto'
import { CvExperienceApi } from '~/client/api/admin/cv/experience.api'

const toast = useToast()

useKeyboard({
  esc: () => { },
})

const { profiles } = useProfiles()

const formData = reactive<CreateExperienceDto>({
  company: '',
  description: '',
  employmentTypeId: '',
  endDate: '',
  location: '',
  position: '',
  profileId: '',
  startDate: '',
  isCurrent: false,
})

const {
  errors,
  undoError,
  validateFormOrThrow,
} = useFormValidator(formData)

const isSubmitLoading = ref(false)
const isSubmitDisabled = computed(() => {
  return !formData.company
    && !formData.profileId
    && !formData.description
    && !formData.employmentTypeId
    && !formData.startDate
    && !formData.location
    && !formData.position
})

// const types = computed(() => {
//   return Object.values(SocialNetwork).map((el) => {
//     return {
//       label: el,
//       value: el,
//     }
//   })
// })


async function submit() {
  try {
    isSubmitLoading.value = true
    const data = validateFormOrThrow(createCvExperienceDto, formData, () => { })

    const newRecord = await CvExperienceApi.create({
      company: data.data.company,
      description: data.data.description,
      employmentTypeId: data.data.employmentTypeId,
      endDate: data.data.endDate,
      isCurrent: data.data.isCurrent,
      location: data.data.location,
      position: data.data.position,
      profileId: data.data.profileId,
      startDate: data.data.startDate,
    })
    toast.success('Опыт успешно создан!', {
      duration: 3000,
      title: 'Опыт успешно создан!',
    })
    console.debug('CREATE NEW EXPERIENCE', { newRecord })
    isSubmitLoading.value = false
    await sleep('2.5s')

    window.location.href = AppRoutes.admin.CvLinks
  } catch (err) {
    toast.error('Произошла ошибка при создании опыта', {
      duration: 3000,
      title: 'Ошибка',
    })
    console.error(err)
  } finally {
    isSubmitLoading.value = false
  }
}

</script>

<template>
  <section class="cv-admin__experience_new">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <div class="w-full flex flex-col justify-center items-center gap-[24px] w-[360px]! mx-auto">
        <h1 class="text-[26px] mb-[24px]">Creation a new Experience</h1>

        <!-- PROFILE_ID -->
        <SelectInputUI v-model="formData.profileId" :options="profiles" :placeholder="'Select Profile'"
          :error="errors.profileId" :label="'Profile*'" />

        <!-- LABEL -->
        <InputUI v-model="formData.label" class="w-[360px]!" type="text" :error="errors.label" label="Label*"
          placeholder="e.g. GitHub / Linkedin / Reddit..." @input="undoError('label')" />

        <!-- URL -->
        <InputUI v-model="formData.url" class="w-[360px]!" type="text" :error="errors.url" label="URL*"
          placeholder="e.g. https://github.com..." @input="undoError('url')" />

        <!-- TYPE -->
        <!-- <SelectInputUI v-model="formData.type" :options="types" :placeholder="'Select Type of Link'" :label="'Type*'" /> -->

        <ButtonBaseUI :disabled="isSubmitDisabled" @click="submit">Save</ButtonBaseUI>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-admin__experience_new {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
  padding: 24px 48px;
}
</style>
