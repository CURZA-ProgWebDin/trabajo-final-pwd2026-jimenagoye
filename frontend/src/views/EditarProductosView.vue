<template>
  <div class="view-container">
    <div class="form-card">
      <h1>Editar Producto</h1>
      <form @submit.prevent="actualizarProducto">
        <div class="input-group">
          <label>Nombre del Producto</label>
          <input v-model="producto.nombre" type="text" required />
        </div>
        
        <div class="input-group">
          <label>Precio</label>
          <input v-model="producto.precio" type="number" required />
        </div>

        <div class="actions">
          <button type="submit" class="btn-save">Actualizar</button>
          <button type="button" class="btn-cancel" @click="$router.back()">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const producto = ref({ nombre: '', precio: '' });

onMounted(() => {
  const id = route.params.id;
  console.log("Cargando producto para editar con ID:", id);
  // Aquí cargarías los datos desde tu store o API
  producto.value = { nombre: "Producto Ejemplo", precio: 1000 }; 
});

const actualizarProducto = () => {
  console.log("Actualizando producto:", producto.value);
  router.push('/productos');
};
</script>

<style scoped>
.view-container { padding: 20px; display: flex; justify-content: center; }
.form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 450px; }
h1 { margin-bottom: 20px; color: #2c3e50; font-size: 1.5rem; text-align: center; }
.input-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.actions { display: flex; gap: 10px; }
.btn-save { flex: 2; padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-cancel { flex: 1; padding: 12px; background-color: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; }
.btn-save:hover { background-color: #2980b9; }
</style>