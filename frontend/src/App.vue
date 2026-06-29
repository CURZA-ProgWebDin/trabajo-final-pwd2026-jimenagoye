<template>
  <div class="app-layout">
    <SidebarComponent v-if="!isLoginPage" />
    <main class="main-content" :class="{ 'full-width': isLoginPage }">
      <RouterView />
    </main>
    <ToastComponent />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarComponent from './components/SidebarComponent.vue';
import ToastComponent from './components/ToastComponent.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>

<style>
.app-layout { display: flex; min-height: 100vh; }
.main-content { flex: 1; }
.full-width { display: flex; justify-content: center; align-items: center; }
</style>
