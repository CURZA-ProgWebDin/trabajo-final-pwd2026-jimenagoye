<template>
  <div class="list-container">
    <div class="header-list">
      <h2>Listado de Usuarios</h2>
      <button @click="$router.push('/users/create')" class="btn-add">+ Nuevo Usuario</button>
    </div>

    <DataTable 
      :headers="['Nombre', 'Email', 'Rol']" 
      :items="usuarios" 
      @edit="editarUsuario" 
      @delete="eliminarUsuario" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '../DataTable.vue';

const usuarios = ref([
  { id: 1, nombre: 'Jimena Admin', email: 'jimena@ejemplo.com', rol: 'Administrador' },
  { id: 2, nombre: 'Usuario Test', email: 'test@ejemplo.com', rol: 'Usuario' }
]);

const editarUsuario = (item) => {
  console.log("Editando usuario:", item);
};

const eliminarUsuario = (id) => {
  console.log("Eliminando usuario con ID:", id);
};
</script>

<style scoped>
.list-container { padding: 20px; }
.header-list { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-add { padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>