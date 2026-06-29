import AuthServices from "../services/AuthService";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

function decodificarJWT(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch { return null; }
}

export const useAuthStore = defineStore("auth", () => {
  const service = new AuthServices();
  const router = useRouter();

  const auth_user = ref(null);
  const is_authenticated = ref(false);
  const jwt = ref("");
  const rol_user = ref("");
  const id_user = ref(null);
  const errors = ref([]);
  const errorMessage = ref("");

  function loadFromStorage() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const rol = localStorage.getItem("rol");
    if (token) {
      jwt.value = token;
      auth_user.value = user;
      rol_user.value = rol;
      is_authenticated.value = true;
      const payload = decodificarJWT(token);
      id_user.value = payload ? Number(payload.sub) : null;
    }
  }

  function saveToStorage(token, user, rol) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("rol", rol);
  }

  function clearStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
  }

  loadFromStorage();

  async function login(user) {
    errors.value = [];
    errorMessage.value = "";
    try {
      const data = await service.login(user);
      auth_user.value = data.nombre;
      is_authenticated.value = data.authenticated;
      jwt.value = data.access_token;
      rol_user.value = data.rol;
      const payload = decodificarJWT(data.access_token);
      id_user.value = payload ? Number(payload.sub) : null;
      saveToStorage(data.access_token, data.nombre, data.rol);
      return true;
    } catch (error) {
      errorMessage.value = error.message;
      errors.value.push(error.message);
      return false;
    }
  }

  async function register(new_user) {
    errors.value = [];
    errorMessage.value = "";
    try {
      const data = await service.register(new_user);
      return data;
    } catch (error) {
      errorMessage.value = error.message;
      errors.value.push(error.message);
      return null;
    }
  }

  function logout() {
    auth_user.value = null;
    is_authenticated.value = false;
    jwt.value = "";
    rol_user.value = "";
    id_user.value = null;
    errors.value = [];
    errorMessage.value = "";
    clearStorage();
    router.push({ name: "Login" });
  }

  function goHome() {
    router.push("/");
  }

  const isAdmin = computed(() => rol_user.value === "admin");

  return {
    auth_user,
    is_authenticated,
    jwt,
    rol_user,
    id_user,
    isAdmin,
    errors,
    errorMessage,
    login,
    register,
    logout,
    goHome,
  };
});