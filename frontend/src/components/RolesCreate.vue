<template>
  <div class="form-container">
    <div class="form-card">
      <h2>Nuevo Rol</h2>
      <form @submit.prevent="guardarRol">
        <div class="input-group">
          <label>Nombre del Rol</label>
          <input v-model="rol.nombre" type="text" placeholder="Ej: Administrador" required />
        </div>
        
        <button type="submit" class="btn-save">Guardar Rol</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const rol = reactive({
  nombre: ''
});

const guardarRol = () => {
  console.log("Rol a guardar:", rol.nombre);
};
</script>

<style scoped>
.form-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h2 { margin-bottom: 20px; color: #2c3e50; }
.input-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; font-weight: 600; }
input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-save { width: 100%; padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background-color: #2980b9; }
</style>