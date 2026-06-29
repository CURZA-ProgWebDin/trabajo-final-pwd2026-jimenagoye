<template>
  <div class="crud-container">
    <div class="crud-card">
      <div class="crud-header">
        <h1><span class="icon">&#9733;</span> Listado de Productos</h1>
        <button v-if="authStore.isAdmin" class="btn-add" @click="abrirModal()">+ Nuevo Producto</button>
      </div>

      <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="msg success">{{ successMsg }}</p>

      <div v-if="store.cargando || catStore.cargando || provStore.cargando" class="loading">Cargando...</div>

      <div v-else-if="store.lista.length === 0" class="empty">No hay productos registrados.</div>

      <div v-else class="table-wrapper">
        <table class="crud-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categor&iacute;a</th>
              <th>Proveedor</th>
              <th>P. Venta</th>
              <th>Stock</th>
              <th>Stock M&iacute;n</th>
              <th v-if="authStore.isAdmin" class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in store.lista" :key="prod.id"
                :class="{ 'stock-bajo': prod.stock_actual <= prod.stock_minimo }">
              <td class="td-name">{{ prod.nombre }}</td>
              <td>{{ prod.categoria?.nombre || '—' }}</td>
              <td>{{ prod.proveedor?.nombre || '—' }}</td>
              <td class="td-num">${{ formatNum(prod.precio_venta) }}</td>
              <td class="td-num">{{ prod.stock_actual }}</td>
              <td class="td-num">{{ prod.stock_minimo }}</td>
              <td v-if="authStore.isAdmin" class="td-actions">
                <button class="btn-icon edit" title="Editar" @click="abrirModal(prod)">&hellip;</button>
                <button class="btn-icon delete" title="Eliminar" @click="confirmarEliminar(prod)">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="modal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h2>{{ editando ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
          <button class="btn-close" @click="cerrarModal">&times;</button>
        </div>
        <form @submit.prevent="guardar">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.nombre" type="text" placeholder="Nombre del producto" required />
            </div>
            <div class="form-group">
              <label>Descripci&oacute;n</label>
              <input v-model="form.descripcion" type="text" placeholder="Descripci&oacute;n" />
            </div>
            <div class="form-group">
              <label>Categor&iacute;a</label>
              <select v-model="form.categoria_id" required>
                <option value="" disabled>Seleccionar categor&iacute;a</option>
                <option v-for="cat in catStore.lista" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Proveedor</label>
              <select v-model="form.proveedor_id" required>
                <option value="" disabled>Seleccionar proveedor</option>
                <option v-for="prov in provStore.lista" :key="prov.id" :value="prov.id">{{ prov.nombre }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Precio Costo ($)</label>
              <input v-model.number="form.precio_costo" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>
            <div class="form-group">
              <label>Precio Venta ($)</label>
              <input v-model.number="form.precio_venta" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>
            <div class="form-group">
              <label>Stock Actual</label>
              <input v-model.number="form.stock_actual" type="number" min="0" placeholder="0" required />
            </div>
            <div class="form-group">
              <label>Stock M&iacute;nimo</label>
              <input v-model.number="form.stock_minimo" type="number" min="0" placeholder="0" required />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">{{ editando ? 'Actualizar' : 'Guardar' }}</button>
            <button type="button" class="btn-cancel" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="confirmando" class="modal-overlay" @click.self="confirmando = null">
      <div class="modal-card confirm-card">
        <h2>Confirmar eliminaci&oacute;n</h2>
        <p>&iquest;Est&aacute;s segura de eliminar <strong>{{ confirmando.nombre }}</strong>?</p>
        <div class="form-actions">
          <button class="btn-danger" @click="eliminar(confirmando.id)">Eliminar</button>
          <button class="btn-cancel" @click="confirmando = null">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useProductosStore } from '../stores/productos';
import { useCategoriasStore } from '../stores/categorias';
import { useProveedoresStore } from '../stores/proveedores';
import { useAuthStore } from '../stores/auth';

const store = useProductosStore();
const catStore = useCategoriasStore();
const provStore = useProveedoresStore();
const authStore = useAuthStore();

const modal = ref(false);
const editando = ref(false);
const editandoId = ref(null);
const confirmando = ref(null);
const errorMsg = ref('');
const successMsg = ref('');

const form = reactive({
  nombre: '', descripcion: '',
  categoria_id: '', proveedor_id: '',
  precio_costo: 0, precio_venta: 0,
  stock_actual: 0, stock_minimo: 0
});

onMounted(() => {
  store.fetchProductos();
  catStore.fetchCategorias();
  provStore.fetchProveedores();
});

function formatNum(val) {
  const n = Number(val);
  return isNaN(n) ? val : n.toFixed(2);
}

function abrirModal(prod) {
  if (prod) {
    editando.value = true;
    editandoId.value = prod.id;
    form.nombre = prod.nombre;
    form.descripcion = prod.descripcion || '';
    form.categoria_id = prod.categoria_id ?? prod.categoria?.id ?? '';
    form.proveedor_id = prod.proveedor_id ?? prod.proveedor?.id ?? '';
    form.precio_costo = Number(prod.precio_costo) || 0;
    form.precio_venta = Number(prod.precio_venta) || 0;
    form.stock_actual = prod.stock_actual ?? 0;
    form.stock_minimo = prod.stock_minimo ?? 0;
  } else {
    editando.value = false;
    editandoId.value = null;
    form.nombre = '';
    form.descripcion = '';
    form.categoria_id = '';
    form.proveedor_id = '';
    form.precio_costo = 0;
    form.precio_venta = 0;
    form.stock_actual = 0;
    form.stock_minimo = 0;
  }
  modal.value = true;
  errorMsg.value = '';
}

function cerrarModal() {
  modal.value = false;
}

async function guardar() {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria_id: Number(form.categoria_id),
      proveedor_id: Number(form.proveedor_id),
      precio_costo: form.precio_costo,
      precio_venta: form.precio_venta,
      stock_actual: form.stock_actual,
      stock_minimo: form.stock_minimo
    };
    if (editando.value) {
      await store.actualizarProducto(editandoId.value, payload);
      successMsg.value = 'Producto actualizado correctamente.';
    } else {
      await store.crearProducto(payload);
      successMsg.value = 'Producto creado correctamente.';
    }
    cerrarModal();
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.message || 'Error al guardar producto';
  }
}

function confirmarEliminar(prod) {
  confirmando.value = prod;
  errorMsg.value = '';
  successMsg.value = '';
}

async function eliminar(id) {
  try {
    await store.eliminarProducto(id);
    successMsg.value = 'Producto eliminado correctamente.';
    confirmando.value = null;
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.message || 'Error al eliminar producto';
    confirmando.value = null;
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
  margin-bottom: 1.5rem;
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
.icon { color: #10b981; }
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

.loading, .empty {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-size: 0.95rem;
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

.stock-bajo td { background-color: rgba(239,68,68,0.08); }
.stock-bajo:hover td { background-color: rgba(239,68,68,0.15); }
.stock-bajo .td-name { 
  position: relative;
  padding-left: 1.5rem;
}
.stock-bajo .td-name::before {
  content: '';
  position: absolute;
  left: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ef4444;
}

.td-name { font-weight: 500; }
.td-num { text-align: right; font-variant-numeric: tabular-nums; }
.th-actions, .td-actions { text-align: right; width: 80px; white-space: nowrap; }

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: background 0.15s;
  line-height: 1;
}
.btn-icon.edit { color: #facc15; }
.btn-icon.edit:hover { background: rgba(250,204,21,0.15); }
.btn-icon.delete { color: #ef4444; }
.btn-icon.delete:hover { background: rgba(239,68,68,0.15); }

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
.modal-lg { max-width: 640px; }
.confirm-card { max-width: 380px; }
.confirm-card h2 { color: #ef4444; }
.confirm-card p { color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.5rem; }
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
.form-group.full { grid-column: 1 / -1; }
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
.btn-danger { background-color: #ef4444; color: #f8fafc; }
.btn-danger:hover { background-color: #dc2626; }
</style>
