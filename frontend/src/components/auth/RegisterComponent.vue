<template>
  <section>
    <form @submit.prevent="submit">
      <h2><mdicon name="account-plus"></mdicon> Registro de usuario</h2>
      <div class="input">
        <label>nombre</label>
        <input type="text" v-model="user.nombre" />
      </div>
      <div class="input">
        <label>EMAIL</label>
        <input type="email" v-model="user.email" />
      </div>
      <div class="input">
        <label>PASSWORD</label>
        <input type="password" v-model="user.password" />
      </div>

      <input type="submit" @submit.prevent="submit" value="registrar" />
    </form>
  </section>
</template>
<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { register } = authStore;
const { errorMessage } = storeToRefs(authStore);
const user = reactive({
  nombre: "",
  password: "",
  email: "",
});

async function submit() {
  if (!user.password || !user.nombre || !user.email) {
    alert("deben completar todos los campos");
  } else {
    const data = await register(user);
    if (!data && errorMessage.value) {
      alert(errorMessage.value);
    }
  }
}
</script>
<style scoped>
section {
  position: relative;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
}
form {
  position: relative;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 50, 50, 0.5);
  padding: 50px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  width: clamp(40%, 450px, 500px);
}
</style>