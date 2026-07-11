<script setup lang="ts">
import { mdiChevronDownBoxOutline, mdiChevronUpBoxOutline } from '@mdi/js';
import { computed, ref } from 'vue';
import Icon from '~/client/components/common/Icon.vue';
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue';
import { useCvEntityEditor } from '~/client/composables/useCvEntityEditor';
import { useKeyboard } from '~/client/composables/useKeyboard';
import { useProfiles } from '~/client/composables/useProfiles';
import { useToast } from '~/client/composables/useToast';
import { Entities } from '~/client/config/const';
import type { Experience } from '~/shared/dto/cv/experience.dto';


useKeyboard({
  esc: () => { }
})
const toast = useToast()
const {
  profiles,
  selectedProfileId
} = useProfiles({ setFirstAsSelect: true })

const {
  profiles,
} = useCvEntityEditor(Entities.experiences)

const experiences = ref<Experience[]>([
  {
    company: 'Company Name',
    createdAt: new Date().toISOString(),
    description: 'Description about the work experience',
    employmentTypeId: '2b621412-b884-44b5-bbb0-9f39688808bb',
    endDate: new Date().toISOString(),
    id: '2b621412-b884-44b5-bbb0-9f39688808bb',
    isCurrent: false,
    location: 'Remote',
    order: 1,
    position: 'Backend Engineer',
    profileId: '2b621412-b884-44b5-bbb0-9f39688808bb',
    startDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
])

const experiencesByProfileId = computed(() => {
  if (!selectedProfileId.value) return experiences.value
  return experiences.value.filter(v => (v.profileId === selectedProfileId.value))
})

</script>

<template>
  <section class="cv-admin__experience">
    <div class="flex flex-col gap-[24px] min-w-[360px] w-[800px]">
      <SelectInputUI v-model="selectedProfileId" :options="profiles" :placeholder="'Select Profile'"
        @input="() => { }" />

      <!-- SEPARATOR -->
      <div class="w-full h-[4px] bg-[--primary-color-5]"></div>

      <div class="relative flex items-start justify-center h-[100%] gap-[24px]">
        <!-- <div v-if="selectedLink && experiencesByProfileId.length > 1"
          class="absolute left-[-36px] top-0 bottom-0 flex flex-col justify-between">
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronUpBoxOutline" @click="() => moveLink('up')"></Icon>
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronDownBoxOutline" @click="moveLink('down')">
          </Icon>
        </div> -->
      </div>

    </div>

  </section>
</template>

<style scoped>
.cv-admin__experience {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  border: 1px dashed var(--border-color-1);
  padding: 24px 48px;
}
</style>
