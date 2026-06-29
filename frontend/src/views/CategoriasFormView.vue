<template>
  <div class="view-container">
    <div class="form-card">
      <h1>{{ isEdit ? 'Editar Categoría' : 'Nueva Categoría' }}</h1>
      <form @submit.prevent="guardarCategoria">
        <div class="input-group">
          <label>Nombre de la Categoría</label>
          <input v-model="categoria.nombre" type="text" placeholder="Ej: Electrónica" required />
        </div>
        
        <button type="submit" class="btn-save">
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const isEdit = ref(false);
const categoria = reactive({ nombre: '' });

const guardarCategoria = () => {
  console.log("Guardando categoría:", categoria.nombre);
  // Aquí llamarías a tu store de categorías
};
</script>

<style scoped>
.view-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h1 { margin-bottom: 20px; color: #2c3e50; font-size: 1.5rem; text-align: center; }
.input-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-save { width: 100%; padding: 12px; background-color: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background-color: #219150; }
</style>