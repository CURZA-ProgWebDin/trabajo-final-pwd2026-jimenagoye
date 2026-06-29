<template>
  <nav class="sidebar">
    <div class="sidebar-top">
      <div class="brand">
        <span class="brand-icon">&#9733;</span>
        <span>Mi Sistema</span>
      </div>
      <div class="nav-links">
        <router-link to="/">
          <span class="nav-icon">&#8962;</span> Inicio
        </router-link>
        <router-link to="/productos">
          <span class="nav-icon">&#9733;</span> Productos
        </router-link>
        <router-link to="/movimientos">
          <span class="nav-icon">&#8644;</span> Movimientos
        </router-link>
        <router-link to="/categorias">
          <span class="nav-icon">&#9670;</span> Categor&iacute;as
        </router-link>
        <router-link to="/proveedores">
          <span class="nav-icon">&#9632;</span> Proveedores
        </router-link>
        <router-link to="/usuarios" class="admin-link">
          <span class="nav-icon">&#9787;</span> Usuarios
        </router-link>
        <router-link to="/roles" class="admin-link">
          <span class="nav-icon">&#9881;</span> Roles
        </router-link>
      </div>
    </div>

    <div class="sidebar-bottom">
      <button class="btn-logout" @click="cerrarSesion">
        <span class="nav-icon">&#8617;</span> Cerrar Sesi&oacute;n
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();

const cerrarSesion = () => {
  authStore.logout();
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  padding: 24px 16px 0;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
}

.brand-icon {
  color: #10b981;
  font-size: 1.3rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
}

.sidebar a:hover {
  background-color: #1e293b;
  color: #10b981;
}

.sidebar a.router-link-exact-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-weight: 600;
}

.nav-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-bottom {
  margin-top: auto;
  padding: 16px;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  background-color: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.btn-logout:hover {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

.admin-link {
  border-top: 1px solid #334155;
  margin-top: 4px;
  padding-top: 12px !important;
}

.sidebar a.router-link-exact-active.admin-link,
.sidebar a.admin-link.router-link-exact-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-weight: 600;
}
</style>
