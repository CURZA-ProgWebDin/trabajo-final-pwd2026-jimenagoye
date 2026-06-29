import { defineStore } from 'pinia';
import { ref } from 'vue';
import { instance_auth as axios } from '../plugins/axios';

const base = '/users';

export const useUserStore = defineStore('user', () => {
  const lista = ref([]);
  const cargando = ref(false);

  async function fetchUsers() {
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

  async function createUser(payload) {
    const data = await axios.post(base, payload);
    await fetchUsers();
    return data;
  }

  async function updateUser(id, payload) {
    const data = await axios.put(`${base}/${id}`, payload);
    await fetchUsers();
    return data;
  }

  async function deleteUser(id) {
    await axios.delete(`${base}/${id}`);
    await fetchUsers();
  }

  return { lista, cargando, fetchUsers, createUser, updateUser, deleteUser };
});
