<template>
  <div class="crud-container">
    <div class="crud-card">
      <div class="crud-header">
        <h1><span class="icon">&#8644;</span> Movimientos de Stock</h1>
        <button class="btn-add" @click="abrirModalRegistro()">+ Registrar Movimiento</button>
      </div>

      <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="msg success">{{ successMsg }}</p>

      <div class="tabs" v-if="authStore.isAdmin">
        <button :class="{ active: activeTab === 'mis' }" @click="activeTab = 'mis'">Mis Movimientos</button>
        <button :class="{ active: activeTab === 'todas' }" @click="activeTab = 'todas'">Todos los Movimientos</button>
      </div>

      <div v-if="activeTab === 'mis'" class="table-section">
        <h2 class="section-title">Mis Movimientos</h2>
        <div v-if="store.cargandoMis" class="loading">Cargando...</div>
        <div v-else-if="store.misMovimientos.length === 0" class="empty">No registraste movimientos todav&iacute;a.</div>
        <div v-else class="table-wrapper">
          <table class="crud-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in store.misMovimientos" :key="m.id">
                <td class="td-date">{{ formatDate(m.created_at) }}</td>
                <td>{{ m.producto?.nombre || '—' }}</td>
                <td><span class="badge" :class="m.tipo">{{ m.tipo }}</span></td>
                <td class="td-num">{{ m.cantidad }}</td>
                <td>{{ m.motivo || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'todas' && authStore.isAdmin" class="table-section">
        <h2 class="section-title">Todos los Movimientos</h2>
        <div v-if="store.cargando" class="loading">Cargando...</div>
        <div v-else-if="store.lista.length === 0" class="empty">No hay movimientos registrados.</div>
        <div v-else class="table-wrapper">
          <table class="crud-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Motivo</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in store.lista" :key="m.id">
                <td class="td-date">{{ formatDate(m.created_at) }}</td>
                <td>{{ m.producto?.nombre || '—' }}</td>
                <td><span class="badge" :class="m.tipo">{{ m.tipo }}</span></td>
                <td class="td-num">{{ m.cantidad }}</td>
                <td>{{ m.motivo || '—' }}</td>
                <td>{{ m.user?.nombre || m.user?.username || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="modalRegistro" class="modal-overlay" @click.self="cerrarModalRegistro">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h2>Registrar Movimiento</h2>
          <button class="btn-close" @click="cerrarModalRegistro">&times;</button>
        </div>
        <form @submit.prevent="guardarMovimiento">
          <div class="form-grid">
            <div class="form-group">
              <label>Producto</label>
              <select v-model="form.producto_id" required>
                <option value="" disabled>Seleccionar producto</option>
                <option v-for="p in prodStore.lista" :key="p.id" :value="p.id">
                  {{ p.nombre }} (stock: {{ p.stock_actual }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="form.tipo" required>
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>
            </div>
            <div class="form-group">
              <label>Cantidad</label>
              <input v-model.number="form.cantidad" type="number" min="1" placeholder="0" required />
            </div>
            <div class="form-group">
              <label>Motivo</label>
              <input v-model="form.motivo" type="text" placeholder="Motivo del movimiento" />
            </div>
          </div>

          <p v-if="advertenciaStock" class="msg warning">{{ advertenciaStock }}</p>

          <div class="info-stock" v-if="form.producto_id">
            <span class="stock-label">Stock actual:</span>
            <span class="stock-val" :class="{ 'stock-bajo-text': stockActual < 10 }">{{ stockActual }} unidades</span>
            <template v-if="form.tipo === 'salida' && form.cantidad > 0">
              <span class="stock-arrow">&rarr;</span>
              <span class="stock-label">Resultado:</span>
              <span class="stock-val" :class="{ 'stock-critico': stockActual - form.cantidad < 0 }">
                {{ stockActual - form.cantidad }} unidades
              </span>
            </template>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save">Registrar</button>
            <button type="button" class="btn-cancel" @click="cerrarModalRegistro">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { useMovimientosStore } from '../stores/movimientos';
import { useProductosStore } from '../stores/productos';
import { useAuthStore } from '../stores/auth';

const store = useMovimientosStore();
const prodStore = useProductosStore();
const authStore = useAuthStore();

const activeTab = ref('mis');
const modalRegistro = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const form = reactive({
  producto_id: '',
  tipo: 'entrada',
  cantidad: 0,
  motivo: ''
});

const stockActual = computed(() => {
  const prod = prodStore.lista.find(p => p.id === Number(form.producto_id));
  return prod ? prod.stock_actual : 0;
});

const advertenciaStock = computed(() => {
  if (form.tipo === 'salida' && form.cantidad > 0 && form.producto_id) {
    if (form.cantidad > stockActual.value) {
      return `Advertencia: la cantidad (${form.cantidad}) supera el stock actual (${stockActual.value}).`;
    }
  }
  return '';
});

onMounted(() => {
  store.fetchMisMovimientos();
  if (authStore.isAdmin) {
    store.fetchAll();
  }
  prodStore.fetchProductos();
});

function abrirModalRegistro() {
  form.producto_id = '';
  form.tipo = 'entrada';
  form.cantidad = 0;
  form.motivo = '';
  modalRegistro.value = true;
  errorMsg.value = '';
  successMsg.value = '';
}

function cerrarModalRegistro() {
  modalRegistro.value = false;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

async function guardarMovimiento() {
  errorMsg.value = '';
  successMsg.value = '';
  try {
      const payload = {
        producto_id: Number(form.producto_id),
        tipo: form.tipo,
        cantidad: Number(form.cantidad),
        motivo: form.motivo,
        user_id: authStore.id_user
      };
    await store.registrarMovimiento(payload);
    successMsg.value = 'Movimiento registrado correctamente.';
    cerrarModalRegistro();
    store.fetchMisMovimientos();
    if (authStore.isAdmin) {
      store.fetchAll();
    }
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.response?.data?.error || e.message || 'Error al registrar movimiento';
  }
}
</script>

<style scoped>
.crud-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #2c3e50;
  padding: 2.5rem 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
.crud-card {
  width: 100%;
  max-width: 1060px;
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
}
.crud-header h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.icon { color: #10b981; font-size: 1.3rem; }
.btn-add {
  padding: 0.6rem 1.2rem;
  background-color: #10b981;
  color: #0f172a;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-add:hover { background-color: #059669; }

.msg {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
.msg.error { color: #ef4444; background: rgba(239,68,68,0.1); border: 1px solid #ef4444; }
.msg.success { color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid #10b981; }
.msg.warning { color: #facc15; background: rgba(250,204,21,0.1); border: 1px solid #facc15; }

.loading, .empty {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-size: 0.95rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tabs button {
  padding: 0.5rem 1.2rem;
  border: 1px solid #475569;
  border-radius: 6px;
  background: transparent;
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tabs button.active {
  background: #10b981;
  color: #0f172a;
  border-color: #10b981;
}
.tabs button:hover:not(.active) { border-color: #10b981; color: #f8fafc; }

.section-title {
  color: #f8fafc;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.table-wrapper { overflow-x: auto; }
.crud-table { width: 100%; border-collapse: collapse; }
.crud-table th {
  text-align: left;
  padding: 0.85rem 0.75rem;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #334155;
  white-space: nowrap;
}
.crud-table td {
  padding: 0.85rem 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  border-bottom: 1px solid #1e293b;
}
.crud-table tbody tr:hover td { background-color: #243249; }
.td-date { color: #94a3b8; font-size: 0.8rem; white-space: nowrap; }
.td-num { text-align: right; font-variant-numeric: tabular-nums; }

.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge.entrada { background: rgba(16,185,129,0.15); color: #10b981; }
.badge.salida { background: rgba(239,68,68,0.15); color: #ef4444; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 460px;
  border: 1px solid #334155;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}
.modal-lg { max-width: 600px; }
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.modal-header h2 { margin: 0; color: #f8fafc; font-size: 1.2rem; }
.btn-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}
.btn-close:hover { color: #f8fafc; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid #475569;
  border-radius: 6px;
  background: #0f172a;
  color: #f8fafc;
  font-size: 0.9rem;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }
.form-group input::placeholder { color: #64748b; }
.form-group select option { background: #1e293b; color: #f8fafc; }

.info-stock {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #0f172a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.stock-label { color: #94a3b8; }
.stock-val { color: #e2e8f0; font-weight: 600; }
.stock-bajo-text { color: #facc15; }
.stock-critico { color: #ef4444; }
.stock-arrow { color: #475569; font-size: 1.1rem; }

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.form-actions button {
  flex: 1;
  padding: 0.7rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-save { background-color: #10b981; color: #0f172a; }
.btn-save:hover { background-color: #059669; }
.btn-cancel { background-color: #475569; color: #f8fafc; }
.btn-cancel:hover { background-color: #64748b; }
</style>
