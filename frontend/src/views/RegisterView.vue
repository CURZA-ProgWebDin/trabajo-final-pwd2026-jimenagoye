<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Crear Cuenta</h1>
      <form @submit.prevent="registrar">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="form.name" type="text" placeholder="Tu nombre" required />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
        </div>
        <div class="input-group">
          <label>Contraseña</label>
          <input v-model="form.password" type="password" placeholder="********" required />
        </div>
        
        <button type="submit" class="btn-register">Registrarse</button>
      </form>
      <p class="login-link">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
  name: '',
  email: '',
  password: ''
});

const registrar = () => {
  console.log("Registrando usuario:", form);
  router.push('/login');
};
</script>

<style scoped>
.register-container { padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
.register-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h1 { margin-bottom: 25px; color: #2c3e50; text-align: center; }
.input-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.btn-register { width: 100%; padding: 12px; background-color: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-register:hover { background-color: #219150; }
.login-link { margin-top: 20px; text-align: center; font-size: 0.9rem; }
</style>