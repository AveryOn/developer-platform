<script setup lang="ts">
import SelectInputUI, {
} from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import { useProfiles } from '~/client/composables/useProfiles'
import { useFormValidator } from '~/client/composables/useFormValidator'
import { reactive } from 'vue'
import { createCvLinkDto, type CreateCvLinkDto } from '~/shared/dto/cv/link.dto'
import { SocialNetwork } from '~/shared/types'
import { useToast } from '~/client/composables/useToast'
import z from 'zod'
import { CvLinksApi } from '~/client/api/admin/cv/links.api'
import { sleep } from '~/shared/async'
import { AppRoutes } from '~/shared/router'
import InputUI from '~/client/components/shared/InputUI.vue'

const toast = useToast()

useKeyboard({
  esc: () => { },
})

const {
  profiles,
  selectedProfileId
} = useProfiles()

const formData = reactive<CreateCvLinkDto>({
  isVisible: true,
  label: '',
  order: 0,
  profileId: '',
  type: SocialNetwork.other,
  url: ''
})

const {
  isSubmitLoading,
  isSubmitDisabled,
  errors,
  isSomeError,
  setErrors,
  undoError
} = useFormValidator(formData)

async function submit() {
  try {
    isSubmitLoading.value = true
    const data = createCvLinkDto.safeParse(formData)

    if (!data.success) {
      const details = z.treeifyError(data.error)
      setErrors(details)
      console.debug(details)
      throw new Error('INVALID DATA')
    }
    const newProfile = await CvLinksApi.create({
      url: data.data.url,
      type: data.data.type,
      label: data.data.label,
      order: data.data.order,
      profileId: data.data.profileId,
      isVisible: data.data.isVisible,
    })
    toast.success('Профиль успешно создан!', {
      duration: 3000,
      title: 'Профиль успешно создан!',
    })
    console.debug('CREATE NEW PROFILE', { newProfile })
    isSubmitLoading.value = false
    isSubmitDisabled.value = true
    await sleep('2.5s')

    window.location.href = AppRoutes.admin.CvLinks
  } catch (err) {
    toast.error('Произошла ошибка при создании ссылки', {
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
  <section class="cv-admin__links_new">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <SelectInputUI v-model="selectedProfileId" :options="profiles" :placeholder="'Select Profile'" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-center h-[100%] gap-[24px]">
      </div>

      <div class="w-full flex flex-col justify-center">

        <InputUI v-model="formData.label" type="text" :error="errors.label" label="Label"
          placeholder="GitHub / Linkedin / Reddit..." @input="undoError('label')" />

        <ButtonBaseUI>Save</ButtonBaseUI>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-admin__links_new {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
  padding: 24px 48px;
}
</style>
