import { defineStore } from 'pinia';
import { ref } from 'vue';
import { instance_auth as axios } from '../plugins/axios';

const base = '/proveedores';

export const useProveedoresStore = defineStore('proveedores', () => {
  const lista = ref([]);
  const cargando = ref(false);

  async function fetchProveedores() {
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

  async function crearProveedor(payload) {
    const data = await axios.post(base, payload);
    await fetchProveedores();
    return data;
  }

  async function actualizarProveedor(id, payload) {
    const data = await axios.put(`${base}/${id}`, payload);
    await fetchProveedores();
    return data;
  }

  async function eliminarProveedor(id) {
    try {
      const data = await axios.delete(`${base}/${id}`);
      await fetchProveedores();
      return data;
    } catch (error) {
      if (error.response?.status === 409) {
        const msg = error.response.data?.message || 'No se puede eliminar: el proveedor tiene productos asociados.';
        throw new Error(msg);
      }
      throw new Error(error.response?.data?.message || 'Error al eliminar proveedor');
    }
  }

  return { lista, cargando, fetchProveedores, crearProveedor, actualizarProveedor, eliminarProveedor };
});
