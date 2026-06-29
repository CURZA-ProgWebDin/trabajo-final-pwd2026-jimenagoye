<template>
  <div class="view-container">
    <div class="form-card">
      <h1>Nuevo Proveedor</h1>
      <form @submit.prevent="guardarProveedor">
        <div class="input-group">
          <label>Nombre del Proveedor</label>
          <input v-model="proveedor.nombre" type="text" placeholder="Ej: Distribuidora Saphirus" required />
        </div>
        
        <div class="input-group">
          <label>Contacto / Email</label>
          <input v-model="proveedor.contacto" type="email" placeholder="contacto@ejemplo.com" required />
        </div>

        <button type="submit" class="btn-save">Guardar Proveedor</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const proveedor = reactive({
  nombre: '',
  contacto: ''
});

const guardarProveedor = () => {
  console.log("Guardando proveedor:", proveedor);
};
</script>

<style scoped>
.view-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 450px; }
h1 { margin-bottom: 20px; color: #2c3e50; font-size: 1.5rem; text-align: center; }
.input-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-save { width: 100%; padding: 12px; background-color: #e67e22; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background-color: #d35400; }
</style>