<template>
  <div class="toad-container">
    <div class="profile-card">
      <div class="avatar">
        {{ initials }}
      </div>
      <h2>Bienvenido/a, Usuario</h2>
      <p>ID: #2026</p>
      <div class="actions">
        <button class="btn-edit">Editar Perfil</button>
        <button class="btn-logout" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const initials = computed(() => 'JD');

const logout = () => {
  console.log("Cerrando sesión...");
};
</script>

<style scoped>
.toad-container { padding: 20px; display: flex; justify-content: center; }
.profile-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; width: 100%; max-width: 300px; }
.avatar { width: 80px; height: 80px; background-color: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 15px; }
.actions { margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
button { padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-edit { background-color: #ecf0f1; color: #2c3e50; }
.btn-logout { background-color: #e74c3c; color: white; }
</style>