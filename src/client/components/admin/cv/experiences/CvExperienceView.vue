<script setup lang="ts">
import { useCvExperienceEditor } from '~/client/composables/useCvExperienceEditor';
import SelectInputUI from '~/client/components/shared/SelectInputUI.vue';


const {
  profiles,
  selectedProfileId,
  // isSaveReorderLoading,
  // entitiesByProfileId: linksByProfileId,
  // selectedEntity: selectedLink,

  // editFormData: editLinkFormData,

  // entitiesAreReordered: linksAreReordered,
  // someChange,

  // selectEntity: selectLink,
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
