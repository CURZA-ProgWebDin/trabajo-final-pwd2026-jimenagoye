<template>
  <div class="table-container">
    <table class="styled-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="header in headers" :key="header">
            {{ item[header.toLowerCase()] }}
          </td>
          <td>
            <button @click="$emit('edit', item)" class="btn-action edit">Editar</button>
            <button @click="$emit('delete', item.id)" class="btn-action delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  items: Array
});
defineEmits(['edit', 'delete']);
</script>

<style scoped>
.table-container { width: 100%; overflow-x: auto; margin-top: 10px; }
.styled-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.styled-table th, .styled-table td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
.styled-table th { background-color: #f8f9fa; font-weight: 600; }
.btn-action { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; }
.edit { background-color: #f39c12; color: white; }
.delete { background-color: #e74c3c; color: white; }
</style>