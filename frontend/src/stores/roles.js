import { defineStore } from 'pinia';
import { ref } from 'vue';
import { instance_auth as axios } from '../plugins/axios';

const base = '/roles';

export const useRolesStore = defineStore('roles', () => {
  const lista = ref([]);
  const cargando = ref(false);

  async function fetchRoles() {
    cargando.value = true;
    try {
      const data = await axios.get(base);
      lista.value = Array.isArray(data) ? data : [];
    } catch {
      lista.value = [];
    } finally {
      cargando.value = false;
    }
  }

  async function createRole(payload) {
    const data = await axios.post(base, payload);
    await fetchRoles();
    return data;
  }

  async function updateRole(id, payload) {
    const data = await axios.put(`${base}/${id}`, payload);
    await fetchRoles();
    return data;
  }

  async function deleteRole(id) {
    await axios.delete(`${base}/${id}`);
    await fetchRoles();
  }

  return { lista, cargando, fetchRoles, createRole, updateRole, deleteRole };
});
