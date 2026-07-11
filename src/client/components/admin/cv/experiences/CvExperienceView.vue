<script setup lang="ts">
import { useCvExperienceEditor } from '~/client/composables/useCvExperienceEditor';
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue';
import { mdiChevronDownBoxOutline, mdiChevronUpBoxOutline, mdiPen } from '@mdi/js';
import Icon from '~/client/components/common/Icon.vue';
import ButtonBaseUI from '~/client/components/shared/ButtonBaseUI.vue';


const {
  profiles,
  selectedProfileId,
  isSaveReorderLoading,
  entitiesByProfileId: experiencesByProfileId,
  selectedEntity: selectedExperience,

  // editFormData: editLinkFormData,

  entitiesAreReordered: experienceAreReordered,
  someChange,

  selectEntity: selectExperience,
  moveEntity: moveExperience,
  // loadEntities: uploadLinks,

  // confirmUpdateField,
  // undoChanges,
  submitFormChanges,
  resetFormChanges,
  saveNewOrder,
  resetChangesOrder,
  goToCreatePage,
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
        <div v-if="selectedExperience && experiencesByProfileId.length > 1"
          class="absolute left-[-36px] top-0 bottom-0 flex flex-col justify-between">
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronUpBoxOutline" @click="() => moveExperience('up')">
          </Icon>
          <Icon class="move-link-btn" :size="28" :icon="mdiChevronDownBoxOutline" @click="moveExperience('down')">
          </Icon>
        </div>

        <TransitionGroup tag="ul" name="experience-list" class="flex flex-col gap-[10px] w-[50%]">
          <li v-for="experience in experiencesByProfileId" :key="experience.id" class="link-item"
            :class="{ 'bg-[--primary-color-3-100]': experience.id === selectedExperience?.id }"
            @click="() => selectExperience(experience)">
            <span>{{ experience }}</span>

            <div class="link-item__actions">
              <Icon :icon="mdiPen" :size="16" />
            </div>
          </li>
        </TransitionGroup>
      </div>

      <TransitionGroup tag="div" name="link-actions" class="w-full flex justify-center gap-[14px]">
        <ButtonBaseUI v-if="experienceAreReordered" key="save-order" :loading="isSaveReorderLoading"
          @click="saveNewOrder">
          Save New Order
        </ButtonBaseUI>

        <ButtonBaseUI v-if="experienceAreReordered" key="reset-order" :variant="'secondary'" @click="resetChangesOrder">
          Reset Order
        </ButtonBaseUI>

        <ButtonBaseUI key="create-new" @click="goToCreatePage">
          * Create New *
        </ButtonBaseUI>

        <ButtonBaseUI v-if="someChange" key="commit-changes" @click="submitFormChanges">
          Commit Changes
        </ButtonBaseUI>

        <ButtonBaseUI v-if="someChange" key="reset-changes" :variant="'secondary'" @click="resetFormChanges">
          Reset Changes
        </ButtonBaseUI>
      </TransitionGroup>
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

/* ----------------------------------------------------- */
.link-actions-move {
  transition: transform 0.25s ease;
}

.link-actions-enter-active,
.link-actions-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.link-actions-enter-from,
.link-actions-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.link-actions-enter-to,
.link-actions-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
