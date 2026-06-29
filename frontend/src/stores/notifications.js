import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notificacion", () => {
  const message = ref("");
  const visible = ref(false);
  const notification_type = ref("success");
  let timerId = null;

  function create(msg, visibilidad, tipo = "success", tiempo = 3500) {
    if (timerId) clearTimeout(timerId);
    message.value = msg;
    visible.value = visibilidad;
    notification_type.value = tipo;
    if (visibilidad && tiempo > 0) {
      timerId = setTimeout(() => { visible.value = false; }, tiempo);
    }
  }

  function ocultar() {
    visible.value = false;
    if (timerId) clearTimeout(timerId);
  }

  return { message, visible, notification_type, create, ocultar };
});
