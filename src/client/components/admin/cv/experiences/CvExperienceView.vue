<script setup lang="ts">
import { useCvExperienceEditor } from '~/client/composables/useCvExperienceEditor';
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue';
import { mdiPen } from '@mdi/js';
import Icon from '~/client/components/common/Icon.vue';


const {
  profiles,
  selectedProfileId,
  // isSaveReorderLoading,
  entitiesByProfileId: profilesByProfileId,
  selectedEntity: selectedExperience,

  // editFormData: editLinkFormData,

  // entitiesAreReordered: linksAreReordered,
  // someChange,

  selectEntity: selectExperience,
  // moveEntity: moveLink,
  // loadEntities: uploadLinks,

  // confirmUpdateField,
  // undoChanges,
  // submitFormChanges,
  // resetFormChanges,
  // saveNewOrder,
  // resetChangesOrder,
  // goToCreatePage: goToNewLinkPage,
} = useCvExperienceEditor()

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

        <TransitionGroup tag="ul" name="experience-list" class="flex flex-col gap-[10px] w-[50%]">
          <li v-for="profile in profilesByProfileId" :key="profile.id" class="link-item"
            :class="{ 'bg-[--primary-color-3-100]': profile.id === selectedExperience?.id }"
            @click="() => selectExperience(profile)">
            <span>{{ profile }}</span>

            <div class="link-item__actions">
              <Icon :icon="mdiPen" :size="16" />
            </div>
          </li>
        </TransitionGroup>
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

/*--------------------------------------------------- */
.experience-list-move {
  transition: transform 0.25s ease;
}

.experience-list-enter-active,
.experience-list-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.experience-list-enter-from,
.experience-list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
