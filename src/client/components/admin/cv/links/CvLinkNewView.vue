<script setup lang="ts">
import SelectInputUI, {
} from '~/client/components/shared/SelectInputUI.vue'
import { useKeyboard } from '~/client/composables/useKeyboard'
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue'
import { useProfiles } from '~/client/composables/useProfiles'
import { useFormValidator } from '~/client/composables/useFormValidator'
import { reactive } from 'vue'
import type { CreateCvLinkDto } from '~/shared/dto/cv/link.dto'
import { SocialNetwork } from '~/shared/types'

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
  errors,
  isSomeError,
  setErrors,
  undoError
} = useFormValidator(formData)

</script>

<template>
  <section class="cv-admin__links_new">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <SelectInputUI v-model="selectedProfileId" :options="profiles" :placeholder="'Select Profile'" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-center h-[100%] gap-[24px]">
      </div>

      <div class="w-full flex justify-center">

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
