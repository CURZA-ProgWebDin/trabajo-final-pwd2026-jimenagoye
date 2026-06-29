<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRolesStore } from '../../storage/roles';
import { useUserStore } from '../../storage/users';

const rolStore = useRolesStore();
const userStore = useUserStore();
const { roles } = storeToRefs(rolStore);
const { listar } = rolStore;
const { crear } = userStore;
const router = useRouter();
const cargando = ref(true);

const new_user = reactive({
  nombre: "",
  email: "",
  rol_id: "",
  password: ""
});

onMounted(async () => {
  await listar();
  cargando.value = false;
});

async function submit() {
  if (new_user.nombre && new_user.email && new_user.password && new_user.rol_id) {
    await crear(new_user);
    new_user.nombre = "";
    new_user.email = "";
    new_user.password = "";
    new_user.rol_id = "";
    router.push({ name: 'Users' });
  } else {
    alert("Complete todos los campos.");
  }
}
</script>