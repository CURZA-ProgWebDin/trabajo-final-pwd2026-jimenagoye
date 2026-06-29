<template>
  <div class="crud-container">
    <div class="crud-card welcome-card">
      <p v-if="accessDenied" class="msg error">{{ accessDenied }}</p>

      <div class="icon-wrap">
        <span class="welcome-icon">&#9733;</span>
      </div>

      <h1>Bienvenida a tu Sistema de Stock</h1>
      <p class="subtitle">Gestion&aacute; tus productos, proveedores y movimientos de forma sencilla.</p>

      <div class="shortcuts">
        <router-link to="/productos" class="shortcut-btn">
          <span class="sc-icon">&#9733;</span>
          <span class="sc-text">Ir a Productos</span>
        </router-link>
        <router-link to="/movimientos" class="shortcut-btn">
          <span class="sc-icon">&#8644;</span>
          <span class="sc-text">Ver Movimientos</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const accessDenied = ref('');

onMounted(() => {
  if (route.query.accessDenied) {
    accessDenied.value = route.query.accessDenied;
  }
});
</script>

<style scoped>
.crud-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2c3e50;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

.crud-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 3rem 2.5rem;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 520px;
  width: 100%;
  text-align: center;
}

.msg.error {
  color: #ef4444;
  background: rgba(239,68,68,0.1);
  border: 1px solid #ef4444;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.icon-wrap {
  margin-bottom: 1.25rem;
}

.welcome-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(16,185,129,0.12);
  color: #10b981;
  font-size: 1.8rem;
}

h1 {
  color: #f8fafc;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.shortcuts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shortcut-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.85rem 1.2rem;
  background-color: rgba(0,0,0,0.15);
  border: 1px solid #475569;
  border-radius: 8px;
  text-decoration: none;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 500;
  transition: border-color 0.2s, background 0.2s;
}

.shortcut-btn:hover {
  border-color: #10b981;
  background-color: rgba(16,185,129,0.06);
}

.sc-icon {
  color: #10b981;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.sc-text {
  flex: 1;
  text-align: left;
}
</style>
