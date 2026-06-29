<template>
  <nav>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link
          v-if="!link.meta.rol_access && !is_authenticated"
          :to="link.path"
          >{{ link.name }}
        </router-link>
      </li>

      <li v-for="(link, index) in links" :key="index">
        <router-link
          v-if="
            link.meta.rol_access &&
            is_authenticated &&
            link.meta.rol_access.includes(rol_user)
          "
          :to="link.path"
          >{{ link.name }}
        </router-link>
      </li>
    </ul>
    <template v-if="is_authenticated">
      <p><mdicon name="account-circle" /> {{ auth_user }}</p>
      <button @click="cerrarSesion">
        <mdicon name="logout" />
      </button>
    </template>
  </nav>
</template>
<script setup>
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { is_authenticated, auth_user } = storeToRefs(authStore);

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  rol_user: {
    type: String,
    required: true,
  },
});
function cerrarSesion() {
  authStore.logout();
}
</script>
<style scoped>
nav {
  background-color: rgb(32, 161, 105);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
}
ul {
  margin: 0 auto;
  width: 75%;
  padding: 15px;
  display: flex;
  justify-self: center;
  align-items: center;
  list-style: none;
  li {
    margin: 10px;

    a {
      color: #72f5d4;
      border-radius: 5px;
      text-decoration: none;

      font-size: 1rem;
    }
  }
}
.router-link-active {
  background-color: #1c683f;
  padding: 10px 20px;
}
button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}
</style>