<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router"

const router = useRouter();
const authStore = useAuthStore();
const { login } = authStore;
const { is_authenticated, errorMessage } = storeToRefs(authStore);
const user = reactive({
    nombre: "",
    password: ""
});

async function submit() {
    if (!user.nombre || !user.password) {
        alert("Debe completar todos los campos");
        return;
    }
    const success = await login(user);
    if (success) {
        router.push({ name: "Home" });
    } else if (errorMessage.value) {
        alert(errorMessage.value);
    }
}
</script>

<template>
    <div class="login-container">
        <section class="login-card">
            <h1>LOGIN</h1>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <form @submit.prevent="submit">
                <div class="input-group">
                    <label for="nombre">NOMBRE</label>
                    <input 
                        id="nombre"
                        type="text" 
                        v-model="user.nombre" 
                        placeholder="Ingresa tu usuario"
                        required
                    />
                </div>
                <div class="input-group">
                    <label for="password">PASSWORD</label>
                    <input 
                        id="password"
                        type="password" 
                        v-model="user.password" 
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                <button type="submit" class="btn-submit">ENTRAR</button>
            </form>
        </section>
    </div>
</template>

<style scoped>
/* Contenedor principal con fondo oscuro profundo */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #2c3e50;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Tarjeta del Login (un tono ligeramente más claro que el fondo para dar relieve) */
.login-card {
    background: #1e293b; /* Gris oscuro slate */
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Sombra mucho más marcada */
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    border: 1px solid #334155; /* Borde sutil para delimitar la tarjeta */
}

/* Título con alto contraste */
h1 {
    margin-bottom: 2rem;
    color: #f8fafc; /* Blanco brillante */
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 2px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Grupos de Input */
.input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

/* Etiquetas en gris claro para buen contraste sin encandilar */
label {
    margin-bottom: 0.5rem;
    color: #94a3b8; 
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
}

/* Inputs adaptados al entorno oscuro */
input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #f8fafc; /* Texto interno blanco */
    border: 1px solid #475569; /* Borde gris medio */
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    box-sizing: border-box;
}

/* Placeholder un poco más apagado para que no confunda */
input::placeholder {
    color: #64748b;
}

/* Foco de alto contraste (Verde esmeralda / Neón brillante) */
input:focus {
    outline: none;
    border-color: #10b981; /* Verde esmeralda brillante */
    background-color: rgba(0,0,0,0.2);
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

/* Botón con el color de contraste principal */
.btn-submit {
    width: 100%;
    padding: 0.85rem;
    font-size: 1rem;
    font-weight: bold;
    color: #0f172a; /* Texto oscuro dentro del botón brillante para legibilidad extrema */
    background-color: #10b981; /* Fondo verde esmeralda */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-top: 0.5rem;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); /* Brillo propio del botón */
}

.btn-submit:hover {
    background-color: #059669; /* Verde un toque más oscuro al pasar el cursor */
}

.btn-submit:active {
    transform: scale(0.98);
}

.error-message {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    border-radius: 6px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
}
</style>