<template>
  <div class="crud-container">
    <div class="crud-card">
      <div class="crud-header">
        <h1><span class="icon">&#9787;</span> Gesti&oacute;n de Usuarios</h1>
        <button class="btn-add" @click="abrirModal()">+ Nuevo Usuario</button>
      </div>

      <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="msg success">{{ successMsg }}</p>

      <div v-if="store.cargando" class="loading">Cargando...</div>
      <div v-else-if="store.lista.length === 0" class="empty">No hay usuarios registrados.</div>

      <div v-else class="table-wrapper">
        <table class="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in store.lista" :key="u.id">
              <td class="td-id">{{ u.id }}</td>
              <td>{{ u.nombre }}</td>
              <td>{{ u.email }}</td>
              <td><span class="badge" :class="u.rol?.nombre">{{ u.rol?.nombre || '—' }}</span></td>
              <td class="td-actions">
                <button class="btn-icon edit" title="Editar" @click="abrirModal(u)">&hellip;</button>
                <button class="btn-icon delete" title="Eliminar" @click="confirmarEliminar(u)">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="modal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h2>{{ editando ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
          <button class="btn-close" @click="cerrarModal">&times;</button>
        </div>
        <form @submit.prevent="guardar">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.nombre" type="text" placeholder="Nombre de usuario" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="email@ejemplo.com" required />
            </div>
            <div class="form-group">
              <label>Contrase&ntilde;a</label>
              <input v-model="form.password" type="password" :placeholder="editando ? 'Dejar vac&iacute;o para no cambiar' : 'Contrase&ntilde;a'" :required="!editando" />
            </div>
            <div class="form-group">
              <label>Rol</label>
              <select v-model="form.rol_id" required>
                <option value="" disabled>Seleccionar rol</option>
                <option v-for="r in rolesStore.lista" :key="r.id" :value="r.id">{{ r.nombre }}</option>
              </select>
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
        <p>&iquest;Est&aacute;s segura de eliminar a <strong>{{ confirmando.nombre }}</strong>?</p>
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
import { useUserStore } from '../stores/users';
import { useRolesStore } from '../stores/roles';

const store = useUserStore();
const rolesStore = useRolesStore();

const modal = ref(false);
const editando = ref(false);
const editandoId = ref(null);
const confirmando = ref(null);
const errorMsg = ref('');
const successMsg = ref('');

const form = reactive({
  nombre: '', email: '', password: '', rol_id: ''
});

onMounted(() => {
  store.fetchUsers();
  rolesStore.fetchRoles();
});

function abrirModal(u) {
  if (u) {
    editando.value = true;
    editandoId.value = u.id;
    form.nombre = u.nombre;
    form.email = u.email;
    form.password = '';
    form.rol_id = u.rol_id ?? u.rol?.id ?? '';
  } else {
    editando.value = false;
    editandoId.value = null;
    form.nombre = '';
    form.email = '';
    form.password = '';
    form.rol_id = '';
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
      email: form.email,
      rol_id: Number(form.rol_id)
    };
    if (form.password) {
      payload.password = form.password;
    }
    if (editando.value) {
      await store.updateUser(editandoId.value, payload);
      successMsg.value = 'Usuario actualizado correctamente.';
    } else {
      await store.createUser(payload);
      successMsg.value = 'Usuario creado correctamente.';
    }
    cerrarModal();
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.message || 'Error al guardar usuario';
  }
}

function confirmarEliminar(u) {
  confirmando.value = u;
  errorMsg.value = '';
  successMsg.value = '';
}

async function eliminar(id) {
  try {
    await store.deleteUser(id);
    successMsg.value = 'Usuario eliminado correctamente.';
    confirmando.value = null;
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.message || 'Error al eliminar usuario';
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
  max-width: 860px;
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
.td-id { color: #64748b; width: 50px; }
.th-actions, .td-actions { text-align: right; width: 100px; white-space: nowrap; }

.badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge.admin { background: rgba(16,185,129,0.15); color: #10b981; }
.badge.operador { background: rgba(250,204,21,0.15); color: #facc15; }

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
.modal-lg { max-width: 560px; }
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
