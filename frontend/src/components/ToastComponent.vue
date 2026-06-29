<template>
  <Transition name="toast">
    <div v-if="store.visible" class="toast-overlay" @click="store.ocultar">
      <div class="toast" :class="store.notification_type">
        <span class="toast-icon">{{ icono }}</span>
        <span class="toast-msg">{{ store.message }}</span>
        <button class="toast-close" @click.stop="store.ocultar">&times;</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useNotificationStore } from '../stores/notifications';

const store = useNotificationStore();

const icono = computed(() => {
  switch (store.notification_type) {
    case 'success': return '\u2713';
    case 'error': return '\u2717';
    case 'warning': return '\u26A0';
    default: return '\u2139';
  }
});
</script>

<style scoped>
.toast-overlay {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
}
.toast {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.85rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  pointer-events: auto;
  min-width: 280px;
  max-width: 460px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.toast-icon { font-size: 1.2rem; flex-shrink: 0; }
.toast-msg { flex: 1; color: #f8fafc; line-height: 1.4; }
.toast-close {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}
.toast-close:hover { color: #f8fafc; }

.toast.success { background: #065f46; border-left: 4px solid #10b981; }
.toast.success .toast-icon { color: #10b981; }

.toast.error { background: #7f1d1d; border-left: 4px solid #ef4444; }
.toast.error .toast-icon { color: #ef4444; }

.toast.warning { background: #78350f; border-left: 4px solid #facc15; }
.toast.warning .toast-icon { color: #facc15; }

.toast-enter-active { animation: slideIn 0.25s ease; }
.toast-leave-active { animation: slideOut 0.2s ease; }

@keyframes slideIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
}
</style>
