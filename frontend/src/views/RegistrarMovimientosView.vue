<script setup>
import { ref, computed } from 'vue';
import { useProductosStore } from '../stores/productos';
import { useMovimientosStore } from '../stores/movimientos';

const productosStore = useProductosStore();
const movStore = useMovimientosStore();
const form = ref({ producto_id: '', tipo: 'entrada', cantidad: 0, motivo: '' });

const stockActual = computed(() => {
  const prod = productosStore.lista.find(p => p.id === form.value.producto_id);
  return prod ? prod.stock_actual : 0;
});

const esInvalido = computed(() => {
  return form.value.tipo === 'salida' && form.value.cantidad > stockActual.value;
});

const enviar = async () => {
  if (esInvalido.value) { alert("¡Alerta! La cantidad supera el stock actual."); return; }
  await movStore.registrarMovimiento(form.value);
  alert("Movimiento registrado con éxito");
};
</script>