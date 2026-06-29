import { defineStore } from 'pinia';
import { ref } from 'vue';
import { instance_auth as axios } from '../plugins/axios';
import { useProductosStore } from './productos';

const base = '/movimientos_stock';

export const useMovimientosStore = defineStore('movimientos', () => {
  const lista = ref([]);
  const misMovimientos = ref([]);
  const cargando = ref(false);
  const cargandoMis = ref(false);

  async function fetchAll() {
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

  async function fetchMisMovimientos() {
    cargandoMis.value = true;
    try {
      const data = await axios.get(`${base}/mis`);
      misMovimientos.value = Array.isArray(data) ? data : [];
    } catch {
      misMovimientos.value = [];
    } finally {
      cargandoMis.value = false;
    }
  }

  async function registrarMovimiento(payload) {
    const data = await axios.post(base, payload);
    const prodStore = useProductosStore();
    const prod = prodStore.lista.find(p => p.id === Number(payload.producto_id));
    if (prod) {
      if (payload.tipo === 'entrada') {
        prod.stock_actual = (prod.stock_actual || 0) + Number(payload.cantidad);
      } else {
        prod.stock_actual = (prod.stock_actual || 0) - Number(payload.cantidad);
      }
    }
    return data;
  }

  return { lista, misMovimientos, cargando, cargandoMis, fetchAll, fetchMisMovimientos, registrarMovimiento };
});
