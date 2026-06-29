import { defineStore } from 'pinia';
import { ref } from 'vue';
import CategoriasService from '../services/categoriasService';

export const useCategoriasStore = defineStore('categorias', () => {
  const lista = ref([]);
  const cargando = ref(false);

  async function fetchCategorias() {
    cargando.value = true;
    try {
      const data = await CategoriasService.getAll();
      lista.value = Array.isArray(data) ? data : [];
    } catch (error) {
      lista.value = [];
    } finally {
      cargando.value = false;
    }
  }

  async function crearCategoria(payload) {
    const data = await CategoriasService.create(payload);
    await fetchCategorias();
    return data;
  }

  async function actualizarCategoria(id, payload) {
    const data = await CategoriasService.update(id, payload);
    await fetchCategorias();
    return data;
  }

  async function eliminarCategoria(id) {
    try {
      const data = await CategoriasService.delete(id);
      await fetchCategorias();
      return data;
    } catch (error) {
      if (error.response?.status === 409) {
        const msg = error.response.data?.message || 'No se puede eliminar: la categoría tiene productos asociados.';
        throw new Error(msg);
      }
      throw new Error(error.response?.data?.message || 'Error al eliminar categoría');
    }
  }

  return { lista, cargando, fetchCategorias, crearCategoria, actualizarCategoria, eliminarCategoria };
});
