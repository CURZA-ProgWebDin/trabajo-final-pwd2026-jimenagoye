<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import LoginComponent from '../components/auth/LoginComponent.vue';

const route = useRoute();
const accessError = ref('');

onMounted(() => {
  if (route.query.error) {
    accessError.value = route.query.error;
  }
});
</script>
<template>
  <section>
    <p v-if="accessError" class="route-error">{{ accessError }}</p>
    <LoginComponent></LoginComponent>
  </section>
</template>

<style scoped>
.route-error {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 6px;
  padding: 0.75rem;
  margin: 1rem auto;
  max-width: 400px;
  text-align: center;
  font-size: 0.9rem;
}
</style>