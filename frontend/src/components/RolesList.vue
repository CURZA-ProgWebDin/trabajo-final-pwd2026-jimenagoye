<template>
  <div class="list-container">
    <div class="header-list">
      <h2>Listado de Roles</h2>
      <button @click="$router.push('/roles/create')" class="btn-add">+ Nuevo Rol</button>
    </div>

    <!-- Reutilizamos el componente DataTable -->
    <DataTable 
      :headers="['ID', 'Nombre']" 
      :items="roles" 
      @edit="editarRol" 
      @delete="eliminarRol" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '../DataTable.vue';

const roles = ref([
  { id: 1, nombre: 'Administrador' },
  { id: 2, nombre: 'Editor' }
]);

const editarRol = (item) => {
  console.log("Editando rol:", item);
};

const eliminarRol = (id) => {
  console.log("Eliminando rol con ID:", id);
};
</script>

<style scoped>
.list-container { padding: 20px; }
.header-list { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-add { padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>