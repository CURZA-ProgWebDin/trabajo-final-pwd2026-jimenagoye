<template>
  <div class="create-product-container">
    <div class="form-card">
      <h2>Nuevo Producto</h2>
      <form @submit.prevent="guardarProducto">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="producto.nombre" type="text" required />
        </div>
        
        <div class="input-group">
          <label>Precio</label>
          <input v-model="producto.precio" type="number" step="0.01" required />
        </div>

        <div class="input-group">
          <label>Stock Inicial</label>
          <input v-model="producto.stock" type="number" required />
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
  precio: 0,
  stock: 0
});

const guardarProducto = () => {
  console.log("Producto guardado:", producto);
};
</script>

<style scoped>
.create-product-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 100%; max-width: 450px; }
h2 { margin-bottom: 20px; color: #2c3e50; }
.input-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; font-weight: 600; }
input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-save { width: 100%; padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background-color: #2980b9; }
</style>