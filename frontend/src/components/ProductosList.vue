<template>
  <div class="list-container">
    <div class="header-list">
      <h2>Listado de Productos</h2>
      <button @click="$router.push('/productos/create')" class="btn-add">+ Nuevo Producto</button>
    </div>

    <DataTable 
      :headers="['Nombre', 'Precio', 'Stock']" 
      :items="productos" 
      @edit="editarProducto" 
      @delete="eliminarProducto" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '../DataTable.vue';

const productos = ref([
  { id: 1, nombre: 'Producto A', precio: 100, stock: 10 },
  { id: 2, nombre: 'Producto B', precio: 250, stock: 5 }
]);

const editarProducto = (item) => {
  console.log("Editando:", item);
};

const eliminarProducto = (id) => {
  console.log("Eliminando producto con ID:", id);
};
</script>

<style scoped>
.list-container { padding: 20px; }
.header-list { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-add { padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>