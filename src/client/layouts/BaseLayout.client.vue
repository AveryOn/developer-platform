<script setup lang="ts"></script>

<template>
    <div class="base-layout">
        <header class="base-layout__header">
            <slot name="header" />
        </header>

        <main class="base-layout__main">
            <slot name="main" />
        </main>

        <footer class="base-layout__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<style scoped>
.base-layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
}

.base-layout__header {
    flex: 0 0 auto;
}

.base-layout__main {
    flex: 1 1 auto;
}

.base-layout__footer {
    flex: 0 0 auto;
}
</style>