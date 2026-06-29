import { defineStore } from 'pinia';
import { ref } from 'vue';
import { instance_auth as axios } from '../plugins/axios';

const base = '/productos';

export const useProductosStore = defineStore('productos', () => {
  const lista = ref([]);
  const cargando = ref(false);

  async function fetchProductos() {
    cargando.value = true;
    try {
      const data = await axios.get(base);
      lista.value = Array.isArray(data) ? data : [];
    } catch (error) {
      lista.value = [];
    } finally {
      cargando.value = false;
    }
  }

  async function crearProducto(payload) {
    const data = await axios.post(base, payload);
    await fetchProductos();
    return data;
  }

  async function actualizarProducto(id, payload) {
    const data = await axios.put(`${base}/${id}`, payload);
    await fetchProductos();
    return data;
  }

  async function eliminarProducto(id) {
    const data = await axios.delete(`${base}/${id}`);
    await fetchProductos();
    return data;
  }

  return { lista, cargando, fetchProductos, crearProducto, actualizarProducto, eliminarProducto };
});
