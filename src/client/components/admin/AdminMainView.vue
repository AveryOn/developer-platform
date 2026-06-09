<script setup lang="ts">
import { AppTheme } from '~/client/config/app-themes.config';
import { useAppStore } from '~/client/stores/app.store';

const appStore = useAppStore()
</script>

<template>
  <div>
    <header>
      <button @click="appStore.applyTheme(AppTheme['app-theme-package-1'])">Theme 1</button>
      <button @click="appStore.applyTheme(AppTheme['app-theme-package-2'])">Theme 2</button>
      <button @click="appStore.applyTheme(AppTheme['app-theme-package-3'])">Theme 3</button>
    </header>
    <div class="main-admin-menu pt-[24px]">
      <div class="menu-block">Adjust the color schema</div>
      <div class="menu-block">Article Management</div>
      <div class="menu-block">Projects Management</div>
      <div class="menu-block">Projects Management</div>
    </div>
  </div>
</template>

<style scoped>
.main-admin-menu {
  width: 100%;
  margin-left: auto;
  height: max-content;
  display: flex;
  display: flex;
  gap: 36px;
  align-items: center;
  justify-content: center;
}

.menu-block {
  width: 300px;
  height: 300px;
  border: 1px solid var(--border-color-1);
  border-radius: 18px;
  background-color: var(--primary-color-2);
  transition: all 0.3s ease;
}

.menu-block:hover {
  background-color: var(--primary-color-3);
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>
