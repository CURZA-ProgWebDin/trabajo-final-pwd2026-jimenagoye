<template>
  <div class="list-container">
    <div class="header-list">
      <h2>Listado de Proveedores</h2>
      <button @click="$router.push('/proveedores/create')" class="btn-add">+ Nuevo Proveedor</button>
    </div>

    <DataTable 
      :headers="['Nombre', 'Contacto', 'Email']" 
      :items="proveedores" 
      @edit="editarProveedor" 
      @delete="eliminarProveedor" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '../DataTable.vue';

const proveedores = ref([
  { id: 1, nombre: 'Proveedor S.A.', contacto: 'Juan Pérez', email: 'ventas@ejemplo.com' },
  { id: 2, nombre: 'Distribuidora Global', contacto: 'Ana García', email: 'contacto@global.com' }
]);

const editarProveedor = (item) => {
  console.log("Editando proveedor:", item);
};

const eliminarProveedor = (id) => {
  console.log("Eliminando proveedor con ID:", id);
};
</script>

<style scoped>
.list-container { padding: 20px; }
.header-list { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-add { padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>