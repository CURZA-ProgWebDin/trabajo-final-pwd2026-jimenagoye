<template>
  <div class="view-container">
    <div class="form-card">
      <h1>Nuevo Producto</h1>
      <form @submit.prevent="guardarProducto">
        <div class="input-group">
          <label>Nombre del Producto</label>
          <input v-model="producto.nombre" type="text" placeholder="Ej: Perfume Saphirus" required />
        </div>
        
        <div class="input-group">
          <label>Precio</label>
          <input v-model="producto.precio" type="number" placeholder="0.00" required />
        </div>

        <button type="submit" class="btn-save">Guardar Producto</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const producto = reactive({
  nombre: '',
  precio: ''
});

const guardarProducto = () => {
  console.log("Guardando producto:", producto);
};
</script>

<style scoped>
.view-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 450px; }
h1 { margin-bottom: 20px; color: #2c3e50; font-size: 1.5rem; text-align: center; }
.input-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-save { width: 100%; padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background-color: #2980b9; }
</style>